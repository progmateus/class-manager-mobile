import { PageHeader } from "@components/PageHeader";
import { FlatList, Heading, ScrollView, Text, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { StudentItem } from "@components/StudentItem";
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
  const roles = [
    {
      tenantId: "123",
      roleId: "456",
      role: {
        name: "teacher"
      }
    }
  ]


  const route = useRoute()

  const { classDayId, tenantIdParams } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const [classDay, setClassDay] = useState<ICLassDayDTO>({} as ICLassDayDTO)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const { user } = useAuth()
  const navigation = useNavigation<UserNavigatorRoutesProps>();

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
  }, [classDayId]))

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
            <Loading />
          )
          :
          (
            <Viewcontainer>
              <Info classDay={classDay} />
              <Heading fontFamily="heading" fontSize="md" mt={8}> Lista de presença</Heading>
              <FlatList
                data={classDay.bookings}
                pb={20}
                px={2}
                keyExtractor={student => student.id}
                renderItem={({ item }) => (
                  <StudentItem key={item.id} user={item.user} />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                ListEmptyComponent={<Text fontFamily="body" textAlign="center" mt={4}> Nenhum aluno agendado </Text>}
              >
              </FlatList>

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