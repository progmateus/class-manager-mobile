import { Input } from "@components/Input";
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

const documentRegex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}|([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
const usernameRegex = /^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$/

const createTenantSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  lastName: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  email: z.string({ required_error: "Campo obrigatório", }).email("E-mail inválido").trim(),
  document: z.string().regex(documentRegex, "Documento inválido").trim(),
  username: z.string().regex(usernameRegex, "Nome de usuário inválido").trim(),
  phone: z.string().trim().optional(),
});

type CreateTenantProps = z.infer<typeof createTenantSchema>

export function CreateTenant() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, isLoadingUserStorageData } = useAuth();
  console.log('user: ', user)

  const { control, handleSubmit, formState: { errors } } = useForm<CreateTenantProps>({
    resolver: zodResolver(createTenantSchema)
  });

  const handleUpdate = ({ name, lastName, email, document, phone }: CreateTenantProps) => {
    if (!user.id || isLoading) return
    setIsLoading(true)
    UpdateUserService({ firstName: name, lastName, email, document, phone }).then(() => {
      fireSuccesToast('Infirmações atualizadas com sucesso!')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar Empresa" rightIcon={Check} rightAction={handleSubmit(handleUpdate)} />
      <ScrollContainer>
        <VStack pb={20}>
          <Center>
            <Image
              rounded="full"
              w={24}
              h={24}
              alt="Imagem"
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              }}
              defaultSource={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
            />
            <Text fontSize="md" mt={4} textAlign="center" fontWeight="bold" color="brand.600">Carregar imagem</Text>
          </Center>
          <VStack space={6} mt={12}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Nome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Nome de usuário" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.username?.message} />
              )}
            />

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
                <Input label="CPF / CNPJ" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.document?.message} />
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