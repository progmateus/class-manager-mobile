import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { SubscriptionItem } from "@components/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { View, VStack } from "native-base"
import { useCallback, useState } from "react"
import { ListSubscriptionsService } from "src/services/subscriptionService"

type RouteParamsProps = {
  tenantId: string;
}

export function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const route = useRoute()
  const { tenantId } = route.params as RouteParamsProps;

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
              subscriptions && subscriptions.length > 0 && (
                <VStack space={4}>
                  {
                    subscriptions.map(({ subscription }, index) => {
                      return (
                        <SubscriptionItem key={index} subscription={subscription} />
                      )
                    })
                  }
                </VStack>

              )
            )
        }

      </Viewcontainer>
    </View>

  )
}