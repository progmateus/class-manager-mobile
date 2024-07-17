import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Image, Text, VStack, View } from "native-base";

export function UpdateUser() {
  const user = {
    name: "John",
    lastname: "Doe",
    email: "johndoe@gmail.com",
    avatar: "https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph",
    document: "066.339.390-60"
  }
  return (
    <View flex={1}>
      <PageHeader title="Atualizar status" />
      <VStack pt={8} px={4}>
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
        <VStack>
          <HStack space={4} w={'48%'}>
            <Input label="Nome" />
            <Input label="Sobrenome" />
          </HStack>
        </VStack>
      </VStack>
    </View >
  )
}