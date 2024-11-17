import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { SubscriptionItem } from "@components/Items/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { FlatList, Text, View, VStack } from "native-base"
import { Plus } from "phosphor-react-native"
import { ListSubscriptionsService } from "src/services/subscriptionService"
import { SubscriptionItemSkeleton } from "@components/skeletons/Items/SubscriptionItemSkeleton"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCallback } from "react"

export function SubscriptionsList() {
  const { tenant } = useAuth()
  const tenantId = tenant?.id

  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<ISubscriptionPreviewDTO[]>({
    queryKey: ['get-subscriptions', tenantId],
    queryFn: ({ pageParam }) => loadSubscriptions(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1
    }
  })


  const loadSubscriptions = async (page: number) => {
    try {
      const { data } = await ListSubscriptionsService(tenantId, { page })
      return data.data
    } catch (err) {
      console.log('err: ', err)
    }
  }

  function onLoadMore() {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }

  useFocusEffect(useCallback(() => {
    refetch()
  }, []))


  const handleAdd = () => {
    navigation.navigate('createSubscription')
  }

  return (
    <View flex={1}>
      <PageHeader title="Alunos" rightAction={handleAdd} rightIcon={Plus} />
      <Viewcontainer>
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
              <>

                <FlatList
                  data={results?.pages.map(page => page).flat()}

                  pb={20}
                  keyExtractor={subscription => subscription.id}
                  renderItem={({ item }) => (
                    <SubscriptionItem subscription={item} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
                >
                </FlatList>
              </>
            )
        }
      </Viewcontainer>
    </View>

  )
}