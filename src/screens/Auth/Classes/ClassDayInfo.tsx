import { PageHeader } from "@components/PageHeader";
import { Heading, ScrollView, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { StudentItem } from "@components/StudentItem";
import { Info } from "@components/ClassPage/Info";
import { GetRole } from "@utils/GetRole";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

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
  const classItem = {
    date: new Date(2024, 7, 9),
    start: '18:00',
    end: '19:00',
    address: 'Praia da Bica, 255',
    teacher: {
      name: 'Anderson Souza'
    }
  }

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleClickUpdateStatus() {
    navigation.navigate('updateClassDayStatus');
  }


  return (
    <View flex={1}>
      <PageHeader title="Detalhes da aula" />
      <ScrollView pb={20} px={2}>
        <Info infos={classItem} />
        <Heading px={4} fontFamily="heading" fontSize="md" mt={8}> Lista de presença</Heading>
        <VStack px={4} mt={2}>
          {
            students && students.length > 0 && (
              students.map((student, index) => {
                return (
                  <StudentItem key={index} student={student} />
                )
              })
            )
          }
          <VStack space={4} my={8}>
            <Button title="PARTICIPAR" h={10} fontSize="xs" rounded="md"></Button>
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
    </View>
  )
}