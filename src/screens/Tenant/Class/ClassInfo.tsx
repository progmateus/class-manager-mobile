import { MenuItem } from "@components/MenuItem"
import { ScrollContainer } from "@components/ScrollContainer"
import { Center, HStack, Icon, Image, Link, Text, View, VStack } from "native-base"
import { GraduationCap, ArrowRight, IdentificationBadge, LinkSimple, Clock, Calendar, CalendarBlank, ArrowsLeftRight } from "phosphor-react-native"

export function ClassInfo() {
  const classInfo = {
    name: "aaa",
    students: [],
    avatar: "https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
  }
  return (
    <ScrollContainer>
      <VStack>
        <Center mt={12}>
          <Image
            rounded="full"
            w={24}
            h={24}
            alt="Foto de perfil"
            mr={4}
            source={{
              uri: classInfo.avatar,
            }}
            defaultSource={{ uri: classInfo.avatar }}
          />
          <Text fontSize="md" mt={4} textAlign="center" fontWeight="bold" color="brand.600">Alterar foto de perfil</Text>
        </Center>
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
    </ScrollContainer >
  )
}