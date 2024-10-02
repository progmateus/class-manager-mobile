import { PageHeader } from "@components/PageHeader";
import { FlatList, Heading, ScrollView, Text, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { StudentItem } from "@components/Items/StudentItem";
import { Info } from "@components/ClassPage/Info";
import { GetRole } from "@utils/GetRole";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useCallback, useEffect, useState } from "react";
import { GetClassDayService } from "src/services/classDaysService";
import { Loading } from "@components/Loading";
import { CreatebookingService, DeleteBookingService } from "src/services/bookingsService";
import { useAuth } from "@hooks/useAuth";
import { Viewcontainer } from "@components/ViewContainer";
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO";
import { orderBy } from "lodash";
import Animated, { LinearTransition } from "react-native-reanimated";
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications";
import { ClassDayProfileSkeleton } from "@components/skeletons/screens/ClassDayProfile/ClassDayProfileSkeleton";

type RouteParamsProps = {
  classDayId: string;
  tenantIdParams: string;
}

interface IClassDay {
  date: Date,
  hourStart: string,
  hourEnd: string,
  address: string,
  teachers: ITeacher[]
  bookings: any[]
}

interface ITeacher {
  name: string
}

export function ClassDayProfile() {

  const { tenant } = useAuth()
  const [classDay, setClassDay] = useState<ICLassDayDTO>({} as ICLassDayDTO)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const { user } = useAuth()
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const route = useRoute()

  const { classDayId, tenantIdParams } = route.params as RouteParamsProps;

  const tenantId = tenant?.id ?? tenantIdParams

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    GetClassDayService(tenantId, classDayId).then(({ data }) => {
      setClassDay({
        ...data.data,
        address: 'Praia da Bica, 255'
      })
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId, classDayId]))

  function handleClickUpdateStatus() {
    navigation.navigate('updateClassDayStatus', {
      tenantIdParams: tenantId,
      classDayId
    });
  }

  function handleParticipate() {
    setIsLoadingAction(true)

    CreatebookingService(tenantId, classDayId, user.id).then(({ data }) => {
      const bookings = [...classDay.bookings, data.data]
      setClassDay({
        ...classDay,
        bookings
      })
    }).then(() => {
      fireSuccesToast("Aula agendada")
    }).finally(() => {
      setIsLoadingAction(false)
    })
  }

  function handleCancelbooking() {
    setIsLoadingAction(true)
    const bookings = [...classDay.bookings]
    const index = bookings.findIndex((b) => b.userId === user.id)
    DeleteBookingService(tenantId, bookings[index].id, user.id).then(({ data }) => {
      if (index !== -1) {
        bookings.splice(index, 1)
      }
      setClassDay({
        ...classDay,
        bookings
      })
      fireInfoToast('Agendamento cancelado')
    }).catch((err) => {
      console.log(err)
    })
      .finally(() => {
        setIsLoadingAction(false)
      })
  }

  const isAdmin = useCallback(() => {
    return GetRole(user.usersRoles, tenantIdParams, "admin")
  }, [classDayId])

  return (
    <View flex={1}>
      <PageHeader title="Detalhes da aula" />
      {
        isLoading ?
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
                  itemLayoutAnimation={LinearTransition}
                  keyExtractor={booking => booking.id}
                  refreshing={isLoading}
                  renderItem={({ item, index }) => (
                    <StudentItem key={item.id} user={item.user} index={index} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
                  ListEmptyComponent={<Text fontFamily="body" textAlign="center" mt={4}> Nenhum aluno agendado </Text>}
                >
                </Animated.FlatList>
              </View>

              <VStack space={4} px={4} mt={4}>
                {
                  classDay.bookings && classDay.bookings.length > 0 && classDay.bookings.find((b) => b.user.id === user.id) ? (
                    <Button title="DESMARCAR" h={10} fontSize="xs" rounded="md" onPress={handleCancelbooking} variant="outline" color="brand.600" />
                  ) : (
                    <Button title="PARTICIPAR" h={10} fontSize="xs" rounded="md" onPress={handleParticipate} />
                  )
                }
                {
                  isAdmin() && (
                    <>
                      <Button title="ATUALIZAR STATUS" h={10} fontSize="xs" rounded="md" variant="outline" onPress={handleClickUpdateStatus}></Button>
                    </>
                  )
                }
              </VStack>
            </Viewcontainer>
          )
      }

    </View>
  )
}