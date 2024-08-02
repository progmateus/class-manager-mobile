import { MenuItem } from "@components/MenuItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { Center, HStack, Icon, Image, Link, Text, View, VStack } from "native-base"
import { GraduationCap, ArrowRight, IdentificationBadge, LinkSimple, Clock, Info, CalendarBlank, ArrowsLeftRight, BookBookmark, MapPin, Phone, Article, Command, CurrencyCircleDollar } from "phosphor-react-native"

export function StudentInfo() {
  const subscription = {
    user: {
      name: "John Doe",
      username: "@johndoe",
      document: "759.785.860-47",
      phone: "(21) 94002-8922",
      avatar: "https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph",
      address: {
        street: "Estrada da bica",
        number: "241"
      },
      classes: [{ name: "Intermediário" }]
    },
    plan: {
      name: "Básico"
    }
  }
  return (
    <View flex={1}>
      <PageHeader title={subscription.user.name} />
      <ScrollContainer>
        <VStack>
          <HStack justifyContent="space-between">
            <VStack space={1}>
              <HStack alignItems="center" space={1}>
                <Icon as={CurrencyCircleDollar} />
                <Text fontSize="sm" textTransform="capitalize"> {subscription.plan.name} </Text>
              </HStack>
              <HStack alignItems="center" space={1}>
                <Icon as={BookBookmark} />
                <Text fontSize="sm" textTransform="capitalize"> {subscription.user.classes[0].name} </Text>
              </HStack>

              <HStack alignItems="center" space={1}>
                <Icon as={Info} />
                <Text fontSize="sm" > {subscription.user.document} </Text>
              </HStack>

              <HStack alignItems="center" space={1}>
                <Icon as={MapPin} />
                <Text fontSize="sm"> {subscription.user.address.street}, {subscription.user.address.number} </Text>
              </HStack>

              <HStack alignItems="center" space={1}>
                <Icon as={Phone} />
                <Text fontSize="sm"> {subscription.user.phone} </Text>
              </HStack>
            </VStack>
            <VStack>
              <Center>
                <Image
                  rounded="full"
                  w={24}
                  h={24}
                  alt="Foto de perfil"
                  source={{
                    uri: subscription.user.avatar,
                  }}
                  defaultSource={{ uri: subscription.user.avatar }}
                />
                <Text fontSize="sm" mt={4} color="coolGray.400">{subscription.user.username}</Text>
              </Center>
            </VStack>
          </HStack>
          <Text fontSize="sm" mt={4} fontWeight="bold" color="coolGray.400"> Mês atual</Text>
          <HStack space={4} mt={4}>
            <VStack h={24} borderWidth={0.8} rounded="lg" px={2}>
              <Text fontSize="3xl" color="success.500"> 49 </Text>
              <Text w={16} fontSize="xs">Alunos novos</Text>
            </VStack>
            <VStack h={24} borderWidth={0.8} rounded="lg" px={2}>
              <Text fontSize="3xl" color="danger.500"> 8 </Text>
              <Text maxW={20} fontSize="xs">Alunos cancelados</Text>
            </VStack>
            <VStack h={24} borderWidth={0.8} rounded="lg" px={2}>
              <Text fontSize="3xl" color="brand.600"> 3489 </Text>
              <Text maxW={20} fontSize="xs">Aulas concluídas</Text>
            </VStack>
          </HStack>
          <VStack mt={8} space={4} pb={20}>
            <MenuItem.Root>
              <MenuItem.Icon icon={GraduationCap} />
              <MenuItem.Content title="Gerenciar alunos" description="Gerencie os alunos manualmente" />
              <MenuItem.Actions>
                <MenuItem.Action icon={ArrowRight} />
              </MenuItem.Actions>
            </MenuItem.Root>


            <MenuItem.Root>
              <MenuItem.Icon icon={IdentificationBadge} />
              <MenuItem.Content title="Gerenciar professores" description="Gerencie os professores manualmente" />
              <MenuItem.Actions>
                <MenuItem.Action icon={ArrowRight} />
              </MenuItem.Actions>
            </MenuItem.Root>

            <MenuItem.Root>
              <MenuItem.Icon icon={LinkSimple} />
              <MenuItem.Content title="Gerar link de convite" description="Adiocone alunos automaticamnete" />
              <MenuItem.Actions>
                <MenuItem.Action icon={ArrowRight} />
              </MenuItem.Actions>
            </MenuItem.Root>

            <MenuItem.Root>
              <MenuItem.Icon icon={Clock} />
              <MenuItem.Content title="Configurar horários" description="gerencie os horários das aulas" />
              <MenuItem.Actions>
                <MenuItem.Action icon={ArrowRight} />
              </MenuItem.Actions>
            </MenuItem.Root>

            <MenuItem.Root>
              <MenuItem.Icon icon={CalendarBlank} />
              <MenuItem.Content title="criar aula" description="Crie aulas manualmente" />
              <MenuItem.Actions>
                <MenuItem.Action icon={ArrowRight} />
              </MenuItem.Actions>
            </MenuItem.Root>

            <MenuItem.Root>
              <MenuItem.Icon icon={ArrowsLeftRight} />
              <MenuItem.Content title="Transferir alunos" description="transfira todos os alunos para outra turma" />
              <MenuItem.Actions>
                <MenuItem.Action icon={ArrowRight} />
              </MenuItem.Actions>
            </MenuItem.Root>

          </VStack>
        </VStack>
      </ScrollContainer>
    </View>

  )
}