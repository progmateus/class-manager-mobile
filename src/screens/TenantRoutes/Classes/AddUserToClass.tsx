import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { UserItem } from "@components/Users/UserItem"
import { Viewcontainer } from "@components/ViewContainer"
import { useRoute } from "@react-navigation/native"
import { Actionsheet, Box, Heading, Icon, Text, View, VStack } from "native-base"
import { Plus } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { UpdateStudentClassService, UpdateTeacherClassService, ListUsersByRoleNameService } from "src/services/classesService"
import { Vibration } from "react-native"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { IUserCompletedDTO } from "@dtos/users/IUserCompletedDTO"
import { IUsersRolesDTO } from "@dtos/roles/IUSersRolesDTO"
import { IUserDTO } from "@dtos/users/IUserDTO"


type RouteParamsProps = {
  tenantId: string;
  classId: string;
  roleName: "student" | "teacher";
}

export function AddUserToClass() {
  const [usersRoles, setUsersRoles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUserCompletedDTO | null>(null)
  const route = useRoute()
  const { tenantId, classId, roleName } = route.params as RouteParamsProps;

  useEffect(() => {
    setIsLoading(true)
    ListUsersByRoleNameService(tenantId, roleName).then(({ data }) => {
      setUsersRoles(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [classId])

  const handleAddUser = () => {
    if (roleName === "student") {
      addStudent()
    } else {
      addTeacher()
    }
  }

  const addStudent = () => {
    if (!selectedUser) {
      return
    }

    UpdateStudentClassService(tenantId, selectedUser.id, classId).then(() => {
      fireSuccesToast('Aluno adicionado com sucesso!')
      setIsOpen(false)
    })
  }

  const addTeacher = () => {
    if (!selectedUser) {
      return
    }
    UpdateTeacherClassService(tenantId, selectedUser.id, classId).then(() => {
      fireSuccesToast('Professor adicionado com sucesso!')
      setIsOpen(false)
    })
  }


  const handleSelectUser = (user: IUserCompletedDTO) => {
    Vibration.vibrate(100)
    setSelectedUser(user)
    setIsOpen(true)
  }
  return (
    <View flex={1}>
      <PageHeader title={`Adicionar ${roleName === 'student' ? 'alunos' : 'professores'}`} />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={8}>
                {
                  usersRoles && usersRoles.length ? (
                    usersRoles.map((userRole: IUsersRolesDTO) => {
                      return (
                        <UserItem.Root key={userRole.user?.id} onLongPress={() => handleSelectUser(userRole.user)}>
                          <UserItem.Avatar url={userRole.user.avatar} alt="Foto de perfil" />
                          <UserItem.Section>
                            <UserItem.Content>
                              <UserItem.Title title={`${userRole.user.name.firstName} ${userRole.user.name.lastName}`} />
                              <UserItem.Caption caption="@username" />
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

                <Actionsheet isOpen={isOpen} size="full">
                  <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                      <Heading fontSize="16" color="coolGray.700" textAlign="center">
                        {`${selectedUser?.name.firstName} ${selectedUser?.name.lastName}`}
                      </Heading>
                    </Box>
                    <Actionsheet.Item onPress={handleAddUser} startIcon={<Icon as={Plus} size="6" name="delete" />}>
                      Adicionar
                    </Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>
              </VStack>
            )
        }

      </Viewcontainer>
    </View>
  )
}