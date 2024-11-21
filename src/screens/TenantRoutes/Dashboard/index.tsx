import { TenantHeader } from "@components/TenantSection/TenantHeader";
import { DashboardOption } from "@components/tenant/dashboardOption";
import { Viewcontainer } from "@components/ViewContainer";
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { Link, SimpleGrid, Text, View, VStack } from "native-base";
import { BookBookmark, Clock, GraduationCap, IdentificationBadge, SimCard } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";


export function Dashboard() {
  const { tenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const size = 18
  const color = "white"

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
            <TouchableOpacity>
              <View px={4} py={3} bgColor="red.400">
                <Text fontSize="sm" fontFamily="body" color="coolGray.700" >
                  sua assinatura expirou. Clique aqui para gerar uma nova assinatura
                </Text>
              </View>
            </TouchableOpacity>
          )
        }


        {
          tenant.subscriptionStatus == ESubscriptionStatus.INCOMPLETE && (
            <TouchableOpacity>
              <Text fontSize="sm" fontFamily="body" color="coolGray.700">
                Pague a primeira cobrança da sua assinatura em até 24h para
                ativá-la
              </Text>
            </TouchableOpacity>
          )
        }
      </VStack>
      <Viewcontainer>
        <SimpleGrid columns={2} spacingX={4} spacingY={2} flex={1} pl={3}>
          <DashboardOption text="Alunos" icon={<GraduationCap size={size} color={color} />} onPress={() => navigation.navigate('students', { tenantIdParams: tenant.id })} />
          <DashboardOption text="Turmas" icon={<BookBookmark size={size} color={color} />} onPress={() => navigation.navigate('classes', { tenantIdParams: tenant.id })} />
          <DashboardOption text="Professores" icon={<IdentificationBadge size={size} color={color} />} onPress={() => navigation.navigate('teachersList', { roleName: 'teacher' })} />
          {/* <DashboardOption text="Inscrições" icon={<Receipt size={size} color={color} />} onPress={() => navigation.navigate('subscriptionProfile')} /> */}
          <DashboardOption text="Planos" icon={<SimCard size={size} color={color} />} onPress={() => navigation.navigate('tenantPlansList')} />
          <DashboardOption text="Jornadas" icon={<Clock size={size} color={color} />} onPress={() => navigation.navigate('timesTablesList')} />
          <DashboardOption text="Editar" icon={<Clock size={size} color={color} />} onPress={() => navigation.navigate('updateTenant')} />
        </SimpleGrid>
      </Viewcontainer>
    </View >
  )
}