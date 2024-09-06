import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITenantPlanDTO } from "@dtos/ITenantPlanDTO"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { View, VStack } from "native-base"
import { Barbell, Check, Coin, Money, Plus, SimCard } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListTenantPlansService } from "src/services/tenantPlansService"


type RouteParamsProps = {
  tenantId: string;
}

export function TenantPlansList() {
  const [plans, setPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState("")
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

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId)
  }

  const handleSave = () => {
    console.log('opa eai')
  }

  return (
    <View flex={1}>
      <PageHeader title="Alterar plano" rightIcon={Check} rightAction={handleSave} />
      <Viewcontainer>
        <VStack space={8}>
          {
            plans && plans.length ? (
              plans.map((plan: ITenantPlanDTO) => {
                return (
                  <TouchableOpacity
                    key={plan.id}
                    onPress={() => handleSelectPlan(plan.id)}
                  >
                    <GenericItem.Root
                      key={plan.id}
                      borderColor={plan.id === selectedPlanId ? 'brand.500' : 'coolGray.400'}
                      borderWidth={plan.id === selectedPlanId ? 2 : 0.5}
                    >
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