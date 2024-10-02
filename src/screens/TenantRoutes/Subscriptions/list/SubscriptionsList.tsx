import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { SubscriptionItem } from "@components/Items/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { FlatList, Text, View, VStack } from "native-base"
import { Plus } from "phosphor-react-native"
import { ListSubscriptionsService } from "src/services/subscriptionService"
import { SubscriptionItemSkeleton } from "@components/skeletons/Items/SubscriptionItemSkeleton"
import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

export function SubscriptionsList() {
  const { tenant } = useAuth()
  const tenantId = tenant?.id

  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const { data: subscriptions, isLoading, refetch } = useQuery<ISubscriptionPreviewDTO[]>({
    queryKey: ['get-subscriptions', tenantId],
    queryFn: () => {
      return ListSubscriptionsService(tenantId).then(({ data }) => {
        /* setClassesDays(data.data) */
        return data.data
      })
    }
  })

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
                  data={subscriptions}
                  pb={20}
                  keyExtractor={subscription => subscription.id}
                  renderItem={({ item }) => (
                    <SubscriptionItem subscription={item} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
                >
                </FlatList>
              </>
            )
        }
      </Viewcontainer>
    </View>

  )
}