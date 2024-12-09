import { Avatar } from "@components/Avatar/Avatar"
import { MenuItem } from "@components/Items/MenuItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { ISubscriptionProfileDTO } from "@dtos/subscriptions/ISubscriptionProfileDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { transformInvoiceColor, transformInvoiceStatus, transformSubscriptionColor, transformSubscriptionStatus } from "@utils/StatusHelper"
import { Actionsheet, Box, Center, Heading, HStack, Icon, Text, View, VStack } from "native-base"
import { ArrowRight, IdentificationCard, BookBookmark, MapPin, Phone, CurrencyCircleDollar, Target, CheckCircle, LockKey, Money, ClockCounterClockwise, Lock, Check, X, SimCard, Plus } from "phosphor-react-native"
import { useCallback, useMemo, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus"
import { GetSubscriptionProfileService, UpdateSubscriptionService } from "src/services/subscriptionService"
import { HasRole } from "@utils/HasRole"
import { SubscriptionProfileSkeleton } from "@components/skeletons/screens/SubscriptionProfile"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserNavigatorRoutesProps } from "@routes/user.routes"


type RouteParamsProps = {
  tenantIdParams?: string;
  subscriptionId: string;
}

export function SubscriptionProfile() {
  const [isActing, setIsActing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const route = useRoute()
  const { tenantIdParams, subscriptionId } = route.params as RouteParamsProps;
  const { tenant, user, authenticationType } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const tenantNavigation = useNavigation<TenantNavigatorRoutesProps>()
  const userNavigation = useNavigation<UserNavigatorRoutesProps>()

  const queryClient = useQueryClient();


  const loadSubscriptionProfile = async () => {
    try {
      const { data } = await GetSubscriptionProfileService(tenantId, subscriptionId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: subscription, isLoading } = useQuery<ISubscriptionProfileDTO>({
    queryKey: ['get-subscription-profile', tenantId, subscriptionId],
    queryFn: loadSubscriptionProfile
  })


  const payments = [
    {
      status: 1
    }
  ]

  const { mutate: updateSubscriptionMutate, isPending } = useMutation({
    mutationFn: async (status: ESubscriptionStatus) => {
      if (isPending || !subscription || !subscriptionId) {
        return
      }
      await UpdateSubscriptionService(tenantId, subscriptionId, status)
    },
    onSuccess: (data: void, variables: ESubscriptionStatus, context: unknown) => {
      if (variables === ESubscriptionStatus.ACTIVE) {
        fireSuccesToast('Assinatura ativada com sucesso')
      } else {
        fireInfoToast('Assinatura atualizada com sucesso')
      }
      setIsOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['get-subscription-profile', tenantId, subscriptionId]
      })
    }
  })

  const handleSubscribe = useCallback(() => {
    if (authenticationType == "user") {
      userNavigation.navigate('createSubscription', {
        tenantIdParams: tenantId
      })
    } else {
      tenantNavigation.navigate('createSubscription')
    }

  }, [subscriptionId, tenantId])

  const isAdmin = useMemo(() => {
    return HasRole(user.usersRoles, tenantId, ["admin"])
  }, [tenantId, subscriptionId])

  return (
    <View flex={1}>
      <PageHeader title={
        isLoading ? "" : `${subscription?.user?.firstName} ${subscription?.user?.lastName}`
      } />
      {
        isLoading || !subscription ? (<SubscriptionProfileSkeleton />)
          : (
            <ScrollContainer>
              <VStack space={8}>
                <HStack justifyContent="space-between">
                  <VStack space={1}>
                    <HStack alignItems="center" space={1}>
                      <Icon as={CurrencyCircleDollar} />
                      <Text fontSize="sm" textTransform="capitalize"> {subscription.tenantPlan.name} </Text>
                    </HStack>
                    <HStack alignItems="center" space={1}>
                      <Icon as={BookBookmark} />
                      <Text fontSize="sm" textTransform="capitalize"> {subscription.user?.studentsClasses[0]?.class?.name} </Text>
                    </HStack>

                    <HStack alignItems="center" space={1}>
                      <Icon as={IdentificationCard} />
                      <Text fontSize="sm" > {subscription.user.document} </Text>
                    </HStack>

                    <HStack alignItems="center" space={1}>
                      <Icon as={Phone} />
                      <Text fontSize="sm"> {subscription.user?.phone ?? 'Não informado'} </Text>
                    </HStack>

                    <HStack alignItems="center" space={1}>
                      <Icon as={MapPin} />
                      <Text fontSize="sm"> Não informado </Text>
                    </HStack>
                  </VStack>
                  <VStack>
                    <Center>
                      <Avatar
                        rounded="full"
                        w={24}
                        h={24}
                        alt="Foto de perfil"
                        src={subscription.user.avatar}
                        username={subscription.user.username}
                      />
                      <Text fontSize="sm" mt={2} color="coolGray.400">{subscription.user.username}</Text>
                    </Center>
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
                      <Text fontSize="lg" color={transformInvoiceColor(subscription.invoices[0]?.status)}>
                        {transformInvoiceStatus(payments[0].status)}
                      </Text>
                    </VStack>
                    <Icon as={CheckCircle} color={transformInvoiceColor(subscription.invoices[0]?.status)} />
                  </HStack>
                </HStack>

                {
                  isAdmin && (
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
                  )
                }



                <VStack space={4} pb={20}>
                  <Text color="coolGray.400" fontSize="md" mb={-2}> Ações</Text>

                  <MenuItem.Root onPress={() => setIsOpen(true)}>
                    <MenuItem.Icon icon={LockKey} />
                    <MenuItem.Content title="Gerenciar assinatura" description="Gerencie a assinatura manualmente" />
                    <MenuItem.Actions>
                      <MenuItem.Action icon={ArrowRight} />
                    </MenuItem.Actions>
                  </MenuItem.Root>

                  <MenuItem.Root onPress={() => tenantNavigation.navigate('updateStudentclass', { tenantIdParams: tenantId, userId: subscription.userId, subscriptionId })}>
                    <MenuItem.Icon icon={BookBookmark} />
                    <MenuItem.Content title="Alterar turma" description="Altere a turma do aluno" />
                    <MenuItem.Actions>
                      <MenuItem.Action icon={ArrowRight} />
                    </MenuItem.Actions>
                  </MenuItem.Root>

                  <MenuItem.Root onPress={() => tenantNavigation.navigate('updateSubscriptionPlan', { tenantIdParams: tenantId, planIdExists: subscription.tenantPlanId, subscriptionId })}>
                    <MenuItem.Icon icon={SimCard} />
                    <MenuItem.Content title="Alterar plano" description="Altere o plano do aluno" />
                    <MenuItem.Actions>
                      <MenuItem.Action icon={ArrowRight} />
                    </MenuItem.Actions>
                  </MenuItem.Root>

                  <MenuItem.Root onPress={() => tenantNavigation.navigate('bookingsHistory', { tenantIdParams: tenantId, userId: subscription.userId })}>
                    <MenuItem.Icon icon={ClockCounterClockwise} />
                    <MenuItem.Content title="Ver aulas" description="Visualize o histŕocio de aulas do aluno" />
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
                    subscription.status !== ESubscriptionStatus.ACTIVE && subscription.status === ESubscriptionStatus.CANCELED && (
                      <Actionsheet.Item onPress={handleSubscribe} startIcon={<Icon as={Plus} size="6" name="start" />}>
                        <Text fontSize="16"> Nova assinatura</Text>
                      </Actionsheet.Item>
                    )
                  }

                  {
                    subscription.status !== ESubscriptionStatus.ACTIVE && subscription.status !== ESubscriptionStatus.CANCELED && (
                      <Actionsheet.Item onPress={() => updateSubscriptionMutate(ESubscriptionStatus.ACTIVE)} startIcon={<Icon as={Check} size="6" name="start" />}>
                        <Text fontSize="16"> Ativar assinatura</Text>
                      </Actionsheet.Item>
                    )
                  }

                  {
                    subscription.status === ESubscriptionStatus.ACTIVE && (
                      <Actionsheet.Item onPress={() => updateSubscriptionMutate(ESubscriptionStatus.PAUSED)} startIcon={<Icon as={Lock} size="6" name="pause" />}>
                        <Text fontSize="16"> Pausar assinatura</Text>
                      </Actionsheet.Item>
                    )
                  }

                  {
                    subscription.status !== ESubscriptionStatus.CANCELED && (
                      <Actionsheet.Item onPress={() => updateSubscriptionMutate(ESubscriptionStatus.CANCELED)} startIcon={<Icon as={X} size="6" name="cancel" color="red.600" />}>
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