import dayjs from "dayjs"
import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, Icon, Text, View } from "native-base"
import { CheckCircle, Clock, ClockClockwise, XCircle } from "phosphor-react-native"
import { ListBookingsService } from "src/services/bookingsService"
import { EClassDayStatus } from "src/enums/EClassDayStatus"
import { ListUserBookingsService } from "src/services/usersService"
import { IBookingDTO } from "@dtos/bookings/IBookingDTO"
import { useAuth } from "@hooks/useAuth"
import { TouchableOpacity } from "react-native"
import { UserNavigatorRoutesProps } from "@routes/user.routes"
import { useInfiniteQuery } from "@tanstack/react-query"
import { transFormClassDayColor } from "@utils/StatusHelper"

type RouteParamsProps = {
  tenantIdParams?: string;
  userId?: string;
}
export function BookingsHistory() {
  const route = useRoute()
  const { tenantIdParams, userId } = route.params as RouteParamsProps;
  const { tenant, authenticationType, user } = useAuth()
  const tenantId = authenticationType == "tenant" ? tenant?.id : tenantIdParams

  const userNavigation = useNavigation<UserNavigatorRoutesProps>()

  /* const handleDeleteBooking = (booking: IBookingDTO) => {
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
  } */

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IBookingDTO[]>({
    queryKey: ['get-bookings', tenantId, userId, user.id],
    queryFn: ({ pageParam }) => {
      return fetchBookings(Number(pageParam)).then(({ data }) => {
        return data.data
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })

  function onLoadMore() {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }


  const fetchBookings = (page: number) => {
    if (authenticationType === "user") {
      return loadUserBookings(page)
    } else {
      return loadTenantBookings(page)
    }
  }

  const loadTenantBookings = async (page: number) => {
    const { data } = await ListBookingsService({ tenantId, userId, page })
    return data.data
  }

  const loadUserBookings = async (page: number) => {
    const { data } = await ListUserBookingsService({ tenantId, page })
    return data.data
  }

  const handleRedirectClassDay = (classDayId: string, tenantId: string) => {
    if (authenticationType === "user") {
      userNavigation.navigate('classDayProfile', {
        classDayId,
        tenantIdParams: tenantId
      })
    }
  }

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
                data={results?.pages.map(page => page).flat()}
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
                ListFooterComponent={
                  isFetchingNextPage ? <Loading /> : <></>
                }
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                  <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                }
              ></FlatList>
            )
        }
      </Viewcontainer>
    </View>
  )
}