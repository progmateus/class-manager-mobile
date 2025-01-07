import { HStack, Heading, Text, VStack } from "native-base";
import { SignOut } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useAuth } from "@hooks/useAuth";
import { Avatar } from "@components/Avatar/Avatar";

export function TenantHeader() {
  const { tenant, signOutTenant } = useAuth()
  const statusBarHeight = Constants.statusBarHeight;

  const balanceFormatted = () => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(tenant.AvailableBalance ?? 0)
  }

  return (
    <VStack space={6} pb={10}>
      <HStack mt={statusBarHeight} pb={4} pt={8} px={6} alignItems="center" space={2}>
        <Avatar src={tenant.avatar} alt="Foto de perfil da empresa" type="tenant" />
        <VStack flex={1} ml={2}>
          <Text color="white" opacity={0.8}>Olá</Text>
          <Text fontFamily="Text" fontSize="md" color="white">{tenant.name}</Text>
        </VStack>
        <TouchableOpacity onPress={signOutTenant}>
          <SignOut color="white" />
        </TouchableOpacity>
      </HStack>
      <HStack justifyContent="center" alignItems="center">
        <Heading fontSize={34} textAlign="center" fontWeight="bold" color="white"> {balanceFormatted()}  </Heading>
      </HStack>
    </VStack>
  );
}