import { Avatar } from "@components/Avatar/Avatar";
import { Box, Button, FlatList, HStack, Heading, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
  image?: string
  name: string;
  username: string;
  description?: string;
  categories?: string[];
  onPress: () => void;
}

export function TenantItem({ image = "https://img.freepik.com/vetores-gratis/ilustracao-de-galeria-icone_53876-27002.jpg?t=st=1724109695~exp=1724113295~hmac=ac8b71c89561ce80233228d6f6aa1afee6f502ea59bb0621757817241fad45b7&w=826", name, username, description, categories, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack px={2} py={3} alignItems="center" rounded="md">
        <Avatar
          rounded="md"
          w={12}
          h={12}
          alt="Imagem de perfil"
          mr={4}
          src={image}
        />
        <VStack flex={1}>
          <Heading numberOfLines={1} fontFamily="heading" fontSize="sm">{name} </Heading>
          <Text numberOfLines={1} color="gray.400" fontSize="xs">@{username}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}