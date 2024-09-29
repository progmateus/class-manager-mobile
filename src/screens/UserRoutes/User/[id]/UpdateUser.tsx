import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Center, HStack, Image, Text, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";
import { useAuth } from "@hooks/useAuth";
import { UpdateUserService } from "src/services/usersService";
import { useState } from "react";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { Avatar } from "@components/Avatar/Avatar";

const CPFRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
const CNPJRegex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/

const updateUserSchema = z.object({
  firstName: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  lastName: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  email: z.string({ required_error: "Campo obrigatório", }).email("E-mail inválido").trim(),
  document: z.string().regex(CPFRegex, "CPF Inválido").trim().optional(),
  phone: z.string().trim().optional(),
});

type updateUserProps = z.infer<typeof updateUserSchema>

export function UpdateUser() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<updateUserProps>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: '2140028922',
      document: user.document
    },
    resolver: zodResolver(updateUserSchema)
  });

  const handleUpdate = ({ firstName, lastName, email, document, phone }: updateUserProps) => {
    if (!user.id || isLoading) return
    setIsLoading(true)
    UpdateUserService({ firstName, lastName, email, document, phone }).then(() => {
      fireSuccesToast('Infirmações atualizadas com sucesso!')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Dados Pessoais" rightIcon={Check} rightAction={handleSubmit(handleUpdate)} />
      <ScrollContainer>
        <VStack pb={20}>
          <Center>
            <Avatar
              rounded="full"
              w={24}
              h={24}
              alt="Foto de perfil"
              mr={4}
              src={user.avatar}
              username={user.username}
            />
            <Text fontSize="md" mt={4} textAlign="center" fontWeight="bold" color="brand.600">Alterar foto de perfil</Text>
          </Center>
          <VStack space={6} mt={12}>
            <HStack space={4} w={'48%'}>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input label="Nome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.firstName?.message} />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input label="Sobrenome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.lastName?.message} />
                )}
              />

              <Input label="Sobrenome" variant="outline" />
            </HStack>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="E-mail" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.email?.message} />
              )}
            />

            <Controller
              name="document"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="CPF" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.document?.message} />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Telefone" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.phone?.message} />
              )}
            />
          </VStack>
        </VStack>
      </ScrollContainer>
    </View >
  )
}