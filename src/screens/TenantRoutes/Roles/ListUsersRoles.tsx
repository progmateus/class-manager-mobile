import { Button } from "@components/Button"
import { GenericItem } from "@components/GenericItem"
import { Input } from "@components/form/Input"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IUserCompletedDTO } from "@dtos/users/IUserCompletedDTO"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireErrorToast, fireInfoToast, fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Heading, Icon, Image, Modal, Text, View, VStack } from "native-base"
import { MagnifyingGlass, Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { CreateUserRoleService, DeleteUserRoleService, ListUsersRolesService } from "src/services/rolesService"
import { GetUserByUsernameService } from "src/services/usersService"

type RouteParamsProps = {
  tenantId: string;
  roleName: "teacher" | "student"
}

export function UsersRoloesList() {
  const [usersRoles, setUsersRoles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [userFound, setUserFound] = useState<IUserCompletedDTO | null>(null)
  const [username, setUsername] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [selectedUserRole, setSelectedUserRole] = useState<any>(null)
  const route = useRoute()
  const { tenantId, roleName } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListUsersRolesService(tenantId, roleName).then(({ data }) => {
      setUsersRoles(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId, roleName]))


  const handleSelectUserRole = (userRole: any) => {
    Vibration.vibrate(100)
    setSelectedUserRole(userRole)
    setIsOpen(true)
  }

  const handleRemoveTeacher = async () => {
    if (isLoadingAction) return
    setIsLoadingAction(true)
    DeleteUserRoleService(tenantId, selectedUserRole.id).then(() => {
      fireInfoToast('Professor removido com sucesso')
      setUsersRoles(list => list.filter(item => item.id !== selectedUserRole.id))
    }).catch((err) => {
      console.log('err: ', err)
      fireErrorToast('Ocorreu um erro!')
    }).finally(() => {
      setIsLoadingAction(false)
      setIsOpen(false)
    })
  }


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
      setUsersRoles([...usersRoles, data.data])
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
              <VStack space={8}>
                {
                  usersRoles && usersRoles.length ? (
                    usersRoles.map((userRole: any) => {
                      return (
                        <TouchableOpacity key={userRole.user.id} onLongPress={() => handleSelectUserRole(userRole)}>
                          <GenericItem.Root>
                            <GenericItem.Avatar url={userRole.user.avatar} alt={userRole.user.avatar} />
                            <GenericItem.Content title={`${userRole.user.name.firstName} ${userRole.user.name.lastName}`} caption="@username" />
                          </GenericItem.Root>
                        </TouchableOpacity>
                      )
                    })
                  )
                    : (
                      <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                    )
                }

                <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
                  <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                      <Heading fontSize="16" color="coolGray.700" textAlign="center">
                        {`${selectedUserRole?.user?.name.firstName} ${selectedUserRole?.user?.name.lastName}`}
                      </Heading>
                    </Box>
                    <Actionsheet.Item onPress={handleRemoveTeacher} startIcon={<Icon as={TrashSimple} size="6" name="delete" />}>
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
                        <Image
                          rounded="full"
                          w={24}
                          h={24}
                          alt="Foto de perfil"
                          source={{
                            uri: "https://img.freepik.com/fotos-gratis/garoto-confiante-posando-contra-a-parede-branca_176420-32936.jpg?t=st=1725155362~exp=1725158962~hmac=9ea94ecc7a74f7955101241059030bb1c738b5484fc5d5ee15bc72ee74841784&w=1380",
                          }}
                          defaultSource={{ uri: "https://img.freepik.com/fotos-gratis/garoto-confiante-posando-contra-a-parede-branca_176420-32936.jpg?t=st=1725155362~exp=1725158962~hmac=9ea94ecc7a74f7955101241059030bb1c738b5484fc5d5ee15bc72ee74841784&w=1380" }}
                        />

                        <VStack alignItems="center" justifyContent="center">
                          <Heading fontFamily="heading" fontSize="2xl" color="coolGray.700">{`${userFound?.name.firstName} ${userFound?.name.lastName}`}</Heading>
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
              </VStack>
            )
        }

      </Viewcontainer>
    </View>
  )
}