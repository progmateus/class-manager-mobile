import { Button, FlatList, HStack, Heading, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
  image: string
  name: string;
  description: string;
  categories: string[];
}

export function TenantItem({ image, name, description, categories }: Props) {
  return (
    <TouchableOpacity>
      <HStack space={2} px={2} py={4} alignItems="center" borderColor="gray.300" borderWidth={0.5} rounded="md">
        <Image
          rounded="full"
          w={12}
          h={12}
          alt="teste"
          source={{
            uri: image
          }}
        />
        <VStack flex={1}>
          <Heading fontFamily="heading" fontSize="md">{name} </Heading>
          <Text numberOfLines={2}>{description} dsadsadsadsadsad</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}