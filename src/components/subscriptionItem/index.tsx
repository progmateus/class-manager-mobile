import { transformInvoiceColor, transformSubscriptionColor } from "@utils/TransformColor";
import { transformInvoiceStatus } from "@utils/TransformInvoiceStatus";
import { transformSubscriptionStatus } from "@utils/TransformSubscriptionStatus";
import { HStack, Image, Text, VStack } from "native-base";
import { Money, SimCard } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import dayjs from "dayjs"
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { ISubscriptionDTO } from "@dtos/subscriptions/ISubscriptionDTO";

interface IProps {
  subscription: ISubscriptionDTO
}
function SubscriptionItem({ subscription }: IProps) {
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  console.log("===========================================")
  console.log(subscription)
  const handleNavigateToProfile = () => {
    navigation.navigate('subscriptionProfile', {
      tenantId: subscription.tenantId,
      subscriptionId: subscription.id
    })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(dayjs(date, 'YYYY-MM-DD:hh:mm').toDate())
  }

  return (
    <TouchableOpacity onPress={handleNavigateToProfile}>
      <HStack space={4} alignItems="center">
        <Image
          rounded="full"
          w={12}
          h={12}
          alt="Foto de perfil"
          source={{
            uri: subscription.user.avatar,
          }}
          defaultSource={{ uri: subscription.user.avatar }}
        />
        <VStack flex={1}>
          <Text fontSize="sm" color="coolGray.900" fontWeight="bold">{`${subscription.user.firstName} ${subscription.user.lastName}`}</Text>
          {/* <Text fontSize="sm" color="coolGray.500">{subscription.classes[0].name}</Text> */}
          <Text fontSize="sm" color="coolGray.500" fontWeight="semibold">{subscription.tenantPlan.name}</Text>
        </VStack>

        <VStack textAlign="right" space={1}>
          <Text fontSize="xs" color="coolGray.500" textAlign="right">{formatDate(subscription.createdAt)}</Text>
          <VStack>
            <HStack alignItems="center" space={2} justifyContent="flex-end">
              <Text textAlign="right" fontSize="xs" color={transformSubscriptionColor(subscription.status)}>{transformSubscriptionStatus(subscription.status)}</Text>
              <SimCard color={transformSubscriptionColor(subscription.status)} size={16} />
            </HStack>

            {/* <HStack alignItems="center" space={2} justifyContent="flex-end">
              <Text textAlign="right" fontSize="xs" color={transformInvoiceColor(subscription.invoices[0].status)}>{transformInvoiceStatus(subscription.invoices[0].status)}</Text>
              <Money color={transformSubscriptionColor(subscription.status)} size={16} />
            </HStack> */}
          </VStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}

export { SubscriptionItem }