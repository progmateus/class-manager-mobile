import { Button } from "@components/Button"
import { GenericItem } from "@components/Items/GenericItem"
import { Input } from "@components/form/Input"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useRoute } from "@react-navigation/native"
import { fireErrorToast, fireInfoToast, fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, FlatList, Heading, Icon, Modal, Text, View, VStack } from "native-base"
import { MagnifyingGlass, Plus, TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { CreateUserRoleService, DeleteUserRoleService, ListUsersRolesService } from "src/services/rolesService"
import { GetUserByUsernameService } from "src/services/usersService"
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO"
import { useAuth } from "@hooks/useAuth"
import { Avatar } from "@components/Avatar/Avatar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO"

type RouteParamsProps = {
  tenantIdParams: string;
  roleName: "teacher" | "student"
}

export function TeachersList() {
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [userFound, setUserFound] = useState<IUserPreviewDTO | null>(null)
  const [username, setUsername] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [selectedUserRole, setSelectedUserRole] = useState<any>(null)
  const route = useRoute()
  const { tenantIdParams, roleName } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams


  const loadTeachers = async () => {
    try {
      const { data } = await ListUsersRolesService(tenantId, [roleName])
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: teachers, isLoading } = useQuery<IUsersRolesDTO[]>({
    queryKey: ['get-tenant-teachers', tenantId, roleName, String(new Date())],
    queryFn: loadTeachers
  })


  const handleSelectUserRole = (userRole: any) => {
    Vibration.vibrate(100)
    setSelectedUserRole(userRole)
    setIsOpen(true)
  }

  const handleRemoveTeacher = async () => {
    if (isLoadingAction) return
    setIsLoadingAction(true)
    try {
      await DeleteUserRoleService(tenantId, selectedUserRole.id)
      fireInfoToast('Professor removido com sucesso')
    } finally {
      setIsLoadingAction(false)
      setIsOpen(false)
    }
  }

  const queryClient = useQueryClient();

  const { mutate: removeTeacherMutation } = useMutation({
    mutationFn: handleRemoveTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tenant-teachers', tenantId, roleName, String(new Date())]
      })
    }
  })


  const handleSearchUser = async () => {
    if (!username) return
    setIsSearching(true)

    GetUserByUsernameService(username).then(({ data }) => {
      if (!data.data) {
        fireWarningToast('Nenhum usuário encontrado!')
        return
      }
      setIsOpenAdd(false)
      setIsModalOpen(true)
      setUserFound(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsSearching(false)
    })
  }


  const handleCreateTeacherRole = () => {
    if (!userFound) {
      return
    }
    CreateUserRoleService(tenantId, userFound.id, "teacher").then(({ data }) => {
      teachers?.push(data.data)
      fireSuccesToast('Professor cadastrado com sucesso!')
      setIsModalOpen(false)
      setIsOpenAdd(false)
      setIsOpen(false)
    }).catch((err) => {
      console.log('err: ', err)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Gerenciar professores" rightIcon={tenantId ? Plus : null} rightAction={() => setIsOpenAdd(true)} />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (


              <>
                <FlatList
                  data={teachers}
                  pb={20}
                  keyExtractor={teacher => teacher.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity key={item.user.id} onLongPress={() => handleSelectUserRole(item)}>
                      <GenericItem.Root>
                        <GenericItem.Avatar url={item.user.avatar} alt="Foto de perfil do usuário" username={item.user.username} />
                        <GenericItem.Content title={`${item.user.firstName} ${item.user.lastName}`} caption="@username" />
                      </GenericItem.Root>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                  ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
                />

                <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
                  <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                      <Heading fontSize="16" color="coolGray.700" textAlign="center">
                        {`${selectedUserRole?.user?.name.firstName} ${selectedUserRole?.user?.name.lastName}`}
                      </Heading>
                    </Box>
                    <Actionsheet.Item onPress={() => removeTeacherMutation()} startIcon={<Icon as={TrashSimple} size="6" name="delete" />}>
                      Remover
                    </Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>

                <Actionsheet isOpen={isOpenAdd} onClose={() => setIsOpenAdd(false)} size="full">
                  <Actionsheet.Content>
                    <Box w="100%" p={4} justifyContent="center">
                      <Heading fontSize="16" color="coolGray.700" textAlign="center">
                        Cadastrar
                      </Heading>
                    </Box>
                    <Actionsheet.Item alignItems="center" justifyContent="center">
                      <Input
                        w="72"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Nome de usuário"
                        InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
                      />
                    </Actionsheet.Item>
                    <Actionsheet.Item alignItems="center" justifyContent="center">
                      <Button title="Buscar" onPress={handleSearchUser} />
                    </Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} safeAreaTop={true}>
                  <Modal.Content maxWidth="350">
                    {/* <Modal.CloseButton /> */}
                    <Modal.Header>Cadastrar professor</Modal.Header>
                    <Modal.Body justifyContent="center">
                      <View alignItems="center" justifyContent="center" py={4}>
                        <Avatar
                          rounded="full"
                          w={24}
                          h={24}
                          alt="Foto de perfil"
                          src={userFound?.avatar}
                          username={userFound?.username}
                        />

                        <VStack alignItems="center" justifyContent="center">
                          <Heading fontFamily="heading" fontSize="2xl" color="coolGray.700">{`${userFound?.firstName} ${userFound?.lastName}`}</Heading>
                          <Text fontFamily="body" color="coolGray.600"> {userFound?.username}</Text>
                        </VStack>
                      </View>
                    </Modal.Body>
                    <Modal.Footer>
                      <VStack space={2} flex={1}>
                        <Button title="Cadastrar" isLoading={isSearching} onPress={handleCreateTeacherRole} />
                        <Button title="Cancelar" variant="outline" onPress={() => setIsModalOpen(false)} />
                      </VStack>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </>
            )
        }

      </Viewcontainer>
    </View>
  )
}