import { transformInvoiceColor, transformSubscriptionColor } from "@utils/TransformColor";
import { transformInvoiceStatus } from "@utils/TransformInvoiceStatus";
import { transformSubscriptionStatus } from "@utils/TransformSubscriptionStatus";
import { HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

interface IProps {
  subscription: any
}
function SubscriptionItem({ subscription }: IProps) {
  return (
    <TouchableOpacity>
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
          <Text fontSize="sm" color="coolGray.900" fontWeight="bold">{subscription.user.name}</Text>
          <Text fontSize="sm" color="coolGray.500">{subscription.classes[0].name}</Text>
          <Text fontSize="sm" color="coolGray.500" fontWeight="semibold">{subscription.subscriptions[0].plan.name}</Text>
        </VStack>

        <VStack textAlign="right">
          <Text fontSize="sm" color="coolGray.800">{subscription.subscriptions[0].createdAt}</Text>
          <Text textAlign="right" fontSize="sm" color={transformSubscriptionColor(subscription.subscriptions[0].status)}>{transformSubscriptionStatus(subscription.subscriptions[0].status)}</Text>
          <Text textAlign="right" fontSize="sm" color={transformInvoiceColor(subscription.subscriptions[0].invoices[0].status)}>{transformInvoiceStatus(subscription.subscriptions[0].invoices[0].status)}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}

export { SubscriptionItem }