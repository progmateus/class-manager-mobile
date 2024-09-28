import { Center, Heading, Text, VStack, ScrollView, Image, Icon } from "native-base";
import { Input } from "@components/form/Input";
import { Button } from "@components/Button";
import LogoSVG from "@assets/logo.svg"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { GuestNavigatorRoutesProps } from "@routes/guest.routes";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { fireErrorToast } from "@utils/HelperNotifications";


const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

type signInProps = z.infer<typeof signInSchema>


export function SignIn() {
  const navigation = useNavigation<CompositeNavigationProp<UserNavigatorRoutesProps, GuestNavigatorRoutesProps>>();

  const { control, handleSubmit, formState: { errors }, setError } = useForm<signInProps>({
    resolver: zodResolver(signInSchema)
  });

  const [isLoading, setIsLoading] = useState(false)
  const { singIn, user } = useAuth()

  function handleClickSignUp() {
    navigation.navigate('signUp');
  }


  async function handleSignIn({ email, password }: signInProps) {
    if (isLoading) return
    setIsLoading(true)

    singIn(email, password).then(() => {
      /* navigation.navigate('tenantsList'); */
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoading(false)
    })
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

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={onChange} value={value} />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="Senha" secureTextEntry onChangeText={onChange} value={value} />
              )}
            />

          </VStack>

          <Button mt={8} title="ENTRAR" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
        </Center>

        <Center my={4}>
          <Text color="gray.500" fontSize="sm" mb={3} fontFamily="body"> Ainda não tem acesso?</Text>
        </Center>
        <Button title="CADASTRE-SE" variant="outline" onPress={handleClickSignUp} />
      </VStack >
    </ScrollView >
  )
}