import { HStack, Heading, Image, Text, VStack } from "native-base";
import { UserCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

interface IStudent {
  avatar: string;
  name: {
    lastName: string;
    firstName: string;
  }
  username?: string;

}

interface IProps {
  student: IStudent;
}

export function StudentItem({ student }: IProps) {
  console.log('student: ', student)
  return (
    <TouchableOpacity key={student.avatar}>
      <HStack py={3} alignItems="center" rounded="md">
        {
          !student.avatar ? (
            <UserCircle size={48} weight="light" />
          ) :
            (
              <Image
                rounded="md"
                w={12}
                h={12}
                alt="Foto de perfil"
                source={{
                  uri: student.avatar,
                }}
                defaultSource={{ uri: student.avatar }}
              />
            )
        }
        <VStack ml={4} flex={1}>
          <Heading numberOfLines={1} fontFamily="heading" fontSize="sm"> {`${student.name.firstName} ${student.name.lastName}`} </Heading>
          <Text numberOfLines={1} color="gray.400" fontSize="xs">@johnDoe</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}