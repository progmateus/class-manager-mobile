import { Avatar } from "@components/Avatar/Avatar"
import { Loading } from "@components/Loading"
import { MenuItem } from "@components/MenuItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { ISubscriptionProfileDTO } from "@dtos/subscriptions/ISubscriptionProfileDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { GetRole } from "@utils/GetRole"
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { transformInvoiceStatus } from "@utils/TransformInvoiceStatus"
import { transformSubscriptionStatus } from "@utils/TransformSubscriptionStatus"
import { Actionsheet, Box, Center, Heading, HStack, Icon, Image, Text, View, VStack } from "native-base"
import { ArrowRight, IdentificationCard, BookBookmark, MapPin, Phone, CurrencyCircleDollar, Target, CheckCircle, LockKey, Money, ClockCounterClockwise, TrashSimple, Lock, Check, X, SimCard } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus"
import { GetSubscriptionProfileService, ListSubscriptionsService, UpdateSubscriptionService } from "src/services/subscriptionService"


type RouteParamsProps = {
  tenantIdParams?: string;
  subscriptionId: string;
}

export function SubscriptionProfile() {
  const [isLoading, setIsLoadig] = useState(true)
  const [isActing, setIsActing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [subscription, setSubscription] = useState<ISubscriptionProfileDTO>({} as ISubscriptionProfileDTO)
  const route = useRoute()
  const { tenantIdParams, subscriptionId } = route.params as RouteParamsProps;
  const { tenant, user } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>()


  useFocusEffect(useCallback(() => {
    setIsLoadig(true)
    GetSubscriptionProfileService(tenantId, subscriptionId).then(({ data }) => {
      setSubscription(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoadig(false)
    })
  }, [tenantId, subscriptionId]))


  const payments = [
    {
      status: 1
    }
  ]


  const handleUpdateSubscription = (status: ESubscriptionStatus) => {
    if (isActing) return
    setIsActing(true)
    UpdateSubscriptionService(tenantId, subscriptionId, status).then(() => {
      setSubscription({
        ...subscription,
        status
      })
      fireInfoToast('Assinatura atualizada com sucesso')
    }).finally(() => {
      setIsOpen(false)
      setIsActing(false)
    })
  }

  const isAdmin = useCallback(() => {
    return GetRole(user.usersRoles, tenantId, "admin")
  }, [tenantId])
  return (
    <View flex={1}>
      {
        isLoading || !subscription.id ? (<Loading />)
          : (
            <>
              <PageHeader title={`${subscription.user.firstName} ${subscription.user.lastName}`} />
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
                        <Text fontSize="lg" color="brand.500">
                          {transformSubscriptionStatus(subscription.status)}
                        </Text>
                      </VStack>
                      <Icon as={Target} color="brand.500" />
                    </HStack>

                    <HStack borderWidth={0.8} rounded="lg" px={4} py={1} alignItems="center" justifyContent="space-between" flex={1}>
                      <VStack flex={1}>
                        <Text fontSize="xs" color="coolGray.400">PAGAMENTO</Text>
                        <Text fontSize="lg" color="success.500">
                          {transformInvoiceStatus(payments[0].status)}
                        </Text>
                      </VStack>
                      <Icon as={CheckCircle} color="success.500" />
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
                    <Text color="coolGray.400" fontSize="md" mb={-2}> Ações</Text>

                    {
                      isAdmin() && (
                        <MenuItem.Root onPress={() => setIsOpen(true)}>
                          <MenuItem.Icon icon={LockKey} />
                          <MenuItem.Content title="Gerenciar assinatura" description="Gerencie a assinatura manualmente" />
                          <MenuItem.Actions>
                            <MenuItem.Action icon={ArrowRight} />
                          </MenuItem.Actions>
                        </MenuItem.Root>
                      )
                    }

                    <MenuItem.Root onPress={() => navigation.navigate('updateStudentclass', { tenantIdParams: tenantId, userId: subscription.userId, classIdExists: subscription.user?.studentsClasses[0].class?.id as string, subscriptionId })}>
                      <MenuItem.Icon icon={BookBookmark} />
                      <MenuItem.Content title="Alterar turma" description="Altere a turma do aluno" />
                      <MenuItem.Actions>
                        <MenuItem.Action icon={ArrowRight} />
                      </MenuItem.Actions>
                    </MenuItem.Root>

                    <MenuItem.Root onPress={() => navigation.navigate('updateSubscriptionPlan', { tenantIdParams: tenantId, planIdExists: subscription.tenantPlanId, subscriptionId })}>
                      <MenuItem.Icon icon={SimCard} />
                      <MenuItem.Content title="Alterar plano" description="Altere o plano do aluno" />
                      <MenuItem.Actions>
                        <MenuItem.Action icon={ArrowRight} />
                      </MenuItem.Actions>
                    </MenuItem.Root>

                    <MenuItem.Root onPress={() => navigation.navigate('bookingsHistory', { tenantIdParams: tenantId, userId: subscription.userId })}>
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
                      subscription.status !== ESubscriptionStatus.ACTIVE && (
                        <Actionsheet.Item onPress={() => handleUpdateSubscription(ESubscriptionStatus.ACTIVE)} startIcon={<Icon as={Check} size="6" name="start" />}>
                          <Text fontSize="16"> Ativar assinatura</Text>
                        </Actionsheet.Item>
                      )
                    }

                    {
                      subscription.status === ESubscriptionStatus.ACTIVE && (
                        <Actionsheet.Item onPress={() => handleUpdateSubscription(ESubscriptionStatus.INACTIVE)} startIcon={<Icon as={Lock} size="6" name="pause" />}>
                          <Text fontSize="16"> Pausar assinatura</Text>
                        </Actionsheet.Item>
                      )
                    }

                    {
                      subscription.status !== ESubscriptionStatus.CANCELED && (
                        <Actionsheet.Item onPress={() => handleUpdateSubscription(ESubscriptionStatus.CANCELED)} startIcon={<Icon as={X} size="6" name="cancel" color="red.600" />}>
                          <Text fontSize="16" color="red.600"> Cancelar assinatura</Text>
                        </Actionsheet.Item>
                      )
                    }
                  </Actionsheet.Content>
                </Actionsheet>
              </ScrollContainer>
            </>
          )
      }
    </View>
  )
}