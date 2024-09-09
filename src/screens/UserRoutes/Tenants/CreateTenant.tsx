import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Center, Image, Text, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";
import { useState } from "react";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { CreateTenantservice } from "src/services/tenantsService";

const documentRegex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}|([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
const usernameRegex = /^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$/

const createTenantSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  document: z.string().regex(documentRegex, "Documento inválido").trim(),
  username: z.string().regex(usernameRegex, "Nome de usuário inválido").trim(),
});

type CreateTenantProps = z.infer<typeof createTenantSchema>

export function CreateTenant() {
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<CreateTenantProps>({
    resolver: zodResolver(createTenantSchema)
  });

  const handleCreate = ({ name, document, username }: CreateTenantProps) => {
    if (isLoading) return
    setIsLoading(true)
    CreateTenantservice({ name, document, username }).then(() => {
      fireSuccesToast('Infirmações atualizadas com sucesso!')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar Empresa" rightIcon={Check} rightAction={handleSubmit(handleCreate)} />
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
              name="document"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="CPF / CNPJ" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.document?.message} />
              )}
            />
          </VStack>
        </VStack>
      </ScrollContainer>
    </View >
  )
}