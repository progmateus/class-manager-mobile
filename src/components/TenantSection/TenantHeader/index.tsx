import { Button, FlatList, HStack, Heading, Image, Text, VStack, useTheme } from "native-base";
import { SignOut } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useAuth } from "@hooks/useAuth";
import { Avatar } from "@components/Avatar/Avatar";


type Props = {
  image: string
  name: string;
  description: string;
  categories: string[];
}

export function TenantHeader() {
  const { colors } = useTheme();
  const { tenant, signOutTenant } = useAuth()
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <HStack mt={statusBarHeight} pb={4} pt={6} px={4} alignItems="center" borderColor="gray.300" borderBottomWidth={0.5}>
      <Avatar src={tenant.avatar} alt="Foto de perfil da empresa" type="tenant" />
      <HStack flex={1}>
        <Text ml={2}>Olá,</Text>
        <Heading fontFamily="heading" fontSize="md"> {tenant.name}</Heading>
      </HStack>
      <TouchableOpacity onPress={signOutTenant}>
        <SignOut color={colors.coolGray['500']} />
      </TouchableOpacity>
    </HStack>
  );
}