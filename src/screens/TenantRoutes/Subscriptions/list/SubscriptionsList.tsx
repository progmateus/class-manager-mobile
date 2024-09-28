import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { SubscriptionItem } from "@components/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { FlatList, Text, View, VStack } from "native-base"
import { useCallback, useState } from "react"
import { ListSubscriptionsService } from "src/services/subscriptionService"

export function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState<ISubscriptionPreviewDTO[]>([])
  const [isLoading, setIsLoadig] = useState(false)
  const { tenant } = useAuth()
  const tenantId = tenant?.id

  useFocusEffect(useCallback(() => {
    setIsLoadig(true)
    ListSubscriptionsService(tenantId).then(({ data }) => {
      setSubscriptions(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoadig(false)
    })
  }, []))

  return (
    <View flex={1}>
      <PageHeader title="Alunos" />
      <Viewcontainer>
        {
          isLoading ? (<Loading />)
            : (
              <FlatList
                data={subscriptions}
                pb={20}
                keyExtractor={subscription => subscription.id}
                renderItem={({ item }) => (
                  <SubscriptionItem subscription={item} />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
              >
              </FlatList>
            )
        }
      </Viewcontainer>
    </View>

  )
}