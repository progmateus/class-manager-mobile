import { Avatar } from "@components/Avatar/Avatar";
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { Image, Text, VStack } from "native-base";

interface IProps {
  subscription: ISubscriptionPreviewDTO;
}

export function SubscriptionOption({ subscription }: IProps) {
  return (
    <VStack justifyContent="center" alignItems="center" space={2}>
      <Avatar
        rounded="full"
        w={12}
        h={12}
        alt="user image"
        source={{
          uri: subscription.tenant?.avatar,
        }}
      />
      <Text fontSize="xs"> {subscription.tenant?.name}</Text>
    </VStack>
  )
}