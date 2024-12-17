import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { UserItem } from "@components/Users/UserItem"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Box, Checkbox, HStack, Icon, Text, View, VStack } from "native-base"
import { ListStudentsByClassService, ListTeachersByClassService, UpdateManyStudentsClassesService, UpdateTeacherClassService } from "src/services/classesService"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO"
import { useAuth } from "@hooks/useAuth"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ScrollContainer } from "@components/ScrollContainer"
import { ListUsersRolesService } from "src/services/rolesService"
import { ITeacherClassDTO } from "@dtos/classes/TeacherClassDTO"
import { IStudentClassDTO } from "@dtos/classes/IStudentClassDTO"
import { useCallback, useState } from "react"
import { Check, MagnifyingGlass } from "phosphor-react-native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { Input } from "@components/form/Input"
import { debounce } from "lodash"


type RouteParamsProps = {
  tenantIdParams: string;
  classId: string;
  roleName: "student" | "teacher";
}

export function AddUserToClass() {
  const route = useRoute()
  const [search, setSearch] = useState("")
  const { tenantIdParams, classId, roleName } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const [existentClassRolesIds, setExistentClassRolesIds] = useState<string[]>([])
  const tenantId = tenant?.id ?? tenantIdParams

  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const queryClient = useQueryClient();

  const loadUsersRoles = async () => {
    try {
      const { data } = await ListUsersRolesService([roleName], { tenantId, search })
      return data.data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  const loadExistentUsersClass = async () => {
    if (roleName == "student") {
      const { data } = await ListStudentsByClassService(tenantId, classId, {})
      setExistentClassRolesIds(data.data.map((x: ITeacherClassDTO) => x.userId))
      return data.data
    } else {
      const { data } = await ListTeachersByClassService(tenantId, classId, {})
      setExistentClassRolesIds(data.data.map((x: IStudentClassDTO) => x.userId))
      return data.data
    }
  }

  const { data: usersRoles, isLoading } = useQuery<IUsersRolesDTO[]>({
    queryKey: [`get-users-roles`, classId, tenantId, roleName, search],
    queryFn: loadUsersRoles
  })

  const { data: existentUsersClass, isLoading: isLoadingConflict } = useQuery<ITeacherClassDTO[] | IStudentClassDTO[]>({
    queryKey: [`get-class-users-roles`, classId, tenantId, roleName],
    queryFn: loadExistentUsersClass
  })

  const handleAddUsers = () => {
    if (roleName === "student") {
      addStudent()
    } else {
      addTeacher()
    }
  }

  const addStudent = () => {
    UpdateManyStudentsClassesService(tenantId, existentClassRolesIds, classId).then(() => {
      fireSuccesToast('Alunos atualizados com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['get-students-classes']
      })
      queryClient.invalidateQueries({
        queryKey: ['get-class-profile', tenantId, classId]
      })
      navigation.navigate('classProfile', { tenantIdParams: tenantId, classId })
    })
  }

  const addTeacher = () => {
    UpdateTeacherClassService(tenantId, existentClassRolesIds, classId).then(() => {
      fireSuccesToast('Professores atualizados com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['get-teachers-class']
      })
      queryClient.invalidateQueries({
        queryKey: ['get-class-profile', tenantId, classId]
      })
      navigation.navigate('classProfile', { tenantIdParams: tenantId, classId })
    })
  }

  const handleSelectUserRole = (userId: string) => {
    if (existentClassRolesIds.some(x => x == userId)) {
      setExistentClassRolesIds(list => list.filter(id => id !== userId))
    } else {
      setExistentClassRolesIds([...existentClassRolesIds, userId])
    }
  }

  const changeTextDebounced = (text: string) => {
    setSearch(text)
  }

  const changeTextDebouncer = useCallback(debounce(changeTextDebounced, 250), []);

  return (
    <View flex={1}>
      <PageHeader title={`Atualizar ${roleName === 'student' ? 'alunos' : 'professores'}`} rightIcon={tenantId ? Check : null} rightAction={handleAddUsers} />
      <ScrollContainer>

        <View h={20}>
          <Input
            onChangeText={changeTextDebouncer}
            placeholder="Buscar"
            InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
          />
        </View>

        {
          isLoading || isLoadingConflict ? (
            <Loading />
          )
            : (
              <Checkbox.Group value={existentClassRolesIds} accessibilityLabel="Selecione os usuários">
                <VStack space={4} pb={20} w="full">
                  {
                    usersRoles && usersRoles.length ? (
                      usersRoles.map((userRole) => {
                        return (
                          <UserItem.Root key={userRole.id} onPress={() => handleSelectUserRole(userRole.userId)}>
                            <UserItem.Avatar url={userRole.user.avatar ?? ""} alt="Foto de perfil" />
                            <UserItem.Content>
                              <UserItem.Title title={`${userRole.user.name}`} />
                              <UserItem.Caption caption={userRole.user.username} />
                            </UserItem.Content>
                            <UserItem.Section>
                              <Checkbox aria-label="jdskajdksajdjksaj" accessibilityLabelledBy="opa eai ksdkdsa" accessibilityLabel="opa eai ksdkdsa" value={userRole.userId} />
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
              </Checkbox.Group>
            )
        }

      </ScrollContainer>
    </View>
  )
}