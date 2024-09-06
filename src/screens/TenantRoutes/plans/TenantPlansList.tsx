import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITenantPlanDTO } from "@dtos/ITenantPlanDTO"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { View, VStack } from "native-base"
import { Barbell, Coin, Money, Plus, SimCard } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListTenantPlansService } from "src/services/tenantPlansService"


type RouteParamsProps = {
  tenantId: string;
}

export function TenantPlansList() {
  const [plans, setPlans] = useState([])
  const route = useRoute()
  const { tenantId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useEffect(() => {
    ListTenantPlansService(tenantId).then(({ data }) => {
      setPlans(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {

    })
  }, [tenantId])

  const priceFormatted = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  const handleClickPlus = () => {
    navigation.navigate('createTenantPlan', {
      tenantId
    })
  }
  return (
    <View flex={1}>
      <PageHeader title="Planos" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>
        <VStack space={8}>
          {
            plans && plans.length ? (
              plans.map((plan: ITenantPlanDTO) => {
                return (
                  <TouchableOpacity key={plan.id}>
                    <GenericItem.Root>
                      <GenericItem.Icon icon={SimCard} />
                      <GenericItem.Content title={plan.name} caption={plan.description} />
                      <GenericItem.InfoSection>
                        <GenericItem.InfoContainer >
                          <Barbell size={18} color="#6b7280" />
                          <GenericItem.InfoValue text="7" />
                        </GenericItem.InfoContainer>
                        <GenericItem.InfoContainer >
                          <Money size={18} color="#6b7280" />
                          <GenericItem.InfoValue text={priceFormatted(plan.price).replace('R$', '')} />
                        </GenericItem.InfoContainer>
                      </GenericItem.InfoSection>
                    </GenericItem.Root>
                  </TouchableOpacity>
                )
              })
            )
              : (
                <Loading />
              )
          }
        </VStack>
      </Viewcontainer>
    </View>
  )
}