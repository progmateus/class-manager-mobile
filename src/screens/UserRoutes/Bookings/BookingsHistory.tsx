import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IBookingDTO } from "@dtos/IBookingDTO"
import { IClassDTO } from "@dtos/IClass"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { Center, Icon, Text, View, VStack } from "native-base"
import { BookBookmark, Clock, GraduationCap, IdentificationBadge, Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListBookingsService } from "src/services/bookingsService"
import { ListClassesService } from "src/services/classesService"
import dayjs from "dayjs"

type RouteParamsProps = {
  tenantId: string;
  userId: string;
}
export function BookingsHistory() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const route = useRoute()
  const { tenantId, userId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  const handleDeleteBooking = (bookingsId: string) => {
    console.log('delete')
  }

  useFocusEffect(useCallback(() => {
    setIsLoadig(true)
    ListBookingsService(tenantId, userId).then(({ data }) => {
      setBookings(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoadig(false)
    })
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

  return (
    <View flex={1}>
      <PageHeader title="Histórico de aulas" />
      <Viewcontainer>
        {
          isLoading ? (<Loading />)
            : (
              <VStack space={4}>
                {
                  bookings && bookings.length ? (
                    bookings.map((booking: IBookingDTO) => {
                      return (
                        <GenericItem.Root touchable={false} key={booking.id}>
                          <GenericItem.InfoSection>
                            <Icon as={Clock} mr={4} />
                            <Text mr={4}>{booking.classDay.hourStart}</Text>
                          </GenericItem.InfoSection>
                          <GenericItem.Content title={formatDate(booking.classDay.date)} caption={booking.classDay.class.name} />
                          <GenericItem.InfoSection>
                            <TouchableOpacity onPress={() => handleDeleteBooking("opa")}>
                              <Icon as={TrashSimple} color="red.600" />
                            </TouchableOpacity>
                          </GenericItem.InfoSection>
                        </GenericItem.Root>
                      )
                    })
                  ) : (
                    <Center>
                      <Text fontFamily="body" color="coolGray.700"> Nenhum resultado encontrado</Text>
                    </Center>
                  )
                }
              </VStack>
            )
        }
      </Viewcontainer>
    </View>
  )
}