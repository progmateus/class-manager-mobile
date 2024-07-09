import { Button, FlatList, HStack, Heading, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
  image: string
  name: string;
  description: string;
  categories: string[];
}

export function HomeHeader() {
  const avatar = "https://s2-ge.glbimg.com/uj06VOFGUq1wczFCBKVMFxpZaD8=/0x0:6153x4393/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/7/4/qg6uKLSNmF1GfrmPxTGg/42.jpg"
  const name = "John Doe"
  return (
    <HStack pt={12} pb={5} px={4} alignItems="center" borderColor="gray.300" borderWidth={0.5}>
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
      <Text>Olá,</Text>
      <Heading fontFamily="heading" fontSize="md"> {name}</Heading>
    </HStack>
  );
}