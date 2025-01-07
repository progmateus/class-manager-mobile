import { TenantHeader } from "@components/TenantSection/TenantHeader";
import { DashboardOption } from "@components/tenant/dashboardOption";
import { Viewcontainer } from "@components/ViewContainer";
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { HStack, Link, SimpleGrid, Text, View, VStack } from "native-base";
import { BookBookmark, Clock, CurrencyDollar, GraduationCap, IdentificationBadge, MapPin, Money, SimCard } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { RefreshTenantSubscriptionService } from "src/services/tenantsService";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { THEME } from "src/theme";


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

  return (
    <View flex={1}>
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
      <Viewcontainer>
        <VStack px="8" space="14">
          <HStack justifyContent="space-between">
            <DashboardOption text="Turmas" icon={<BookBookmark size={size} color={color} />} onPress={() => navigation.navigate('classes')} />
            <DashboardOption text="Planos" icon={<SimCard size={size} color={color} />} onPress={() => navigation.navigate('tenantPlansList')} />
            <DashboardOption text="Professores" icon={<IdentificationBadge size={size} color={color} />} onPress={() => navigation.navigate('teachersList', { roleName: 'teacher' })} />
          </HStack>
          <HStack justifyContent="space-between">]
            <DashboardOption text="Editar informações" icon={<Clock size={size} color={color} />} onPress={() => navigation.navigate('updateTenant')} />
            <DashboardOption text="Jornadas" icon={<Clock size={size} color={color} />} onPress={() => navigation.navigate('timesTablesList')} />
            <DashboardOption text="Endereços" icon={<MapPin size={size} color={color} />} onPress={() => navigation.navigate('addressesList')} />
          </HStack>
        </VStack>
        {/* <DashboardOption text="Inscrições" icon={<Receipt size={size} color={color} />} onPress={() => navigation.navigate('subscriptionProfile')} /> */}
      </Viewcontainer>
    </View >
  )
}