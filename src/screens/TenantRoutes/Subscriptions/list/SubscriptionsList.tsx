import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { SubscriptionItem } from "@components/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { Text, View, VStack } from "native-base"
import { useCallback, useState } from "react"
import { ListSubscriptionsService } from "src/services/subscriptionService"

type RouteParamsProps = {
  tenantIdParams: string;
}

export function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const route = useRoute()
  const { tenantIdParams } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams

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
              subscriptions && subscriptions.length > 0 ? (
                <VStack space={4}>
                  {
                    subscriptions.map((subscription, index) => {
                      return (
                        <SubscriptionItem key={index} subscription={subscription} />
                      )
                    })
                  }
                </VStack>

              ) : (
                <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
              )
            )
        }

      </Viewcontainer>
    </View>

  )
}