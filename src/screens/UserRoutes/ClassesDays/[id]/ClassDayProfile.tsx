import { PageHeader } from "@components/PageHeader";
import { FlatList, Heading, Text, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { StudentItem } from "@components/Items/StudentItem";
import { Info } from "@components/ClassPage/Info";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetClassDayService } from "src/services/classDaysService";
import { CreatebookingService, DeleteBookingService } from "src/services/bookingsService";
import { useAuth } from "@hooks/useAuth";
import { Viewcontainer } from "@components/ViewContainer";
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO";
import { orderBy } from "lodash";
import Animated from "react-native-reanimated";
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications";
import { ClassDayProfileSkeleton } from "@components/skeletons/screens/ClassDayProfile/ClassDayProfileSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HasRole } from "@utils/HasRole";
import { EClassDayStatus } from "src/enums/EClassDayStatus";

type RouteParamsProps = {
  classDayId: string;
  tenantIdParams: string;
}

export function ClassDayProfile() {

  const { tenant } = useAuth()
  const { user, authenticationType } = useAuth()
  const userNavigation = useNavigation<UserNavigatorRoutesProps>();
  const tenantNavigation = useNavigation<UserNavigatorRoutesProps>();

  const route = useRoute()

  const queryClient = useQueryClient();

  const { classDayId, tenantIdParams } = route.params as RouteParamsProps;

  const tenantId = tenant?.id ?? tenantIdParams

  const loadClassDayProfile = async () => {
    try {
      const { data } = await GetClassDayService(tenantId, classDayId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: classDay, isLoading } = useQuery<ICLassDayDTO>({
    queryKey: ['get-class-day-profile', tenantId, classDayId],
    queryFn: loadClassDayProfile
  })


  const { mutate: createBookMutate, isPending: createIsPending } = useMutation({
    mutationFn: async () => {
      if (!classDay || createIsPending || !classDayId) {
        return
      }
      await CreatebookingService(tenantId, classDayId, user.id)
    },
    onSuccess: () => {
      fireSuccesToast("Aula agendada")
      queryClient.invalidateQueries({
        queryKey: ['get-class-day-profile', tenantId, classDayId]
      })
    }
  })

  const { mutate: cancelBookMutate, isPending: cancelIsPending } = useMutation({
    mutationFn: async () => {
      if (!classDay || cancelIsPending || !classDayId) {
        return
      }
      const index = classDay.bookings.findIndex((b) => b.userId === user.id)
      await DeleteBookingService(tenantId, classDay.bookings[index].id, user.id)
    },
    onSuccess: () => {
      fireInfoToast("Aula cancelada")
      queryClient.invalidateQueries({
        queryKey: ['get-class-day-profile', tenantId, classDayId]
      })
    }
  })


  function handleClickUpdateStatus() {
    if (authenticationType == "user") {
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

  const isTenantAdminOrTeacher = useMemo(() => {
    return HasRole(user.usersRoles, tenantIdParams, ["admin", "teacher"])
  }, [classDay])

  const alreadyBooked = useMemo(() => {
    return classDay?.bookings && classDay.bookings.length > 0 && classDay.bookings.find((b) => b.user.id === user.id)
  }, [classDay])

  return (
    <View flex={1}>
      <PageHeader title="Detalhes da aula" />
      {
        isLoading || !classDay ?
          (
            <ClassDayProfileSkeleton />
          )
          :
          (
            <Viewcontainer>
              <Info classDay={classDay} />
              <View flex={1} px={2}>
                <Heading fontFamily="heading" fontSize="md" mt={8} mb={4}> Lista de presença</Heading>
                <Animated.FlatList
                  data={orderBy(classDay.bookings, (obj) => obj.user.name, ['asc'])}
                  keyExtractor={booking => booking.id}
                  refreshing={isLoading}
                  renderItem={({ item, index }) => (
                    <StudentItem key={item.id} user={item.user} index={index} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
                  ListEmptyComponent={<Text fontFamily="body" textAlign="center" mt={8}> Nenhuma presença confirmada </Text>}
                >
                </Animated.FlatList>
              </View>

              {
                classDay.status === EClassDayStatus.PENDING && (
                  <VStack space={4} px={4} mt={4}>
                    {
                      alreadyBooked ? (
                        <Button title="DESMARCAR" h={10} fontSize="xs" rounded="md" onPress={() => cancelBookMutate()} variant="outline" color="brand.600" isLoading={cancelIsPending} />
                      ) : (
                        <Button title="PARTICIPAR" h={10} fontSize="xs" rounded="md" onPress={() => createBookMutate()} isLoading={createIsPending} />
                      )
                    }
                    {
                      isTenantAdminOrTeacher && (
                        <>
                          <Button title="ATUALIZAR STATUS" h={10} fontSize="xs" rounded="md" variant="outline" onPress={handleClickUpdateStatus}></Button>
                        </>
                      )
                    }
                  </VStack>
                )
              }
            </Viewcontainer>
          )
      }

    </View>
  )
}