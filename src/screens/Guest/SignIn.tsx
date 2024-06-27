import { Center, Heading, Text, VStack, ScrollView, Image, Icon } from "native-base";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import LogoSVG from "@assets/logo.svg"
import { useNavigation } from "@react-navigation/native";
import { GuestNavigatorRoutesProps } from "@routes/guest.routes";

export function SignIn() {
  const navigation = useNavigation<GuestNavigatorRoutesProps>();

  function handleClickSignUp() {
    navigation.navigate('signUp');
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Center mb={12} mt={24}>
          <LogoSVG width={48} height={48} />
          <Heading color="brand.500" fontFamily="heading" mt={2}> Class Manager </Heading>
        </Center>

        <Center>
          <Heading mb={12} fontFamily="heading">
            Fazer Login
          </Heading>

          <VStack space={6} w="full">
            <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />

            <Input placeholder="Senha" secureTextEntry />

          </VStack>

          <Button mt={8} title="ENTRAR" />
        </Center>

        <Center my={4}>
          <Text color="gray.500" fontSize="sm" mb={3} fontFamily="body"> Ainda não tem acesso?</Text>
        </Center>
        <Button title="CADASTRE-SE" variant="outline" onPress={handleClickSignUp} />
      </VStack >
    </ScrollView >
  )
}