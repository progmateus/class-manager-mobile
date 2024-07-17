import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Center, HStack, Image, Text, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";

const CPFRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
const CNPJRegex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/

const updateUserSchema = z.object({
  name: z.string().min(3).max(80).trim(),
  lastname: z.string().min(3).max(80).trim(),
  email: z.string().email().trim(),
  document: z.string().regex(CPFRegex, "CPF Inválido").trim(),
  phone: z.string().trim(),
});

type updateUserProps = z.infer<typeof updateUserSchema>

export function UpdateUser() {
  const { control, handleSubmit, formState: { errors } } = useForm<updateUserProps>({
    resolver: zodResolver(updateUserSchema)
  });

  const handleUpdate = (data: updateUserProps) => {
    alert(data)
  }

  const user = {
    name: "John",
    lastname: "Doe",
    email: "johndoe@gmail.com",
    avatar: "https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph",
    document: "066.339.390-60"
  }
  return (
    <View flex={1}>
      <PageHeader title="Dados Pessoais" rightIcon={Check} rightAction={handleSubmit(handleUpdate)} />
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
                uri: user.avatar,
              }}
              defaultSource={{ uri: user.avatar }}
            />
            <Text fontSize="md" mt={4} textAlign="center" fontWeight="bold" color="brand.600">Alterar foto de perfil</Text>
          </Center>
          <VStack space={6} mt={12}>
            <HStack space={4} w={'48%'}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input label="Nome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
                )}
              />
              <Controller
                name="lastname"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input label="Sobrenome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.lastname?.message} />
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