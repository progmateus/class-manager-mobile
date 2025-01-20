import { MenuItem } from "@components/Items/MenuItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { ISubscriptionProfileDTO } from "@dtos/subscriptions/ISubscriptionProfileDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireErrorToast, fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { transformInvoiceColor, transformInvoiceStatus, transformSubscriptionColor, transformSubscriptionStatus } from "@utils/StatusHelper"
import { Actionsheet, Box, Divider, Heading, HStack, Icon, Text, View, VStack } from "native-base"
import { ArrowRight, Target, CheckCircle, LockKey, Money, Check, X, SimCard, Plus, CurrencyDollar } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus"
import { RefreshUserSubscriptionService, UpdateSubscriptionStatusService } from "src/services/subscriptionService"
import { SubscriptionProfileSkeleton } from "@components/skeletons/screens/SubscriptionProfile"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { UserNavigatorRoutesProps } from "@routes/user.routes"
import { EAuthType } from "src/enums/EAuthType"
import { GetTenantSubscriptionProfileService, RefreshTenantSubscriptionService } from "src/services/tenantsService"
import dayjs from "dayjs"

export function TenantSubscriptionProfile() {
  const [isActing, setIsActing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { tenant, authenticationType } = useAuth()
  const tenantId = tenant.id
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const queryClient = useQueryClient();


  const loadTenantSubscriptionProfile = async () => {
    try {
      console.log('opaopaopa')
      const { data } = await GetTenantSubscriptionProfileService(tenantId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: subscription, isLoading } = useQuery<ISubscriptionProfileDTO>({
    queryKey: ['get-tenant-subscription-profile', tenantId],
    queryFn: loadTenantSubscriptionProfile
  })


  const handleUpdateSubscriptionStatus = (status: ESubscriptionStatus) => {
    if (!subscription) {
      return
    }
    UpdateSubscriptionStatusService(tenantId, subscription.id, status).then(async () => {
      await queryClient.setQueryData(['get-tenant-subscription-profile', tenantId], (oldData: ISubscriptionProfileDTO) => {
        return { ...oldData, status: status }
      })
      fireInfoToast('Assinatura atualizada com sucesso')
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsOpen(false)

    })
  }

  const handleRefreshTenantSubscription = () => {
    if (!subscription || isActing) {
      return
    }
    setIsActing(true)
    RefreshTenantSubscriptionService(tenant.id).then(({ data }) => {
      fireSuccesToast('Assinatura realizada')
      navigation.navigate('subscriptionProfile', {
        tenantIdParams: tenantId,
        subscriptionId: data.data.id
      })
    }).catch(() => {
      fireErrorToast('Ocorreu um erro')
    }).finally(() => {
      setIsActing(false)
    })
  }

  const handleNavigateToSubscribePage = () => {
    if (!subscription) {
      return
    }
    navigation.navigate('createTenantsubscription')
  }

  const verifySubscriptionStatus = (status: ESubscriptionStatus[]) => {
    if (!subscription) {
      return false
    }
    return status.some(x => x == subscription.status)
  }

  const handleNavigateToInvoicesPage = () => {
    if (!subscription) {
      return
    }
    navigation.navigate('invoicesList', { subscriptionId: subscription.id, tenantIdParams: tenant.id })
  }

  const onRefresh = async () => {
    queryClient.invalidateQueries({
      queryKey: ['get-tenant-subscription-profile', tenantId]
    })
  }

  const formatDate = (date: Date) => {
    return dayjs(date, 'YYYY-MM-DD').format('DD')
  }

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
    }).format(dayjs(date, 'YYYY-MM-DD:hh:mm').toDate())
  }

  const formatYear = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric'
    }).format(dayjs(date, 'YYYY-MM-DD:hh:mm').toDate())
  }


  return (
    <View flex={1}>
      <PageHeader title="Assinatura" />
      {
        isLoading || !subscription ? (<SubscriptionProfileSkeleton />)
          : (
            <ScrollContainer onRefresh={onRefresh} isRefreshing={isLoading}>
              <VStack space={8}>
                {
                  verifySubscriptionStatus([ESubscriptionStatus.INCOMPLETE_EXPIRED]) && (
                    <TouchableOpacity onPress={handleRefreshTenantSubscription}>
                      <View mt={-8} mx={-4} px={4} py={3} bgColor="red.400">
                        <Text fontSize="sm" fontFamily="body" color="coolGray.700" >
                          A assinatura expirou devido ao atraso do pagamento da primeira fatura. Clique aqui para gerar uma nova assinatura.
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                }

                {
                  subscription.nextPlanId && (
                    <View mt={-8} mx={-4} px={4} py={3} bgColor="blue.500">
                      <Text fontSize="sm" fontFamily="body" color="coolGray.100" >
                        {`Seu plano será alterado para o ${subscription.nextPlan?.name} ao final do ciclo de cobrança atual`}
                      </Text>
                    </View>
                  )
                }

                {
                  verifySubscriptionStatus([ESubscriptionStatus.INCOMPLETE]) && (
                    <TouchableOpacity>
                      <View px={4} py={3} bgColor="yellow.400">
                        <Text fontSize="sm" fontFamily="body" color="coolGray.700" >
                          Efetue o pagamento dentro das primeiras 24 horas para que a assinatura seja ativada.
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
                <HStack flex={1} space={6} alignItems="center" mt={2}>
                  <VStack justifyContent="center" alignItems="center">
                    <HStack alignItems="center" space={1}>
                      <Text fontSize={18} color="coolGray.500">{formatDate(subscription.currentPeriodStart)}</Text>
                      <Text fontSize={22} color="coolGray.600" textTransform="capitalize">{formatMonth(subscription.currentPeriodStart).substring(0, 3)}</Text>
                    </HStack>
                    <Text fontSize={14} color="coolGray.600" textAlign="center" ml={-2}>{formatYear(subscription.currentPeriodStart)}</Text>
                  </VStack>
                  <Divider flex={1} />
                  <VStack justifyContent="center" alignItems="center">
                    <HStack alignItems="center" space={1}>
                      <Text fontSize={18} color="coolGray.500">{formatDate(subscription.currentPeriodEnd)}</Text>
                      <Text fontSize={22} color="coolGray.600" textTransform="capitalize">{formatMonth(subscription.currentPeriodEnd).substring(0, 3)}</Text>
                    </HStack>
                    <Text fontSize={14} color="coolGray.500" textAlign="center" ml={-2}>{formatYear(subscription.currentPeriodEnd)}</Text>
                  </VStack>
                </HStack>


                <HStack space={4} justifyContent="space-between">
                  <HStack borderWidth={0.8} rounded="lg" px={4} alignItems="center" justifyContent="space-between" flex={1}>
                    <VStack flex={1}>
                      <Text fontSize="xs" color="coolGray.400">SITUAÇÃO</Text>
                      <Text fontSize="lg" color={transformSubscriptionColor(subscription.status)}>
                        {transformSubscriptionStatus(subscription.status)}
                      </Text>
                    </VStack>
                    <Icon as={Target} color={transformSubscriptionColor(subscription.status)} />
                  </HStack>

                  <HStack borderWidth={0.8} rounded="lg" px={4} py={1} alignItems="center" justifyContent="space-between" flex={1}>
                    <VStack flex={1}>
                      <Text fontSize="xs" color="coolGray.400">PAGAMENTO</Text>
                      <Text fontSize="lg" color={transformInvoiceColor(subscription.latestInvoice?.status)}>
                        {transformInvoiceStatus(subscription.latestInvoice?.status)}
                      </Text>
                    </VStack>
                    <Icon as={CheckCircle} color={transformInvoiceColor(subscription.latestInvoice?.status)} />
                  </HStack>
                </HStack>

                <TouchableOpacity>
                  <HStack bg="brand.100" rounded="md" px={4} py={2} space={4} alignItems="center">
                    <View bg="brand.500" p={2} rounded="full">
                      <Icon as={Money} color="white" />
                    </View>
                    <VStack flex={1}>
                      <Text color="brand.500" fontWeight="bold">Seu aluno já pagou?</Text>
                      <Text color="coolGray.400" fontSize="xs">
                        Se o seu aluno já pagou a assinatura por fora da plataforma, você pode informar manualmente.
                      </Text>
                    </VStack>
                  </HStack>
                </TouchableOpacity>

                <VStack space={4} pb={20}>
                  <Text color="coolGray.400" fontSize="md" mb={-2}>Ações</Text>

                  <MenuItem.Root onPress={() => setIsOpen(true)}>
                    <MenuItem.Icon icon={LockKey} />
                    <MenuItem.Content title="Gerenciar assinatura" description="Gerencie sua assinatura manualmente" />
                    <MenuItem.Actions>
                      <MenuItem.Action icon={ArrowRight} />
                    </MenuItem.Actions>
                  </MenuItem.Root>

                  {/*                   <MenuItem.Root onPress={() => navigation.navigate('updateTenantsubscriptionPlan', { tenantIdParams: tenantId, planIdExists: subscription.planId, subscriptionId: subscription?.id })}>
                    <MenuItem.Icon icon={SimCard} />
                    <MenuItem.Content title="Alterar plano" description="Altere o plano da sua assinatura" />
                    <MenuItem.Actions>
                      <MenuItem.Action icon={ArrowRight} />
                    </MenuItem.Actions>
                  </MenuItem.Root> */}

                  <MenuItem.Root onPress={handleNavigateToInvoicesPage}>
                    <MenuItem.Icon icon={CurrencyDollar} />
                    <MenuItem.Content title="Gerenciar cobranças" description="Gerencie as cobranças da empresa" />
                    <MenuItem.Actions>
                      <MenuItem.Action icon={ArrowRight} />
                    </MenuItem.Actions>
                  </MenuItem.Root>
                </VStack>
              </VStack>

              <Actionsheet isOpen={isOpen} size="full" onClose={() => setIsOpen(false)}>
                <Actionsheet.Content>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Heading fontSize="16" color="coolGray.600" textAlign="center">
                      Gerenciar assinatura
                    </Heading>
                  </Box>
                  {
                    verifySubscriptionStatus([ESubscriptionStatus.INCOMPLETE_EXPIRED, ESubscriptionStatus.CANCELED]) && (
                      <Actionsheet.Item onPress={handleNavigateToSubscribePage} startIcon={<Icon as={Plus} size="6" name="start" />}>
                        <Text fontSize="16"> Nova assinatura</Text>
                      </Actionsheet.Item>
                    )
                  }

                  {
                    verifySubscriptionStatus([ESubscriptionStatus.PAUSED]) && (
                      <Actionsheet.Item onPress={() => handleUpdateSubscriptionStatus(ESubscriptionStatus.ACTIVE)} startIcon={<Icon as={Check} size="6" name="start" />}>
                        <Text fontSize="16"> Ativar assinatura</Text>
                      </Actionsheet.Item>
                    )
                  }

                  {
                    verifySubscriptionStatus([ESubscriptionStatus.ACTIVE, ESubscriptionStatus.PAST_DUE, ESubscriptionStatus.UNPAID, ESubscriptionStatus.INCOMPLETE]) && (
                      <Actionsheet.Item onPress={() => handleUpdateSubscriptionStatus(ESubscriptionStatus.CANCELED)} startIcon={<Icon as={X} size="6" name="cancel" color="red.600" />}>
                        <Text fontSize="16" color="red.600"> Cancelar assinatura</Text>
                      </Actionsheet.Item>
                    )
                  }
                </Actionsheet.Content>
              </Actionsheet>
            </ScrollContainer>
          )
      }


    </View>
  )
}