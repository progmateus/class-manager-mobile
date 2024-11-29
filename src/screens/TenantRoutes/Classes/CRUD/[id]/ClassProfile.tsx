import { ClassInfoItem } from "@components/Class/InfoItem"
import { MenuItem } from "@components/Items/MenuItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { IClassDTO } from "@dtos/classes/IClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { HStack, Text, View, VStack } from "native-base"
import { GraduationCap, ArrowRight, IdentificationBadge, LinkSimple, Clock, CalendarBlank, ArrowsLeftRight } from "phosphor-react-native"
import { EClassDayStatus } from "src/enums/EClassDayStatus"
import { GetClassProfileService } from "src/services/classesService"

type RouteParamsProps = {
  classId: string;
  tenantIdParams: string;
}

type infoProfile = {
  classFound: IClassDTO;
  teachersCount: number;
  studentscount: number;
  classesDaysOfTheMonth: any[];
}

export function ClassProfile() {

  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const route = useRoute()

  const { classId, tenantIdParams } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams

  const loadClassProfile = async () => {
    try {
      const { data } = await GetClassProfileService(tenantId, classId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: infoProfile, isLoading } = useQuery<infoProfile>({
    queryKey: ['get-class-profile', tenantId, classId],
    queryFn: loadClassProfile
  })

  return (
    <View flex={1}>
      {
        isLoading || !infoProfile ? (
          <Loading />
        ) : (
          <>
            <PageHeader title={`Turma: ${infoProfile?.classFound?.name}`} />

            <ScrollContainer>
              <View>
                <Text color="coolGray.500" fontSize="md">•   Equipe</Text>
                <HStack mt={4}>
                  <ClassInfoItem title="ALUNOS" info={infoProfile?.studentscount || 0} />
                  <ClassInfoItem title="PROFESSORES" info={infoProfile?.teachersCount || 0} />
                  <View flex={1} />
                </HStack>
              </View>

              <View>
                <Text color="coolGray.500" fontSize="md">•   Aulas</Text>
                <HStack mt={4}>
                  <ClassInfoItem title="CONCLUÍDAS" info={infoProfile?.classesDaysOfTheMonth?.filter((cd) => cd.status === EClassDayStatus.CONCLUDED).length || 0} />
                  <ClassInfoItem title="PENDENTES" info={infoProfile?.classesDaysOfTheMonth?.filter((cd) => cd.status === EClassDayStatus.PENDING).length || 0} />
                  <ClassInfoItem title="CANCELADAS" info={infoProfile?.classesDaysOfTheMonth?.filter((cd) => cd.status === EClassDayStatus.CANCELED).length || 0} />
                </HStack>
              </View>

              <VStack space={4} pb={20}>
                <Text color="coolGray.400" fontSize="md" mb={-2}> Ações</Text>
                <MenuItem.Root onPress={() => navigation.navigate('listStudentsClass', { tenantIdParams: tenantId, classId })} >
                  <MenuItem.Icon icon={GraduationCap} />
                  <MenuItem.Content title="Gerenciar alunos" description="Gerencie os alunos manualmente" />
                  <MenuItem.Actions>
                    <MenuItem.Action icon={ArrowRight} />
                  </MenuItem.Actions>
                </MenuItem.Root>


                <MenuItem.Root onPress={() => navigation.navigate('listTeachersClass', { tenantIdParams: tenantId, classId })}>
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

                <MenuItem.Root onPress={() => navigation.navigate('updateClassTimeTable', { classId, timeTableIdExists: infoProfile.classFound.timeTableId })}>
                  <MenuItem.Icon icon={Clock} />
                  <MenuItem.Content title="Configurar horários" description="Gerencie os horários das aulas" />
                  <MenuItem.Actions>
                    <MenuItem.Action icon={ArrowRight} />
                  </MenuItem.Actions>
                </MenuItem.Root>

                <MenuItem.Root>
                  <MenuItem.Icon icon={CalendarBlank} />
                  <MenuItem.Content title="Criar aula" description="Crie aulas manualmente" />
                  <MenuItem.Actions>
                    <MenuItem.Action icon={ArrowRight} />
                  </MenuItem.Actions>
                </MenuItem.Root>

                <MenuItem.Root>
                  <MenuItem.Icon icon={ArrowsLeftRight} />
                  <MenuItem.Content title="Transferir alunos" description="Transfira todos os alunos para outra turma" />
                  <MenuItem.Actions>
                    <MenuItem.Action icon={ArrowRight} />
                  </MenuItem.Actions>
                </MenuItem.Root>

              </VStack>
            </ScrollContainer >
          </>
        )
      }
    </View >
  )
}