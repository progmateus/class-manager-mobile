import { HStack, Heading, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

interface IStudent {
  avatar: string;
  name?: string;
  username?: string;
}

interface IProps {
  student: IStudent;
}

export function StudentItem({ student }: IProps) {
  return (
    <TouchableOpacity key={student.avatar}>
      <HStack py={3} alignItems="center" rounded="md">
        <Image
          rounded="md"
          w={12}
          h={12}
          alt="teste"
          mr={4}
          source={{
            uri: student.avatar,
          }}
          defaultSource={{ uri: student.avatar }}
        />
        <VStack flex={1}>
          <Heading numberOfLines={1} fontFamily="heading" fontSize="sm"> John Doe </Heading>
          <Text numberOfLines={1} color="gray.400" fontSize="xs">@johnDoe</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}