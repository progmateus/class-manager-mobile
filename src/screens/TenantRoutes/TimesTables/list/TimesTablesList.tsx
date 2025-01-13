import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { FlatList, Text, View } from "native-base"
import { Calendar, Plus } from "phosphor-react-native"
import { TouchableOpacity } from "react-native"
import { ListTimesTablesService } from "src/services/timeTablesService"

export function TimesTablesList() {

  const { tenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const queryClient = useQueryClient();


  const loadTimesTables = async (page: number) => {
    try {
      const { data } = await ListTimesTablesService(tenant.id, { page })
      return data.data
    } catch (err) {
      console.log('err: ', err)
    }
  }


  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<ITimeTableDTO[]>({
    queryKey: ['get-times-tables', tenant.id],
    queryFn: ({ pageParam }) => loadTimesTables(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })

  function onLoadMore() {
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const handleAdd = () => {
    navigation.navigate('createTimeTable')
  }

  const onRefresh = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['get-times-tables', tenant.id]
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Horários" rightIcon={Plus} rightAction={handleAdd} />
      <Viewcontainer>
        {
          isLoading ? (<Loading />)
            : (
              <FlatList
                data={results?.pages.map(page => page).flat()}
                pb={20}
                keyExtractor={timeTable => timeTable.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.id} onPress={() => navigation.navigate('timeTable', { timeTableId: item.id })}>
                    <GenericItem.Root>
                      <GenericItem.Icon icon={Calendar} />
                      <GenericItem.Content title={item.name} caption="" />
                    </GenericItem.Root>
                  </TouchableOpacity>
                )}
                ListFooterComponent={
                  isFetchingNextPage ? <Loading /> : <></>
                }
                ListEmptyComponent={
                  <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                }
                refreshing={isLoading}
                onRefresh={onRefresh}
              >
              </FlatList>
            )
        }
      </Viewcontainer>
    </View >
  )
}