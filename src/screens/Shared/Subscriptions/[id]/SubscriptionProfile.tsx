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
import { ArrowRight, IdentificationCard, BookBookmark, MapPin, Phone, CurrencyCircleDollar, Target, CheckCircle, LockKey, Money, ClockCounterClockwise, Lock, Check, X, SimCard, Plus, Pause, CurrencyDollar } from "phosphor-react-native"
import { useCallback, useMemo, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus"
import { GetSubscriptionProfileService, UpdateSubscriptionStatusService } from "src/services/subscriptionService"
import { HasRole } from "@utils/HasRole"
import { SubscriptionProfileSkeleton } from "@components/skeletons/screens/SubscriptionProfile"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserNavigatorRoutesProps } from "@routes/user.routes"
import { EAuthType } from "src/enums/EAuthType"
import { EdocumentType } from "src/enums/EDocumentType"


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
    queryKey: ['get-subscription-profile', subscriptionId],
    queryFn: loadSubscriptionProfile
  })


  const handleUpdateSubscriptionStatus = (status: ESubscriptionStatus) => {
    if (!subscription || !subscriptionId) {
      return
    }
    UpdateSubscriptionStatusService(tenantId, subscriptionId, status).then(async () => {
      await queryClient.setQueryData(['get-subscription-profile', subscriptionId], (oldData: ISubscriptionProfileDTO) => {
        return { ...oldData, status: status }
      })
      fireInfoToast('Assinatura atualizada com sucesso')
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsOpen(false)

    })
  }

  const handleNavigateToSubscribePage = () => {
    if (!subscription) {
      return
    }

    if (authenticationType == EAuthType.USER) {
      userNavigation.navigate('createSubscription', {
        tenantIdParams: tenantId
      })
    } else {
      tenantNavigation.navigate('createSubscription', { userId: subscription.userId })
    }

  }

  const replaceDocument = (): string => {
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/g;
    const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/g;

    if (authenticationType == EAuthType.TENANT) {
      return subscription?.user.document?.replaceAll(cpfRegex, "$1.$2.$3-$4") ?? "Não informado"
    } else {
      if (subscription?.tenant.documentType == EdocumentType.CPF) {
        return subscription?.tenant.document?.replaceAll(cpfRegex, "$1.$2.$3-$4") ?? "Não informado"
      } else {
        return subscription?.tenant.document?.replaceAll(cnpjRegex, "$1.$2.$3/$4-$5") ?? "Não informado"
      }
    }
  }

  const isAdmin = useMemo(() => {
    return HasRole(user.usersRoles, tenantId, ["admin"])
  }, [tenantId, subscriptionId])

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
    if (authenticationType == EAuthType.USER) {
      userNavigation.navigate('invoicesList', { subscriptionId: subscription.id, tenantIdParams: tenantId })
    } else {
      tenantNavigation.navigate('invoicesList', { subscriptionId: subscription.id, userId: subscription.userId })
    }
  }

  return (
    <View flex={1}>
      <PageHeader title={
        isLoading ? "" : `${subscription?.user?.name}`
      } />
      {
        isLoading || !subscription ? (<SubscriptionProfileSkeleton />)
          : (
            <ScrollContainer>
              <VStack space={8}>
                {
                  verifySubscriptionStatus([ESubscriptionStatus.INCOMPLETE_EXPIRED]) && (
                    <TouchableOpacity onPress={handleNavigateToSubscribePage}>
                      <View px={4} py={3} bgColor="red.400">
                        <Text fontSize="sm" fontFamily="body" color="coolGray.700" >
                          A assinatura expirou devido ao atraso do pagamento da primeira fatura. Clique aqui para gerar uma nova assinatura.
                        </Text>
                      </View>
                    </TouchableOpacity>
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
                <HStack justifyContent="space-between">
                  <VStack space={1}>
                    <HStack alignItems="center" space={1}>
                      <Icon as={CurrencyCircleDollar} />
                      <Text fontSize="sm" textTransform="capitalize">{subscription.tenantPlan.name} </Text>
                    </HStack>
                    <HStack alignItems="center" space={1}>
                      <Icon as={BookBookmark} />
                      <Text fontSize="sm" textTransform="capitalize">{subscription.user?.studentsClasses[0]?.class?.name} </Text>
                    </HStack>

                    <HStack alignItems="center" space={1}>
                      <Icon as={IdentificationCard} />
                      <Text fontSize="sm" >{replaceDocument()} </Text>
                    </HStack>

                    {
                      authenticationType == EAuthType.TENANT && (
                        <HStack alignItems="center" space={1}>
                          <Icon as={Phone} />
                          <Text fontSize="sm">{subscription?.user?.phone && subscription.user.phone.length > 0 ? subscription.user.phone : 'Não informado'}</Text>
                        </HStack>
                      )
                    }

                    {
                      authenticationType == EAuthType.TENANT && (
                        <HStack alignItems="center" space={1} maxWidth="56">
                          <Icon as={MapPin} />
                          <Text fontSize="sm" numberOfLines={1}>{`${subscription?.user?.address?.street ?? 'Não informado'}${subscription?.user?.address?.street && subscription?.user?.address?.number ? `, ${subscription?.user?.address?.number}` : ''}`}</Text>
                        </HStack>
                      )
                    }


                  </VStack>
                  <VStack>
                    <Center>
                      <Avatar
                        rounded="full"
                        w={24}
                        h={24}
                        alt="Foto de perfil"
                        src={authenticationType == EAuthType.USER ? subscription?.tenant?.avatar : subscription?.user?.avatar}
                      />
                      <Text fontSize="sm" mt={2} color="coolGray.500">@{authenticationType == EAuthType.USER ? subscription?.tenant?.username : subscription?.user?.username}</Text>
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
                      <Text fontSize="lg" color={transformInvoiceColor(subscription.latestInvoice?.status)}>
                        {transformInvoiceStatus(subscription.latestInvoice?.status)}
                      </Text>
                    </VStack>
                    <Icon as={CheckCircle} color={transformInvoiceColor(subscription.latestInvoice?.status)} />
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

                  {
                    authenticationType == EAuthType.TENANT && (
                      <MenuItem.Root onPress={() => tenantNavigation.navigate('updateStudentclass', { tenantIdParams: tenantId, userId: subscription.userId, subscriptionId })}>
                        <MenuItem.Icon icon={BookBookmark} />
                        <MenuItem.Content title="Alterar turma" description="Altere a turma do aluno" />
                        <MenuItem.Actions>
                          <MenuItem.Action icon={ArrowRight} />
                        </MenuItem.Actions>
                      </MenuItem.Root>
                    )
                  }

                  <MenuItem.Root onPress={() => tenantNavigation.navigate('updateSubscriptionPlan', { tenantIdParams: tenantId, planIdExists: subscription.tenantPlanId, subscriptionId })}>
                    <MenuItem.Icon icon={SimCard} />
                    <MenuItem.Content title="Alterar plano" description="Altere o plano do aluno" />
                    <MenuItem.Actions>
                      <MenuItem.Action icon={ArrowRight} />
                    </MenuItem.Actions>
                  </MenuItem.Root>

                  <MenuItem.Root onPress={handleNavigateToInvoicesPage}>
                    <MenuItem.Icon icon={CurrencyDollar} />
                    <MenuItem.Content title="Gerenciar cobranças" description="Gerencie as cobranças da sua assinatura" />
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

                  {/*                   {
                    verifySubscriptionStatus([ESubscriptionStatus.ACTIVE, ESubscriptionStatus.PAST_DUE, ESubscriptionStatus.UNPAID]) && (
                      <Actionsheet.Item onPress={() => handleUpdateSubscriptionStatus(ESubscriptionStatus.PAUSED)} startIcon={<Icon as={Pause} size="6" name="pause" />}>
                        <Text fontSize="16"> Pausar assinatura</Text>
                      </Actionsheet.Item>
                    )
                  } */}

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