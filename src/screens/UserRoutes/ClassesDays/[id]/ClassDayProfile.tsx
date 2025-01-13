import { PageHeader } from "@components/PageHeader";
import { Divider, Heading, Modal, Text, VStack, View, Button as NativeBaseButton } from "native-base";
import { Button } from "@components/Button";
import { StudentItem } from "@components/Items/StudentItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useMemo, useState } from "react";
import { DeleteClassDayService, GetClassDayService, ListClassDayBookingsService } from "src/services/classDaysService";
import { CreatebookingService, DeleteBookingService, ListBookingsService } from "src/services/bookingsService";
import { useAuth } from "@hooks/useAuth";
import { Viewcontainer } from "@components/ViewContainer";
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO";
import { orderBy } from "lodash";
import Animated from "react-native-reanimated";
import { fireErrorToast, fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications";
import { ClassDayProfileSkeleton } from "@components/skeletons/screens/ClassDayProfile/ClassDayProfileSkeleton";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HasRole } from "@utils/HasRole";
import { EClassDayStatus } from "src/enums/EClassDayStatus";
import { ClassDayHeader } from "@components/ClassDayPage/Info";
import { EAuthType } from "src/enums/EAuthType";
import { TrashSimple } from "phosphor-react-native";
import { THEME } from "src/theme";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { IBookingDTO } from "@dtos/bookings/IBookingDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  classDayId: string;
  tenantIdParams: string;
}

export function ClassDayProfile() {

  const { tenant } = useAuth()
  const { user, authenticationType } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const userNavigation = useNavigation<UserNavigatorRoutesProps>();
  const tenantNavigation = useNavigation<UserNavigatorRoutesProps>();

  const route = useRoute()

  const queryClient = useQueryClient();
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const { classDayId, tenantIdParams } = route.params as RouteParamsProps;

  const { colors } = THEME

  const tenantId = tenant?.id ?? tenantIdParams

  const loadClassDayProfile = async () => {
    try {
      const { data } = await GetClassDayService(tenantId, classDayId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: classDay, isLoading: isLoadingProfile } = useQuery<ICLassDayDTO>({
    queryKey: ['get-class-day-profile', classDayId],
    queryFn: loadClassDayProfile
  })

  const loadBookings = async (page: number) => {
    try {
      const { data } = await ListBookingsService({ classDayId, page })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IBookingDTO[]>({
    queryKey: ['get-class-day-bookings', classDayId],
    queryFn: ({ pageParam }) => loadBookings(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })


  const { mutate: createBookMutate, isPending: createIsPending } = useMutation({
    mutationFn: async () => {
      if (!classDay || createIsPending || !classDayId) {
        return
      }
      await CreatebookingService(tenantId, classDayId)
    },
    onSuccess: () => {
      fireSuccesToast("Aula agendada")
      queryClient.invalidateQueries({
        queryKey: ['get-class-day-profile', classDayId]
      })
    }
  })

  const { mutate: cancelBookMutate, isPending: cancelIsPending } = useMutation({
    mutationFn: async () => {
      if (!classDay || cancelIsPending || !classDayId || (!isTenantAdmin && !isClassTeacher && !isClassStudent)) {
        return
      }
      const index = classDay.bookings.findIndex((b) => b.userId === user.id)
      await DeleteBookingService(tenantId, classDay.bookings[index].id, user.id)
    },
    onSuccess: () => {
      fireInfoToast("Aula cancelada")
      queryClient.invalidateQueries({
        queryKey: ['get-class-day-profile', classDayId]
      })
    }
  })


  function handleClickUpdateStatus() {
    if (authenticationType == EAuthType.USER) {
      userNavigation.navigate('updateClassDayStatus', {
        tenantIdParams: tenantId,
        classDayId
      });
    } else {
      tenantNavigation.navigate('updateClassDayStatus', {
        tenantIdParams: tenantId,
        classDayId
      });
    }
  }

  const handleDeleteClassDay = () => {
    if (isDeleting) return
    setIsDeleting(true)
    DeleteClassDayService(tenantId, classDayId).then(async () => {
      fireErrorToast("Aula deletada")
      await queryClient.invalidateQueries({
        queryKey: ['get-classes-days']
      })
      navigation.navigate('dashboard')
    }).finally(() => {
      setIsModalOpen(false)
    })
  }

  const onRefresh = async () => {
    queryClient.invalidateQueries({
      queryKey: ['get-class-day-profile', classDayId]
    })
    queryClient.invalidateQueries({
      queryKey: ['get-class-day-bookings', classDayId],
      exact: true
    })
  }


  function onLoadMoreBookings() {
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const isTenantAdmin = useMemo(() => {
    return HasRole(user.usersRoles, tenantIdParams, ["admin"])
  }, [classDay?.id])

  const isClassTeacher = useMemo(() => {
    return user.teachersClasses.some(x => x.classId == classDay?.classId);
  }, [classDay?.id])

  const alreadyBooked = useMemo(() => {
    return classDay?.bookings && classDay.bookings.length > 0 && classDay.bookings.find((b) => b.user.id === user.id)
  }, [classDay?.bookings])

  const isClassStudent = useMemo(() => {
    return user.studentsClasses.some(x => x.classId == classDay?.classId);
  }, [classDay?.id])


  return (
    <View flex={1}>
      <PageHeader title="Detalhes da aula" rightIcon={TrashSimple} rightAction={() => setIsModalOpen(true)} rightIconColor={colors.red['400']} />
      {
        isLoadingProfile || !classDay ?
          (
            <ClassDayProfileSkeleton />
          )
          :
          (
            <Viewcontainer>
              <ClassDayHeader classDay={classDay} />
              <View flex={1} px={2}>
                <Heading fontFamily="heading" fontSize="md" mt={8} mb={4}> Lista de presença</Heading>
                <Animated.FlatList
                  data={orderBy(results?.pages.map(page => page).flat(), (obj) => obj.user?.name, ['asc'])}
                  keyExtractor={booking => booking.id}
                  refreshing={isLoadingProfile}
                  renderItem={({ item }) => (
                    <StudentItem key={item.id} user={item.user} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
                  ListEmptyComponent={<Text fontFamily="body" textAlign="center" mt={8}> Nenhuma presença confirmada </Text>}
                  ListFooterComponent={
                    isFetchingNextPage ? <Loading /> : <></>
                  }
                  onEndReached={onLoadMoreBookings}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  onRefresh={onRefresh}
                >
                </Animated.FlatList>

              </View>

              {
                classDay.status === EClassDayStatus.PENDING && (
                  <VStack space={4} px={4} mt={4}>
                    {
                      isClassStudent && new Date(classDay.date) > new Date() && (
                        alreadyBooked ? (
                          <Button title="DESMARCAR" h={10} fontSize="xs" rounded="md" onPress={() => cancelBookMutate()} variant="outline" color="brand.600" isLoading={cancelIsPending} />
                        ) : (
                          <Button title="PARTICIPAR" h={10} fontSize="xs" rounded="md" onPress={() => createBookMutate()} isLoading={createIsPending} />
                        )

                      )
                    }
                    {
                      isClassTeacher || isTenantAdmin && (
                        <>
                          <Button title="ATUALIZAR STATUS" h={10} fontSize="xs" rounded="md" variant="outline" onPress={handleClickUpdateStatus}></Button>
                        </>
                      )
                    }
                  </VStack>
                )
              }

              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} safeAreaTop={true}>
                <Modal.Content maxWidth="350">
                  <Modal.Header borderBottomWidth={0}>
                    <Text fontFamily="heading"> Excluir aula </Text>
                  </Modal.Header>
                  <Modal.Body justifyContent="center" py={6} borderWidth={0}>
                    <Text fontFamily="body" color="coolGray.600">
                      Deseja deletar a aula? Após realizada, esta ação não poderá ser desfeita.
                    </Text>
                  </Modal.Body>
                  <Modal.Footer borderWidth={0} borderTopWidth={0}>
                    <VStack flex={1}>
                      <Button title="Deletar" variant="unstyled" color="red.600" isLoading={isDeleting} onPress={handleDeleteClassDay} />
                      <Divider my={1} bgColor="coolGray.300" />
                      <NativeBaseButton mt={2} variant="unstyled" fontWeight="bold" color="coolGray.500" onPress={() => setIsModalOpen(false)}>
                        Voltar
                      </NativeBaseButton>
                    </VStack>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Viewcontainer>
          )
      }

    </View>
  )
}