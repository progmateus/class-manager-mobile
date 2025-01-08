import { TenantHeader } from "@components/TenantSection/TenantHeader";
import { DashboardOption } from "@components/tenant/dashboardOption";
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { Center, Heading, HStack, Link, ScrollView, Text, View, VStack } from "native-base";
import { Bank, BookBookmark, CaretRight, Clock, IdentificationBadge, MapPin, Pencil, SimCard } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { RefreshControl, TouchableOpacity } from "react-native";
import { THEME } from "src/theme";
import { ListSubscriptionsService } from "src/services/subscriptionService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { ListInvoicesService } from "src/services/invoiceService";
import { ETargetType } from "src/enums/ETargetType";
import { Avatar } from "@components/Avatar/Avatar";
import { Loading } from "@components/Loading";
import { InvoiceItem } from "@components/Items/InvoiceItem";
import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import Constants from "expo-constants";


export function Dashboard() {
  const { tenant, refreshTenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const size = 24

  const { colors } = THEME;
  const color = colors.brand['600']
  const statusBarHeight = Constants.statusBarHeight;

  const queryClient = useQueryClient();

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
        targetTypes: [ETargetType.TENANT],
        limit: "1"
      })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: invoicesPreviews, isLoading: isLoadingInvoices } = useQuery<IInvoiceDTO[]>({
    queryKey: ['get-invoices-preview', tenant.id],
    queryFn: loadInvoices,
  })

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-subscriptions-preview', tenant.id]
    })
    queryClient.invalidateQueries({
      queryKey: ['get-invoices-preview', tenant.id]
    })
    refreshTenant()
  }



  return (
    <ScrollView flex={1} bgColor="brand.600" refreshControl={
      <RefreshControl refreshing={isLoadingSubscriptions && isLoadingInvoices} onRefresh={onRefresh} />
    }>
      <TenantHeader />
      <VStack space={1}>
      </VStack>
      <View bgColor="white" flex={1} borderTopRadius={30} px={4} pt={10}>
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
        <VStack mt={8}>
          <Heading fontFamily="heading" mb={4} fontSize="md">Alunos</Heading>
          <HStack>
            {
              isLoadingSubscriptions ? (
                <HStack justifyContent="space-evenly" flex={1}>
                  {
                    [1, 2, 3].map((item) => (
                      <VStack justifyContent="center" alignItems="center" space={1} key={item}>
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
                            <TouchableOpacity onPress={() => navigation.navigate('subscriptionProfile', { subscriptionId: subscription.id, tenantIdParams: subscription.tenantId })}>
                              <VStack key={subscription.id} alignItems="center" space={1} w="24">
                                <Avatar w={12} h={12} src={subscription.user?.avatar} />
                                <Text textAlign="center" fontSize={12}>{subscription.user?.name}</Text>
                              </VStack>
                            </TouchableOpacity>
                          ))
                        }
                      </HStack>

                    )
                      : (
                        <Center flex={1}>
                          <Text>Nenhum resultado encontrado</Text>
                        </Center>
                      )
                  }
                </>
              )
            }
            <TouchableOpacity onPress={() => navigation.navigate('students')}>
              <VStack space={1} alignItems="center">
                <View w={50} h={50} bgColor="coolGray.200" rounded="full" alignItems="center" justifyContent="center">
                  <Center>
                    <CaretRight size={23} />
                  </Center>
                </View>
                <Text textAlign="center" fontSize={12}>Ver mais</Text>
              </VStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <VStack mt={8}>
          <Heading fontFamily="heading" mb={4} fontSize="md">Conta bancaria</Heading>
          <HStack>
            {
              tenant.externalsBanksAccounts && tenant.externalsBanksAccounts.length > 0 ? (
                <VStack flex={1} space={2}>
                  {
                    tenant.externalsBanksAccounts.map((bankAccount) => (
                      <HStack key={bankAccount.id} alignItems="center" px={4} py={3} borderRadius={7} borderWidth={0.7} borderColor="coolGray.300">
                        <View bgColor="coolGray.200" p={2} borderRadius={7}>
                          <Bank />
                        </View>
                        <VStack flex={1} ml={4} space={1.5}>
                          <Text> {bankAccount.name} </Text>
                          <HStack space={4}>
                            <Text color="coolGray.500" fontSize={14}>• {bankAccount.routingNumber}</Text>
                            <Text color="coolGray.500" fontSize={14}>• ***{bankAccount.last4} </Text>
                          </HStack>
                        </VStack>
                      </HStack>
                    ))
                  }
                </VStack>
              )
                : (
                  <Center flex={1} py={8}>
                    <Text>Nenhum resultado encontrado</Text>
                  </Center>
                )
            }
          </HStack>
        </VStack>
        <VStack mt={8} pb={20}>
          <Heading fontFamily="heading" mb={4} fontSize="md">Ultima cobrança</Heading>
          <HStack>
            {
              isLoadingInvoices ? (
                <Loading />
              ) : (
                <>
                  {
                    invoicesPreviews && invoicesPreviews.length > 0 ? (
                      <VStack flex={1} space={2}>
                        {
                          invoicesPreviews.map((invoice) => (
                            <InvoiceItem key={invoice.id} invoice={invoice} />
                          ))
                        }
                      </VStack>
                    )
                      : (
                        <Center flex={1} py={8}>
                          <Text> Nenhum resultado encontrado</Text>
                        </Center>
                      )
                  }
                </>
              )
            }
          </HStack>
        </VStack>
      </View>
    </ScrollView >
  )
}