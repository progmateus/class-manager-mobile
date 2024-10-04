import dayjs from "dayjs"
import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, Icon, Text, View } from "native-base"
import { CheckCircle, Clock, ClockClockwise, XCircle } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { DeleteBookingService, ListBookingsService } from "src/services/bookingsService"
import { fireInfoToast } from "@utils/HelperNotifications"
import { EClassDayStatus } from "src/enums/EClassDayStatus"
import { transFormClassDayColor } from "@utils/TransformColor"
import { ListUserBookingsService } from "src/services/usersService"
import { IBookingDTO } from "@dtos/bookings/IBookingDTO"
import { useAuth } from "@hooks/useAuth"
import { TouchableOpacity } from "react-native"
import { UserNavigatorRoutesProps } from "@routes/user.routes"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"

type RouteParamsProps = {
  tenantIdParams?: string;
  userId?: string;
}
export function BookingsHistory() {
  const [bookings, setBookings] = useState<IBookingDTO[]>([])
  const [isLoading, setIsLoadig] = useState(true)
  const [isActing, setIsActing] = useState(false)
  const route = useRoute()
  const { tenantIdParams, userId } = route.params as RouteParamsProps;
  const { tenant, authenticationType } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams

  const userNavigation = useNavigation<UserNavigatorRoutesProps>()
  const tenantNavigation = useNavigation<TenantNavigatorRoutesProps>()

  const handleDeleteBooking = (booking: IBookingDTO) => {
    if (isActing || !tenantId) return
    setIsActing(true)
    DeleteBookingService(tenantId, booking.id, booking.userId).then(({ data }) => {
      setBookings(list => list.filter(item => item.id !== booking.id))
      fireInfoToast('Agendamento deletado com sucesso!')
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsActing(false)
    })
  }

  const loadTenantBookings = () => {
    if (!tenantId || !userId) return
    setIsLoadig(true)
    ListBookingsService(tenantId, userId).then(({ data }) => {
      setBookings(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoadig(false)
    })
  }

  const loadUserBookings = () => {
    setIsLoadig(true)
    ListUserBookingsService().then(({ data }) => {
      setBookings(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoadig(false)
    })
  }


  const handleRedirectClassDay = (classDayId: string, tenantId: string) => {
    if (authenticationType === "user") {
      userNavigation.navigate('classDayProfile', {
        classDayId,
        tenantIdParams: tenantId
      })
    }
  }

  useFocusEffect(useCallback(() => {
    if (authenticationType === "user") {
      loadUserBookings()
    } else {
      loadTenantBookings()
    }
  }, []))


  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(dayjs(date, 'YYYY-MM-DD:hh:mm').toDate())
  }

  const getIconStatus = (status: EClassDayStatus) => {
    if (status == EClassDayStatus.CONCLUDED) {
      return (
        CheckCircle
      )
    } else if (status == EClassDayStatus.PENDING) {
      return (
        ClockClockwise
      )
    } else {
      return (
        XCircle
      )
    }
  }

  return (
    <View flex={1}>
      <PageHeader title="Histórico de aulas" />
      <Viewcontainer>
        {
          isLoading ? (<Loading />)
            : (
              <FlatList
                data={bookings}
                pb={20}
                keyExtractor={booking => booking.id}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.id} onPress={() => handleRedirectClassDay(item.classDay.id, item.classDay.class.tenantId)}>
                    <GenericItem.Root >
                      <GenericItem.InfoSection>
                        <Icon as={Clock} mr={4} />
                        <Text mr={4}>{item.classDay.hourStart}</Text>
                      </GenericItem.InfoSection>
                      <GenericItem.Content title={formatDate(item.classDay.date)} caption={item.classDay.class.name} />
                      <GenericItem.InfoSection>
                        <Icon as={getIconStatus(item.classDay.status)} color={transFormClassDayColor(item.classDay.status)} />
                      </GenericItem.InfoSection>
                    </GenericItem.Root>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
              ></FlatList>
            )
        }
      </Viewcontainer>
    </View>
  )
}