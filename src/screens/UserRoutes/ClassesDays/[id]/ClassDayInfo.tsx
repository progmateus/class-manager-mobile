import { PageHeader } from "@components/PageHeader";
import { Heading, ScrollView, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { StudentItem } from "@components/StudentItem";
import { Info } from "@components/ClassPage/Info";
import { GetRole } from "@utils/GetRole";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useEffect, useState } from "react";
import { GetClassDayService } from "src/services/classDaysService";
import { Loading } from "@components/Loading";
import { CreatebookingService, DeleteBookingService } from "src/services/bookingsService";
import { useAuth } from "@hooks/useAuth";


type RouteParamsProps = {
  classDayId: string;
  tenantId: string;
}

interface IClassDay {
  date: Date,
  hourStart: string,
  hourEnd: string,
  address: string,
  teachers: ITeacher[]
  bookings: any[]
}

interface ITeacher {
  name: string
}

export function ClassDayInfo() {
  const roles = [
    {
      tenantId: "123",
      roleId: "456",
      role: {
        name: "teacher"
      }
    }
  ]

  const isTeacher = GetRole(roles, "123", "teacher")

  const route = useRoute()

  const { classDayId, tenantId } = route.params as RouteParamsProps;
  const [classDay, setClassDay] = useState<IClassDay>({} as IClassDay)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const { user: { id: userId } } = useAuth()


  useEffect(() => {
    setIsLoading(true)
    GetClassDayService(tenantId, classDayId).then(({ data }) => {
      setClassDay({
        ...data.data,
        address: 'Praia da Bica, 255',
        teachers: [
          {
            name: 'Anderson Souza'
          }
        ]
      })
    }).catch((err) => {
      console.log('err: ', err.response)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [classDayId])

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
  ]

  const navigation = useNavigation<UserNavigatorRoutesProps>();

  function handleClickUpdateStatus() {
    navigation.navigate('updateClassDayStatus');
  }

  function handleParticipate() {
    setIsLoadingAction(true)

    CreatebookingService(tenantId, classDayId, userId).then(({ data }) => {
      const bookings = [...classDay.bookings, data.data]
      setClassDay({
        ...classDay,
        bookings
      })
    }).finally(() => {
      setIsLoadingAction(false)
    })
  }

  function handleCancelbooking() {
    setIsLoadingAction(true)
    const bookings = [...classDay.bookings]
    const index = bookings.findIndex((b) => b.userId === userId)
    DeleteBookingService(tenantId, bookings[index].id, classDayId, userId).then(({ data }) => {
      if (index !== -1) {
        bookings.splice(index, 1)
      }
      setClassDay({
        ...classDay,
        bookings
      })
    }).catch((err) => {
      console.log("ERRO: ", err)
    })
      .finally(() => {
        setIsLoadingAction(false)
      })
  }



  return (
    <View flex={1}>
      <PageHeader title="Detalhes da aula" />
      {
        isLoading ?
          (
            <Loading />
          )
          :
          (
            <ScrollView pb={20} px={2}>
              <Info infos={classDay} />
              <Heading px={4} fontFamily="heading" fontSize="md" mt={8}> Lista de presença</Heading>
              <VStack px={4} mt={2}>
                {
                  classDay.bookings && classDay.bookings.length > 0 && (
                    classDay.bookings.map((booking, index) => {
                      return (
                        <StudentItem key={index} student={booking.user} />
                      )
                    })
                  )
                }
                <VStack space={4} my={8}>
                  {
                    classDay.bookings && classDay.bookings.length > 0 && classDay.bookings.find((b) => b.user.id === userId) ? (
                      <Button title="DESMARCAR" h={10} fontSize="xs" rounded="md" onPress={handleCancelbooking} variant="outline" color="brand.600" />
                    ) : (
                      <Button title="PARTICIPAR" h={10} fontSize="xs" rounded="md" onPress={handleParticipate} />
                    )
                  }
                  {
                    isTeacher && (
                      <>
                        <Button title="ATUALIZAR STATUS" h={10} fontSize="xs" rounded="md" variant="outline" onPress={handleClickUpdateStatus}></Button>
                      </>
                    )
                  }
                </VStack>

              </VStack>
            </ScrollView>
          )
      }

    </View>
  )
}