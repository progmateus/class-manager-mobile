import { Avatar } from "@components/Avatar/Avatar";
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

interface IProps {
  subscription: ISubscriptionPreviewDTO;
}

export function SubscriptionOption({ subscription }: IProps) {

  const navigation = useNavigation<UserNavigatorRoutesProps>()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('subscriptionProfile', {
      subscriptionId: subscription.id,
      tenantIdParams: subscription.tenant.id
    })}>
      <VStack justifyContent="center" alignItems="center" space={2}>
        <Avatar
          rounded="full"
          w={12}
          h={12}
          alt="user image"
          src={subscription.tenant?.avatar}
        />
        <Text fontSize="xs"> {subscription.tenant?.name}</Text>
      </VStack>
    </TouchableOpacity>
  )
}