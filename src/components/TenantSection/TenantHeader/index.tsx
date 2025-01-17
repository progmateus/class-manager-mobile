import { HStack, Heading, Link, Text, VStack, View } from "native-base";
import { Crosshair, SignOut } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useAuth } from "@hooks/useAuth";
import { Avatar } from "@components/Avatar/Avatar";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { RefreshTenantSubscriptionService } from "src/services/tenantsService";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";

export function TenantHeader() {
  const { tenant, signOutTenant, tenantUpdate } = useAuth()
  const statusBarHeight = Constants.statusBarHeight;

  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const balanceFormatted = () => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(tenant.AvailableBalance ?? 0)
  }

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
    <VStack space={6} pb={10} mt={statusBarHeight + 14}>
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
          tenant.latestSubscription?.status == ESubscriptionStatus.INCOMPLETE_EXPIRED && (
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
          tenant.latestSubscription?.status == ESubscriptionStatus.INCOMPLETE && (
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
      <HStack pb={4} px={6} alignItems="center" space={2}>
        <Avatar src={tenant.avatar} alt="Foto de perfil da empresa" type="tenant" />
        <VStack flex={1} ml={2}>
          <Text color="white" opacity={0.8}>Olá</Text>
          <Text fontFamily="Text" fontSize="md" color="white">{tenant.name}</Text>
        </VStack>
        <HStack space={4}>
          <TouchableOpacity onPress={() => navigation.navigate('tenantSubscriptionProfile')}>
            <Crosshair color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOutTenant}>
            <SignOut color="white" />
          </TouchableOpacity>
        </HStack>
      </HStack>
      <HStack justifyContent="center" alignItems="center">
        <Heading fontSize={34} textAlign="center" fontWeight="bold" color="white"> {balanceFormatted()}  </Heading>
      </HStack>
    </VStack>
  );
}