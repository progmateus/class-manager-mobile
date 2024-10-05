import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITenantPlanDTO } from "@dtos/tenants/ITenantPlanDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { FlatList, Text, View } from "native-base"
import { Barbell, Money, Plus, SimCard } from "phosphor-react-native"
import { ListTenantPlansService } from "src/services/tenantPlansService"


export function TenantPlansList() {
  const { tenant } = useAuth()
  const tenantId = tenant?.id
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  const loadTenantPlans = async () => {
    try {
      const { data } = await ListTenantPlansService(tenantId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: plans, isLoading } = useQuery<ITenantPlanDTO[]>({
    queryKey: ['get-tenant-plans', tenantId],
    queryFn: loadTenantPlans
  })

  const priceFormatted = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  const handleClickPlus = () => {
    navigation.navigate('createTenantPlan')
  }
  return (
    <View flex={1}>
      <PageHeader title="Planos" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>

        {
          isLoading ? (<Loading />)
            : (
              <FlatList
                data={plans}
                pb={20}
                keyExtractor={plan => plan.id}
                renderItem={({ item }) => (
                  <GenericItem.Root key={item.id}>
                    <GenericItem.Icon icon={SimCard} />
                    <GenericItem.Content title={item.name} caption={item.description} />
                    <GenericItem.InfoSection>
                      <GenericItem.InfoContainer >
                        <Barbell size={18} color="#6b7280" />
                        <GenericItem.InfoValue text="7" />
                      </GenericItem.InfoContainer>
                      <GenericItem.InfoContainer >
                        <Money size={18} color="#6b7280" />
                        <GenericItem.InfoValue text={priceFormatted(item.price).replace('R$', '')} />
                      </GenericItem.InfoContainer>
                    </GenericItem.InfoSection>
                  </GenericItem.Root>
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