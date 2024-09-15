import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Center, HStack, Image, Text, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";

const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const updatePasswordSchema = z.object({
  currentPassword: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres"),
  newPassword: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres"),
  newPassowdConfirmation: z.string({ required_error: "Campo obrigatório", }),
}).refine((data) => data.newPassword === data.newPassowdConfirmation, {
  message: "As senhas devem ser iguais",
  path: ["newPassowdConfirmation"]
})

type updatePasswordProps = z.infer<typeof updatePasswordSchema>

export function UpdatePassword() {
  const { control, handleSubmit, formState: { errors } } = useForm<updatePasswordProps>({
    resolver: zodResolver(updatePasswordSchema)
  });

  const handleUpdate = (data: updatePasswordProps) => {
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
      <PageHeader title="Alterar Senha" rightIcon={Check} rightAction={handleSubmit(handleUpdate)} />
      <ScrollContainer>
        <VStack pb={20}>
          <View>
            <Text>
              Para ajudar na segurança da sua conta, sugerimos uma senha que contenha no mínimo 6 caracteres e inclua
              uma combinação de números, letras e caracteres
              especiais (!$@%).)
            </Text>
          </View>
          <VStack space={6} mt={8}>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Senha atual" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.currentPassword?.message} />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Nova senha" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.newPassword?.message} />
              )}
            />

            <Controller
              name="newPassowdConfirmation"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Confirmar a nova senha" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.newPassowdConfirmation?.message} />
              )}
            />
          </VStack>
        </VStack>
      </ScrollContainer>
    </View >
  )
}