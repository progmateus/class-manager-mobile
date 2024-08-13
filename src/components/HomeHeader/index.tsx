import { Button, FlatList, HStack, Heading, Image, Text, VStack, useTheme } from "native-base";
import { SignOut } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";


type Props = {
  image: string
  name: string;
  description: string;
  categories: string[];
}

export function HomeHeader() {
  const avatar = "https://s2-ge.glbimg.com/uj06VOFGUq1wczFCBKVMFxpZaD8=/0x0:6153x4393/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/7/4/qg6uKLSNmF1GfrmPxTGg/42.jpg"
  const name = "John Doe"
  const { colors } = useTheme();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <HStack mt={statusBarHeight} pb={4} pt={6} px={4} alignItems="center" borderColor="gray.300" borderBottomWidth={0.5}>
      <Image
        rounded="full"
        w={10}
        h={10}
        mr={2}
        alt="teste"
        source={{
          uri: avatar,
        }}
        defaultSource={{ uri: avatar }}
      />
      <HStack flex={1}>
        <Text>Olá,</Text>
        <Heading fontFamily="heading" fontSize="md"> {name}</Heading>
      </HStack>
      <TouchableOpacity>
        <SignOut color={colors.coolGray['500']} />
      </TouchableOpacity>
    </HStack>
  );
}