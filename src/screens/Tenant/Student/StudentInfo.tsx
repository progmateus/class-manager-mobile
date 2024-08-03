import { MenuItem } from "@components/MenuItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { transformInvoiceStatus } from "@utils/TransformInvoiceStatus"
import { transformSubscriptionStatus } from "@utils/TransformSubscriptionStatus"
import { Center, HStack, Icon, Image, Link, Text, View, VStack } from "native-base"
import { GraduationCap, ArrowRight, IdentificationBadge, LinkSimple, Clock, Info, IdentificationCard, ArrowsLeftRight, CurrencyDollar, BookBookmark, MapPin, Phone, Article, Command, CurrencyCircleDollar, Target, Check, CheckCircle, LockKey, Money } from "phosphor-react-native"
import { TouchableOpacity } from "react-native"

export function StudentInfo() {
  const subscription = {
    user: {
      name: "Jane Doe",
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
    },
    status: 1,
    payments: [
      {
        status: 1
      }
    ]
  }
  return (
    <View flex={1}>
      <PageHeader title={subscription.user.name} />
      <ScrollContainer>
        <VStack space={8}>
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
                <Icon as={IdentificationCard} />
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
                <Text fontSize="sm" mt={2} color="coolGray.400">{subscription.user.username}</Text>
              </Center>
            </VStack>
          </HStack>


          <HStack space={4} justifyContent="space-between">
            <HStack borderWidth={0.8} rounded="lg" px={4} alignItems="center" justifyContent="space-between" flex={1}>
              <VStack>
                <Text fontSize="xs" color="coolGray.400">SITUAÇÃO</Text>
                <Text w={16} fontSize="lg" color="brand.500">
                  {transformSubscriptionStatus(subscription.status)}
                </Text>
              </VStack>
              <Icon as={Target} color="brand.500" />
            </HStack>

            <HStack borderWidth={0.8} rounded="lg" px={4} py={1} alignItems="center" justifyContent="space-between" flex={1}>
              <VStack>
                <Text fontSize="xs" color="coolGray.400">PAGAMENTO</Text>
                <Text w={16} fontSize="lg" color="success.500">
                  {transformInvoiceStatus(subscription.payments[0].status)}
                </Text>
              </VStack>
              <Icon as={CheckCircle} color="success.500" />
            </HStack>
          </HStack>

          <TouchableOpacity>
            <HStack bg="brand.100" rounded="md" px={4} py={2} space={4} alignItems="center">
              <View bg="brand.500" p={2} rounded="full">
                <Icon as={Money} color="white" />
              </View>
              <VStack flex={1}>
                <Text color="brand.500" fontWeight="bold">Seu aluno já pagou?</Text>
                <Text color="coolGray.400" fontSize="xs">
                  Se o seu aluno já pagou a assinatura por fora da plataforma, você pode informar manualmente.
                </Text>
              </VStack>
            </HStack>
          </TouchableOpacity>

          <VStack space={4} pb={20}>
            <Text color="coolGray.400" fontSize="md" mb={-2}> Ações</Text>
            <MenuItem.Root>
              <MenuItem.Icon icon={LockKey} />
              <MenuItem.Content title="Gerenciar assinatura" description="Gerencie os alunos manualmente" />
              <MenuItem.Actions>
                <MenuItem.Action icon={ArrowRight} />
              </MenuItem.Actions>
            </MenuItem.Root>

            <MenuItem.Root>
              <MenuItem.Icon icon={BookBookmark} />
              <MenuItem.Content title="Definir turma" description="Altere a turma do aluno" />
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