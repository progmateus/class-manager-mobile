import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { Viewcontainer } from "@components/ViewContainer"
import { IPlanDTO } from "@dtos/subscriptions/IPlanDTO"
import { ITenantPlanDTO } from "@dtos/tenants/ITenantPlanDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { Button, Divider, Heading, HStack, Icon, Text, View, VStack } from "native-base"
import { Barbell, Check, Money, SimCard } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListAppPlansService } from "src/services/appServices"
import { UpdateSubscriptionPlanService } from "src/services/subscriptionService"
import { ListTenantPlansService } from "src/services/tenantPlansService"


type RouteParamsProps = {
  tenantIdParams: string;
  subscriptionId: string;
  planIdExists: string;
}

export function UpdateTenantSubscriptionPlan() {
  const [selectedPlanId, setSelectedPlanId] = useState("")
  const [isActing, setIsActing] = useState(false)

  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const queryClient = useQueryClient();
  const route = useRoute()
  const { tenant } = useAuth()


  const { tenantIdParams, planIdExists, subscriptionId } = route.params as RouteParamsProps;

  const tenantId = tenant?.id ?? tenantIdParams


  useFocusEffect(useCallback(() => {
    setSelectedPlanId(planIdExists)
  }, [subscriptionId, planIdExists]))

  const loadTenantPlans = async () => {
    try {
      const { data } = await ListAppPlansService()
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: plans, isLoading } = useQuery<IPlanDTO[]>({
    queryKey: ['get-tenant-plans', tenant.id, subscriptionId],
    queryFn: loadTenantPlans
  })

  const priceFormatted = (price: number) => {
    if (!price) return '0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId)
  }

  const handleSave = (planId: string) => {
    if (!selectedPlanId || !subscriptionId || isActing) {
      return
    }
    setIsActing(true)
    UpdateSubscriptionPlanService(tenantId, subscriptionId, undefined, planId).then(() => {
      fireSuccesToast('Plano alterado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['get-subscription-profile', subscriptionId],
      })
      queryClient.invalidateQueries({
        queryKey: ['get-tenant-plans', tenant.id],
      }).then(() => {
        navigation.navigate('subscriptionProfile', { subscriptionId, tenantIdParams: tenantId })
      })
    }).finally(() => {
      setIsActing(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Alterar plano" />
      <ScrollContainer>
        <VStack space={4} pb={20}>
          {
            plans && plans.length ? (
              plans.map((plan: IPlanDTO) => {
                return (
                  <VStack key={plan.id} borderWidth={0.4} borderColor="coolGray.700" py={6} px={4} rounded="lg">
                    <View>
                      <Heading textAlign="center" color="brand.800"> {plan.name}</Heading>
                      <Divider my={4} />
                      <VStack space={4}>
                        <Text> {plan.description}</Text>
                        <HStack>
                          <Icon as={Check} color="green.500" />
                          <Text> Cobranças automáticas</Text>
                        </HStack>

                        <HStack>
                          <Icon as={Check} color="green.500" />
                          <Text> Cobranças automáticas</Text>
                        </HStack>

                        <HStack>
                          <Icon as={Check} color="green.500" />
                          <Text> Limite de {plan.studentsLimit} alunos </Text>
                        </HStack>

                        <HStack>
                          <Icon as={Check} color="green.500" />
                          <Text> Limite de {plan.classesLimit} turmas </Text>
                        </HStack>
                      </VStack>
                    </View>
                    <Heading fontSize="xl" textAlign="center" my={8} color="brand.800">  {priceFormatted(plan.price)}/mês</Heading>
                    <View alignItems="center" justifyContent="center">
                      {
                        planIdExists == plan.id ? (
                          <Text fontSize={16}>Plano atual</Text>
                        ) : (
                          <Button w="48" colorScheme="brand.500" rounded="lg" isLoading={isActing} onPress={() => handleSave(plan.id)}>Selecionar</Button>
                        )
                      }
                    </View>
                  </VStack>
                )
              })
            )
              : (
                <Loading />
              )
          }
        </VStack>
      </ScrollContainer>
    </View>
  )
}