import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { UserItem } from "@components/Users/UserItem"
import { useRoute } from "@react-navigation/native"
import { HStack, Text, View, VStack } from "native-base"
import { UpdateStudentClassService, UpdateTeacherClassService } from "src/services/classesService"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO"
import { useAuth } from "@hooks/useAuth"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ScrollContainer } from "@components/ScrollContainer"
import { ListUsersRolesService } from "src/services/rolesService"


type RouteParamsProps = {
  tenantIdParams: string;
  classId: string;
  roleName: "student" | "teacher";
}

export function AddUserToClass() {
  const route = useRoute()
  const { tenantIdParams, classId, roleName } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams

  const queryClient = useQueryClient();

  const loadUsersRoles = async () => {
    try {
      const { data } = await ListUsersRolesService([roleName], { tenantId })
      return data.data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  const { data: usersRoles, isLoading } = useQuery<IUsersRolesDTO[]>({
    queryKey: [`get-users-roles`, classId, tenantId, roleName],
    queryFn: loadUsersRoles
  })

  const handleAddUser = (userId: string) => {
    if (roleName === "student") {
      addStudent(userId)
    } else {
      addTeacher(userId)
    }
  }

  const addStudent = (userId: string) => {
    UpdateStudentClassService(tenantId, userId, classId).then(() => {
      fireSuccesToast('Aluno adicionado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['get-students-class']
      })
    })
  }

  const addTeacher = (userId: string) => {
    UpdateTeacherClassService(tenantId, userId, classId).then(() => {
      fireSuccesToast('Professor adicionado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['get-teachers-class']
      })
    })
  }

  return (
    <View flex={1}>
      <PageHeader title={`Adicionar ${roleName === 'student' ? 'alunos' : 'professores'}`} />
      <ScrollContainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={8} pb={20}>
                {
                  usersRoles && usersRoles.length ? (
                    usersRoles.map((userRole) => {
                      return (
                        <UserItem.Root key={userRole.id} onPress={() => handleAddUser(userRole.user.id)}>
                          <UserItem.Avatar url={userRole.user.avatar ?? ""} alt="Foto de perfil" />
                          <UserItem.Section>
                            <UserItem.Content>
                              <UserItem.Title title={`${userRole.user.firstName} ${userRole.user.lastName}`} />
                              <UserItem.Caption caption={userRole.user.username} />
                            </UserItem.Content>
                          </UserItem.Section>
                        </UserItem.Root>
                      )
                    })
                  )
                    : (
                      <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                    )
                }
              </VStack>
            )
        }

      </ScrollContainer>
    </View>
  )
}