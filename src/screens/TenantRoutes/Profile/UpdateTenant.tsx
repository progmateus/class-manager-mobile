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
import { useTenant } from "@hooks/useTenant";
import { TextArea } from "@components/form/TextArea";
import { UpdateTenantSertvice } from "src/services/tenantsService";

const CPFRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
const CNPJRegex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/

const updateTenantSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  description: z.string().max(200, "Max 80 caracteres").trim().optional(),
  email: z.string({ required_error: "Campo obrigatório", }).email("E-mail inválido").trim(),
  document: z.string().regex(CPFRegex, "CPF Inválido").trim().transform((val) => val.replaceAll('.', '').replaceAll('-', '')),
  phone: z.string().trim().optional(),
});

type UpdateTenantProps = z.infer<typeof updateTenantSchema>

export function UpdateTenant() {
  const [isLoading, setIsLoading] = useState(false)
  const { tenant } = useTenant();

  const { control, handleSubmit, formState: { errors }, setError } = useForm<UpdateTenantProps>({
    defaultValues: {
      name: tenant.name,
      email: tenant.email,
      description: tenant.description,
      phone: '2140028922',
      document: tenant.document
    },
    resolver: zodResolver(updateTenantSchema)
  });

  const handleUpdate = ({ name, description, email, document }: UpdateTenantProps) => {
    if (!tenant.id || isLoading) return
    setIsLoading(true)
    UpdateTenantSertvice({ name, description, email, document }, tenant.id).then(() => {
      fireSuccesToast("Empresa atualizada!")
    }).catch((err) => {
      if (err.message && err.message === "ERR_VALIDATION") {
        checkErrors(err.errors)
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const checkErrors = (errors: any[]) => {
    if (errors.find((e) => e.property == "Document.Number")) {
      setError("document", {
        message: "Documeno inválido"
      })
    }

    if (errors.find((e) => e.message == "Document already exists")) {
      setError("document", {
        message: "Este documento já está sendo utilizado"
      })
    }

    if (errors.find((e) => e.message == "E-mail already exists")) {
      setError("email", {
        message: "Este E-mail já esta sendo utilizado"
      })
    }
  }

  return (
    <View flex={1} >
      <PageHeader title="Alterar Empresa" rightIcon={Check} rightAction={handleSubmit(handleUpdate)} />
      <ScrollContainer>
        <VStack pb={20}>
          <Center>
            <Image
              rounded="full"
              w={24}
              h={24}
              alt="Foto de perfil"
              mr={4}
              source={{
                uri: tenant.avatar,
              }}
              defaultSource={{ uri: tenant.avatar }}
            />
            < Text fontSize="md" mt={4} textAlign="center" fontWeight="bold" color="brand.600" > Alterar foto de perfil </Text>
          </Center>
          <VStack space={6} mt={12} >
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Nome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextArea label="Bio" value={value} onChangeText={onChange} h={24} px={2} fontSize="sm" variant="outline" color="coolGray.800" />
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