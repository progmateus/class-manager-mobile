import ClockSVG from "@assets/clock-outline.svg"
import { Center, FlatList, HStack, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { PageHeader } from "@components/PageHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { Plus } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { Loading } from "@components/Loading";
import { Viewcontainer } from "@components/ViewContainer";
import dayjs from "dayjs";

type RouteParamsProps = {
  tenantIdParams?: string;
}

export function ClassesDaysList() {

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

  const classDays = [
    { id: "1", date: new Date(2024, 7, 9), tenantName: "Vôlei na ilha", className: "Iniciantes", local: "praia da bica, 255", students: students },
    { id: "2", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Dupla", local: "praia da bica, 255", students: students },
    { id: "3", date: new Date(2024, 7, 9), tenantName: "B4 Futvôlei", className: "Iniciantes", local: "praia da bica, 255", students: students },
    { id: "4", date: new Date(2024, 7, 9), tenantName: "Futvôlei AR", className: "Dupla", local: "praia da bica, 255", students: students },
    { id: "5", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Intermediarios", local: "praia da bica, 255", students: students },
    { id: "6", date: new Date(2024, 7, 9), tenantName: "B4 Futvôlei", className: "Avançados", local: "praia da bica, 255", students: students },
    { id: "7", date: new Date(2024, 7, 9), tenantName: "Bica Beach", className: "Avançados", local: "praia da bica, 255", students: students }

  ]



  const weekDays = [
    dayjs().day(0).toDate(),
    dayjs().day(1).toDate(),
    dayjs().day(2).toDate(),
    dayjs().day(3).toDate(),
    dayjs().day(5).toDate(),
    dayjs().day(6).toDate(),
    dayjs().day(7).toDate()
  ]

  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const route = useRoute()
  const [isLoading, setIsLoading] = useState(false)
  const params = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id || params?.tenantIdParams || null

  function handleClickClassDay() {
    if (!tenantId) return
    navigation.navigate('classDayInfo', {
      tenantIdParams: tenantId,
      classDayId: '24f072e1-703e-4c52-bfa5-3afa9deba9f1'
    });
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

  const createClassDay = () => {
    if (!tenantId) return

    navigation.navigate('createClassDay', {
      tenantIdParams: tenantId
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Aulas" rightIcon={tenantId ? Plus : null} rightIconColor="brand.500" rightAction={() => createClassDay()} />
      <Viewcontainer>
        <View flex={1}>
          <HStack>
            {weekDays && weekDays.length && (
              weekDays.map((date, index) => {
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

          <View flexGrow={1} px={4} mt={12}>
            {
              isLoading ? (<Loading />)
                : (
                  <FlatList
                    data={classDays}
                    flex={1}
                    pb={20}
                    keyExtractor={classDay => classDay.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity key={item.id} onPress={handleClickClassDay}>
                        <HStack p={4} space={4} alignItems="center" borderWidth={0.4} borderColor="coolGray.400" rounded="lg">
                          <VStack>
                            <Center>
                              <ClockSVG />
                              <Text> {getHours(item.date)}</Text>
                            </Center>
                          </VStack>
                          <VStack space={0.5} flex={1}>
                            <Heading fontSize="sm">{item.tenantName}</Heading>
                            <Text fontSize="xs">{item.className}</Text>
                            <Text fontSize="xs">{item.local}</Text>
                          </VStack>
                          <HStack>
                            {
                              item.students && item.students.length > 0 && (
                                item.students.map((student, index) => {
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
                              item.students && item.students.length > 3 && (
                                <View w={9} h={9} backgroundColor="brand.600" rounded="md" ml={-5} alignItems="center" justifyContent="center">
                                  <Text color="coolGray.100" fontSize="xs"> +{item.students.length - 3}</Text>
                                </View>
                              )
                            }
                          </HStack>
                        </HStack>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
                  ></FlatList>
                )
            }
          </View>
        </View>
      </Viewcontainer>
    </View>
  );
}