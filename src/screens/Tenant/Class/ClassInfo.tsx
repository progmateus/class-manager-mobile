import { ClassInfoItem } from "@components/Class/InfoItem"
import { MenuItem } from "@components/MenuItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { SimpleGrid, Text, View, VStack } from "native-base"
import { GraduationCap, ArrowRight, IdentificationBadge, LinkSimple, Clock, Calendar, CalendarBlank, ArrowsLeftRight } from "phosphor-react-native"

export function ClassInfo() {
  return (
    <View flex={1}>
      <PageHeader title="Turma" />
      <ScrollContainer>
        <SimpleGrid mt={4} columns={3} justifyContent="space-between">
          <ClassInfoItem title="ALUNOS" info="18" />
          <ClassInfoItem title="PROFESSORES" info="7" />
          <ClassInfoItem title="AULAS CONCLUÍDAS" info="749" />
          <ClassInfoItem title="AULAS PENDENTES" info="10" />
          <ClassInfoItem title="AULAS CANCLEDAS" info="4" />
        </SimpleGrid>
        <VStack space={4} pb={20}>
          <Text color="coolGray.400" fontSize="md" mb={-2}> Ações</Text>
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
      </ScrollContainer>
    </View>
  )
}