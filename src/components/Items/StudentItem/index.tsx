import { Avatar } from "@components/Avatar/Avatar";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { HStack, Heading, Image, Text, VStack } from "native-base";
import { UserCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";



interface IProps {
  user: IUserPreviewDTO;
}

export function StudentItem({ user }: IProps) {
  return (
    <TouchableOpacity key={user.id}>
      <HStack alignItems="center" rounded="md">
        <Avatar src={user?.avatar} alt="Foto de perfil do aluno" />
        <VStack flex={1} ml={3}>
          <Heading numberOfLines={1} fontFamily="heading" fontSize="sm">{user.name}</Heading>
          <Text numberOfLines={1} color="gray.400" fontSize="xs">@{user.username}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}