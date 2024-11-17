import { Center, Heading, Text, VStack, ScrollView, Image, Icon, HStack, Toast } from "native-base";
import { Input } from "@components/form/Input";
import { Button } from "@components/Button";
import LogoSVG from "@assets/logo.svg"
import { Controller, useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { GuestNavigatorRoutesProps } from "@routes/guest.routes";
import { useState } from "react";
import { CreateUserService } from "src/services/usersService";
import { isValidCPF } from "@utils/isValidCPF";
import { IApiResponse } from "@dtos/shared/IApiResponse";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { useAuth } from "@hooks/useAuth";
import { UserNavigatorRoutesProps } from "@routes/user.routes";


const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm

const signUpSchema = z.object({
  firstname: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres"),
  lastname: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres"),
  email: z.string().email("E-mail inválido"),
  username: z.string({ required_error: "Campo obrigatório", }).regex(usernameRegex, "Nome de usuário inválido").trim(),
  password: z.string({ required_error: "Campo obrigatório", }),
  document: z.string({ required_error: "Campo obrigatório", }).transform((val) => val.replaceAll('.', '').replaceAll('-', ''))
});


type signUpProps = z.infer<typeof signUpSchema>

export function SignUp() {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<signUpProps>({
    resolver: zodResolver(signUpSchema)
  });

  const [isLoading, setIsLoading] = useState(false)
  const { singIn } = useAuth()

  const navigation = useNavigation<CompositeNavigationProp<UserNavigatorRoutesProps, GuestNavigatorRoutesProps>>();

  function handleClicksignIn() {
    navigation.navigate('signIn');
  }

  const handleSignUp = ({ firstname, lastname, document, email, password, username }: signUpProps) => {
    if (isLoading) return

    if (!isValidCPF(document)) {
      setError('document', { message: "CPF inválido" })
      return false
    }

    setIsLoading(true)

    CreateUserService({ firstname, lastname, document, email, password, username }).then(({ data }) => {
      fireSuccesToast("Usuário criado")
      singIn(email, password)
      navigation.navigate('signIn');
    }).catch((err) => {
      const data: IApiResponse = err
      if (data?.errors.find((err) => err.message === "ERR_EMAIL_ALREADY_EXISTS")) {
        setError('email', { message: "Este e-mail já está em uso" })
      }

      if (data?.errors.find((err) => err.message === "ERR_DOCUMENT_ALREADY_EXISTS")) {
        setError('document', { message: "Este CPF já está sendo utilizado" })
      }

      if (data?.errors.find((err) => err.message === "ERR_USERNAME_ALREADY_EXISTS")) {
        setError('username', { message: "Este nome de usuário já está sendo utilizado" })
      }

      if (data?.errors.find((e) => e.property == "Document.Number")) {
        setError("document", {
          message: "Documento inválido"
        })
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack px={10}>
        <Center mb={12} mt={24}>
          <LogoSVG width={48} height={48} />
          <Heading color="brand.500" fontFamily="heading" mt={2}> Class Manager </Heading>
        </Center>

        <Center>
          <Heading mb={12} fontFamily="heading">
            Criar Conta
          </Heading>

          <VStack space={6} w="full">
            <HStack space={4} w={'48%'}>
              <Controller
                name="firstname"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input placeholder="Nome" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.firstname?.message} />
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
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="Nome de usuário" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.username?.message} />
              )}
            />

            <Controller
              name="document"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="CPF" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.document?.message} />
              )}
            />

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

          <Button onPress={handleSubmit(handleSignUp)} mt={8} title="CADASTRAR" isLoading={isLoading} />
        </Center>

        <Center my={4}>
          <Text color="gray.500" fontSize="sm" mb={3} fontFamily="body"> Já possui uma conta?</Text>
        </Center>
        <Button title="FAZER LOGIN" variant="outline" onPress={handleClicksignIn} isLoading={isLoading} />
      </VStack >
    </ScrollView >
  )
}