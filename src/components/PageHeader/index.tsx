import { Button, FlatList, HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native"


type Props = {
  title: string
}

import Constants from "expo-constants";


export function PageHeader({ title }: Props) {
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <HStack
      px={2}
      display="flex"
      alignItems="center"
      mt={statusBarHeight + 12}
      borderBottomWidth={0.5}
      py={3}
      borderBottomColor="coolGray.400"
    >
      <Icon as={ArrowLeft} />
      <Heading flex={1} textAlign="center" fontFamily="heading" fontSize="2xl"> {title} </Heading>
    </HStack>
  );
}