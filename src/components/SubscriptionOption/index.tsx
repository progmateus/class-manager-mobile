import { Image, Text, VStack } from "native-base";

interface IProps {
  subscription: {
    tenant: {
      avatar: string;
      name: string
    }
  }
}

export function SubscriptionOption({ subscription }: IProps) {
  return (
    <VStack justifyContent="center" alignItems="center" space={2}>
      <Image
        rounded="full"
        w={12}
        h={12}
        alt="user image"
        source={{
          uri: subscription.tenant?.avatar,
        }}
        defaultSource={{ uri: subscription.tenant?.avatar }}
      />
      <Text fontSize="xs"> {subscription.tenant?.name}</Text>
    </VStack>
  )
}