import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { SubscriptionItem } from "@components/Items/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { FlatList, Icon, ScrollView, Text, View, VStack } from "native-base"
import { MagnifyingGlass, Plus } from "phosphor-react-native"
import { ListSubscriptionsService } from "src/services/subscriptionService"
import { SubscriptionItemSkeleton } from "@components/skeletons/Items/SubscriptionItemSkeleton"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { Input } from "@components/form/Input"
import { debounce } from "lodash"

export function SubscriptionsList() {
  const { tenant } = useAuth()
  const [search, setSearch] = useState("")
  const queryClient = useQueryClient();

  const tenantId = tenant?.id

  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<ISubscriptionPreviewDTO[]>({
    queryKey: ['get-subscriptions', tenantId, search],
    queryFn: ({ pageParam }) => loadSubscriptions(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })


  const loadSubscriptions = async (page: number) => {
    try {
      const { data } = await ListSubscriptionsService(tenantId, { page, search })
      return data.data
    } catch (err) {
      console.log('err: ', err)
    }
  }

  function onLoadMore() {
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  useFocusEffect(useCallback(() => {
    refetch()
  }, []))


  const handleAdd = () => {
    navigation.navigate('createUserSubscription', {})
  }

  const changeTextDebounced = (text: string) => {
    setSearch(text)
  }

  const changeTextDebouncer = useCallback(debounce(changeTextDebounced, 250), []);

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-subscriptions', tenantId, search],
      exact: true
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Alunos" rightAction={handleAdd} rightIcon={Plus} />
      <Viewcontainer>
        <View h={20}>
          <Input
            onChangeText={changeTextDebouncer}
            placeholder="Buscar"
            InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
          />
        </View>
        {
          isLoading ? (
            <VStack space={3}>
              <SubscriptionItemSkeleton />
              <SubscriptionItemSkeleton />
              <SubscriptionItemSkeleton />
              <SubscriptionItemSkeleton />
            </VStack>
          )
            : (
              <View>
                <FlatList
                  data={results?.pages.map(page => page).flat()}
                  pb={20}
                  keyExtractor={subscription => subscription.id}
                  renderItem={({ item }) => (
                    <SubscriptionItem subscription={item} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                  onEndReached={onLoadMore}
                  onEndReachedThreshold={0.3}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
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
              </View>
            )
        }
      </Viewcontainer>
    </View>

  )
}