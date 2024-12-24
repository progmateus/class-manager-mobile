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
import { InputMask } from "@components/form/InputMask";


const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm
const phoneRegex = /(\(?\d{2}\)?) ?(9{1})? ?(\d{4})-? ?(\d{4})/
const CPFRegex = /(^d{3}.?d{3}.?d{3}-?d{2}$)/

const signUpSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(150, "Max 150 caracteres"),
  email: z.string().email("E-mail inválido"),
  username: z.string({ required_error: "Campo obrigatório", }).regex(usernameRegex, "Nome de usuário inválido").trim(),
  password: z.string({ required_error: "Campo obrigatório", }),
  document: z.string({ required_error: "Campo obrigatório", }).regex(CPFRegex, "Telefone inválido").transform((val) => val.replaceAll(/\W/g, '').trim()),
  phone: z.string({ required_error: "Campo obrigatório", }).regex(phoneRegex, "Telefone inválido").transform((val) => val.replaceAll(/\W/g, '').trim())

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

  const handleSignUp = ({ name, document, email, password, username, phone }: signUpProps) => {
    if (isLoading) return

    if (!isValidCPF(document)) {
      setError('document', { message: "CPF inválido" })
      return false
    }

    setIsLoading(true)

    CreateUserService({ name, document, email, password, username, phone }).then(({ data }) => {
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

      if (data?.errors.find((e) => e.property == "Phone")) {
        setError("phone", {
          message: "Telefone inválido"
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

            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="Nome" autoCapitalize="none" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.email?.message} />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="Nome de usuário" autoCapitalize="none" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.username?.message} />
              )}
            />

            <Controller
              name="document"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputMask
                  placeholder="CPF"
                  type="cpf"
                  onChangeText={onChange} value={value} errorMessage={errors.document?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputMask
                  placeholder="Telefone"
                  type="cel-phone"
                  onChangeText={onChange} value={value} errorMessage={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder="Senha" variant="outline" secureTextEntry onChangeText={onChange} value={value} errorMessage={errors.password?.message} />
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