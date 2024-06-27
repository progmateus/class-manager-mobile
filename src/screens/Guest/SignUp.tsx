import { Center, Heading, Text, VStack, ScrollView, Image, Icon, HStack } from "native-base";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import LogoSVG from "@assets/logo.svg"
import { Controller, useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"


const signUpSchema = z.object({
  name: z.string().min(3).max(80),
  lastname: z.string().min(3).max(80),
  email: z.string().email(),
  password: z.string(),
});

type signUpProps = z.infer<typeof signUpSchema>

export function signUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<signUpProps>({
    resolver: zodResolver(signUpSchema)
  });

  function handleSignUp() {

  }


  return (
    <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} w="xs">
        <Center mb={12} mt={24}>
          <LogoSVG width={48} height={48} />
          <Heading color="brand.500" fontFamily="heading" mt={2}> Class Manager </Heading>
        </Center>

        <Center>
          <Heading mb={12} fontFamily="heading">
            Criar Conta
          </Heading>

          <VStack space={6} w="full">
            <HStack space={4} w="full">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input placeholder="Nome" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
                )}
              />

              <Controller
                name="lastname"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input placeholder="Sobrenome" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.lastname?.message} />
                )}
              />
            </HStack>

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.email?.message} />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="Senha" secureTextEntry onChangeText={onChange} value={value} errorMessage={errors.password?.message} />
              )}
            />
          </VStack>

          <Button mt={8} title="CADASTRAR" />
        </Center>

        <Center my={4}>
          <Text color="gray.500" fontSize="sm" mb={3} fontFamily="body"> Já possui uma conta?</Text>
        </Center>
        <Button title="FAZER LOGIN" variant="outline" onPress={handleSubmit(handleSignUp)} />
      </VStack >
    </ScrollView >
  )
}