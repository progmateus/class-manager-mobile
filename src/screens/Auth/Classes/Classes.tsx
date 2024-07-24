import ClockSVG from "@assets/clock-outline.svg"
import { Center, HStack, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { PageHeader } from "@components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";

export function Classes() {
  const dates = [
    new Date(2024, 7, 9),
    new Date(2024, 7, 10),
    new Date(2024, 7, 11),
    new Date(2024, 7, 12),
    new Date(2024, 7, 13),
    new Date(2024, 7, 14),
    new Date(2024, 7, 15),
  ];

  const students = [
    { avatar: 'https://img.freepik.com/fotos-gratis/estilo-de-vida-emocoes-das-pessoas-e-conceito-casual-mulher-asiatica-sorridente-confiante-e-bonita-com-os-bracos-cruzados-confiante-pronta-para-ajudar-ouvindo-colegas-de-trabalho-participando-da-conversa_1258-59335.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/jovem-bonito-com-bracos-cruzados-em-fundo-branco_23-2148222620.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/bom-negocio-logo-depois-da-esquina-mulher-linda-afro-americana-confiante-agradavel-de-aparencia-amigavel-com-corte-de-cabelo-afro-pedindo-check-out-visite-a-pagina-da-loja-apontando-o-dedo-para-a-esquerda-e-sorrindo-olhando-a-camera_1258-85037.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/muito-bom-modelo-feminino-jovem-sorridente-com-maquiagem-natural-mostrando-sinal-de-ok-e-diga-sim-confirme-que-o-produto-esta-bem-aprovar-e-gostar-de-algo-em-pe-no-fundo-branco_176420-53322.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-premium/eu-amo-o-que-faco-retrato-recortado-de-uma-jovem-empresaria-atraente-trabalhando-em-seu-laptop-enquanto-esta-sentada-no-escritorio_590464-62606.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
    { avatar: 'https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph' },
  ]

  const classes = [
    { id: "1", date: new Date(2024, 7, 9), tenantName: "Vôlei na ilha", className: "Iniciantes", local: "praia da bica, 255", students: students },
    { id: "2", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Dupla", local: "praia da bica, 255", students: students },
    { id: "3", date: new Date(2024, 7, 9), tenantName: "Vôlei na ilha", className: "Iniciantes", local: "praia da bica, 255", students: students },
    { id: "4", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Dupla", local: "praia da bica, 255", students: students },
    { id: "5", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Intermediarios", local: "praia da bica, 255", students: students },
    { id: "6", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Avançados", local: "praia da bica, 255", students: students },
    { id: "7", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Avançados", local: "praia da bica, 255", students: students }

  ]

  const navigation = useNavigation<UserNavigatorRoutesProps>();

  function handleClickClassDay() {
    navigation.navigate('classDayInfo');
  }

  const getDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(date)
  };

  const getWeekDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(date)
  };

  const getHours = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    }).format(date)
  };

  return (
    <View flex={1}>
      <PageHeader title="Aulas" />
      <ScrollView flex={1}>
        <View pb={20}>
          <HStack>
            {dates && dates.length && (
              dates.map((date, index) => {
                return (
                  <VStack key={index} flex={1} justifyContent="space-between" mt={4}>
                    <TouchableOpacity>
                      <Center>
                        <Text textTransform="capitalize">
                          {getWeekDay(date).replace('.', '')}
                        </Text>
                        <Text fontFamily="heading" mt={2} fontSize="xl">
                          {getDay(date)}
                        </Text>
                        <View mt={2} w="1/3" borderBottomColor="coolGray.300" borderBottomWidth={2}></View>
                      </Center>
                    </TouchableOpacity>
                  </VStack>
                )
              })
            )}
          </HStack>

          <VStack flex={1} px={4} space={4} mt={12}>
            {
              classes && classes.length && (
                classes.map((classItem) => {
                  return (
                    <TouchableOpacity key={classItem.id} onPress={handleClickClassDay}>
                      <HStack p={4} space={4} alignItems="center" borderWidth={0.4} borderColor="coolGray.400" rounded="lg">
                        <VStack>
                          <Center>
                            <ClockSVG />
                            <Text> {getHours(classItem.date)}</Text>
                          </Center>
                        </VStack>
                        <VStack space={0.5} flex={1}>
                          <Heading fontSize="sm">{classItem.tenantName}</Heading>
                          <Text fontSize="xs">{classItem.className}</Text>
                          <Text fontSize="xs">{classItem.local}</Text>
                        </VStack>

                        <HStack>
                          {
                            classItem.students && classItem.students.length > 0 && (
                              classItem.students.map((student, index) => {
                                return (
                                  index < 3 && (
                                    <Image
                                      key={index}
                                      rounded="md"
                                      ml={-5}
                                      w={9}
                                      h={9}
                                      alt="image profile"
                                      source={{
                                        uri: student.avatar,
                                      }}
                                      defaultSource={{ uri: student.avatar }}
                                    />
                                  )
                                )
                              })
                            )
                          }

                          {
                            classItem.students && classItem.students.length > 3 && (
                              <View w={9} h={9} backgroundColor="brand.600" rounded="md" ml={-5} alignItems="center" justifyContent="center">
                                <Text color="coolGray.100" fontSize="xs"> +{classItem.students.length - 3}</Text>
                              </View>
                            )
                          }
                        </HStack>

                      </HStack>
                    </TouchableOpacity>
                  )
                })
              )}
          </VStack>
        </View>
      </ScrollView>
    </View>
  );
}