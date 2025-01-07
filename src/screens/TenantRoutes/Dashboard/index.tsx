import { TenantHeader } from "@components/TenantSection/TenantHeader";
import { DashboardOption } from "@components/tenant/dashboardOption";
import { Viewcontainer } from "@components/ViewContainer";
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { Center, Heading, HStack, Link, SimpleGrid, Text, View, VStack } from "native-base";
import { BookBookmark, CaretRight, Clock, CurrencyDollar, GraduationCap, IdentificationBadge, MapPin, Money, Pencil, SimCard } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { RefreshTenantSubscriptionService } from "src/services/tenantsService";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { THEME } from "src/theme";
import { ScrollContainer } from "@components/ScrollContainer";
import { ListSubscriptionsService } from "src/services/subscriptionService";
import { useQuery } from "@tanstack/react-query";
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { ListInvoicesService } from "src/services/invoiceService";
import { ETargetType } from "src/enums/ETargetType";
import { Avatar } from "@components/Avatar/Avatar";


export function Dashboard() {
  const { tenant, tenantUpdate } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const size = 24

  const { colors } = THEME;
  const color = colors.brand['600']



  const handleRefreshTenantsubscription = async () => {
    try {
      const { data } = await RefreshTenantSubscriptionService(tenant.id)
      tenantUpdate({ ...tenant, subscriptionStatus: data.data.subscriptionStatus })
      fireSuccesToast('Assinatura gerada com sucesso')
    } catch (err) {
      console.log('err: ', err)
    }
  }

  const loadSubscriptions = async () => {
    try {
      const { data } = await ListSubscriptionsService(tenant.id, { limit: "3" })
      return data.data
    } catch (err) {
      console.log('err: ', err)
    }
  }

  const { data: subscriptionsPreviews, isLoading: isLoadingSubscriptions, } = useQuery<ISubscriptionPreviewDTO[]>({
    queryKey: ['get-subscriptions-preview', tenant.id],
    queryFn: loadSubscriptions,
  })

  const loadInvoices = async () => {
    try {
      const { data } = await ListInvoicesService({
        tenantId: tenant.id,
        targetTypes: [ETargetType.TENANT]
      })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: invoicesPreviews, isLoading: isLoadingInvoices, } = useQuery<ISubscriptionPreviewDTO[]>({
    queryKey: ['get-invoices-preview', tenant.id],
    queryFn: loadInvoices,
  })



  return (
    <View flex={1} bgColor="brand.600">
      <TenantHeader />
      <VStack space={1}>
        {
          !tenant.stripeChargesEnabled && (
            <TouchableOpacity>
              <Link href={tenant.stripeOnboardUrl} px={4} py={3} bgColor="yellow.400">
                <Text fontSize="sm" fontFamily="body" color="coolGray.700">
                  Confirme a sua identidade para começar a receber pagamentos.
                </Text>
              </Link>
            </TouchableOpacity>
          )
        }

        {
          tenant.subscriptionStatus == ESubscriptionStatus.INCOMPLETE_EXPIRED && (
            <TouchableOpacity onPress={handleRefreshTenantsubscription}>
              <View px={4} py={3} bgColor="red.400">
                <Text fontSize="sm" fontFamily="body" color="coolGray.700" >
                  sua assinatura expirou. Clique aqui para gerar uma nova assinatura.
                </Text>
              </View>
            </TouchableOpacity>
          )
        }


        {
          tenant.subscriptionStatus == ESubscriptionStatus.INCOMPLETE && (
            <TouchableOpacity>
              <View px={4} py={3} bgColor="brand.200">
                <Text fontSize="sm" fontFamily="body" color="coolGray.700" >
                  Pague a primeira cobrança em até 24 horas para que a sua assinatura seja ativada.
                </Text>
              </View>

            </TouchableOpacity>
          )
        }
      </VStack>
      <View bgColor="white" flex={1} borderTopRadius={30}>
        <ScrollContainer>
          <VStack px="8" space="14">
            <HStack justifyContent="space-between">
              <DashboardOption text="Turmas" icon={<BookBookmark size={size} color={color} />} onPress={() => navigation.navigate('classes')} />
              <DashboardOption text="Planos" icon={<SimCard size={size} color={color} />} onPress={() => navigation.navigate('tenantPlansList')} />
              <DashboardOption text="Professores" icon={<IdentificationBadge size={size} color={color} />} onPress={() => navigation.navigate('teachersList', { roleName: 'teacher' })} />
            </HStack>
            <HStack justifyContent="space-between">
              <DashboardOption text="Editar informações" icon={<Pencil size={size} color={color} />} onPress={() => navigation.navigate('updateTenant')} />
              <DashboardOption text="Jornadas" icon={<Clock size={size} color={color} />} onPress={() => navigation.navigate('timesTablesList')} />
              <DashboardOption text="Endereços" icon={<MapPin size={size} color={color} />} onPress={() => navigation.navigate('addressesList')} />
            </HStack>
          </VStack>
          <VStack my={8}>
            <Heading fontFamily="heading" mb={4} fontSize="md"> Alunos</Heading>
            <HStack>
              {
                isLoadingSubscriptions ? (
                  <HStack justifyContent="space-evenly" flex={1}>
                    {
                      [1, 2, 3].map(() => (
                        <VStack justifyContent="center" alignItems="center" space={1}>
                          <Avatar w={12} h={12} />
                          <View w="16" h="3" bgColor="coolGray.300" rounded="xs" />
                        </VStack>
                      ))
                    }
                  </HStack>
                ) : (
                  <>
                    {
                      subscriptionsPreviews && subscriptionsPreviews.length > 0 ? (
                        <HStack
                          flex={1}>
                          {
                            subscriptionsPreviews.map((subscription) => (
                              <VStack alignItems="center" space={1} w="24">
                                <Avatar w={12} h={12} src={subscription.user?.avatar} />
                                <Text textAlign="center" fontSize={12}>{subscription.user?.name}</Text>
                              </VStack>
                            ))
                          }
                        </HStack>

                      )
                        : (
                          <Center>
                            <Text> Nenhum resultado encontrado</Text>
                          </Center>
                        )
                    }
                  </>
                )
              }
              <TouchableOpacity onPress={() => navigation.navigate('students')}>
                <VStack>
                  <View w={50} h={50} bgColor="coolGray.200" rounded="full" alignItems="center" justifyContent="center">
                    <Center>
                      <CaretRight size={23} />
                    </Center>
                  </View>
                  <Text textAlign="center" fontSize={12}> Ver mais</Text>
                </VStack>
              </TouchableOpacity>
            </HStack>
          </VStack>
          {/* <DashboardOption text="Inscrições" icon={<Receipt size={size} color={color} />} onPress={() => navigation.navigate('subscriptionProfile')} /> */}
        </ScrollContainer>
      </View>
    </View >
  )
}