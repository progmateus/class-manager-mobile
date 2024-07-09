import { Box, Button, FlatList, HStack, Heading, Image, Text, VStack } from "native-base";
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
      <HStack px={2} py={3} alignItems="center" rounded="md">
        <Image
          rounded="md"
          w={14}
          h={14}
          alt="teste"
          mr={4}
          source={{
            uri: image,
          }}
          defaultSource={{ uri: image }}
        />
        <VStack flex={1}>
          <Heading fontFamily="heading" fontSize="sm">{name} </Heading>
          <Text numberOfLines={2} color="gray.400" fontSize="xs">{description} dsadsadsadsadsad</Text>
          <HStack space={2}>
            {
              categories && categories.length && (
                categories.map((category) => {
                  return (
                    <Box rounded="full" bg="blueGray.100" px="7px" py="px" mt={3}>
                      <Text color="gray.500" fontSize="xs" > {category} </Text>
                    </Box>
                  )
                })
              )
            }
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}