import { Box, Button, FlatList, HStack, Heading, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
  image: string
  name: string;
  username: string;
  description: string;
  categories: string[];
  onPress: () => void;
}

export function TenantItem({ image, name, username, description, categories, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack px={2} py={3} alignItems="center" rounded="md">
        <Image
          rounded="md"
          w={12}
          h={12}
          alt="teste"
          mr={4}
          source={{
            uri: image,
          }}
          defaultSource={{ uri: image }}
        />
        <VStack flex={1}>
          <Heading numberOfLines={1} fontFamily="heading" fontSize="sm">{name} </Heading>
          <Text numberOfLines={1} color="gray.400" fontSize="xs">@{username}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}