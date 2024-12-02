import { Avatar } from "@components/Avatar/Avatar";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { HStack, Heading, Image, Text, VStack } from "native-base";
import { UserCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";



interface IProps {
  user: IUserPreviewDTO;
  index: number;
}

export function StudentItem({ user, index }: IProps) {
  return (
    <TouchableOpacity key={user.id}>
      <HStack alignItems="center" rounded="md">
        <Avatar src={user?.avatar} alt="Foto de perfil do aluno" username={user?.username} />
        <VStack flex={1} ml={3}>
          <Heading numberOfLines={1} fontFamily="heading" fontSize="sm">{`${user?.firstName} ${user?.lastName}`}</Heading>
          <Text numberOfLines={1} color="gray.400" fontSize="xs">@{user?.username}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}