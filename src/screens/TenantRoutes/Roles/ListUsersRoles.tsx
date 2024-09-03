import { Button } from "@components/Button"
import { GenericItem } from "@components/GenericItem"
import { Input } from "@components/Input"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Heading, Icon, Image, Modal, Text, View, VStack } from "native-base"
import { MagnifyingGlass, Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { Vibration } from "react-native"
import { ListStudentsByClassService, RemoveStudentFromClassService } from "src/services/classesService"
import { DeleteUserRoleService, ListUsersRolesService } from "src/services/rolesService"

type RouteParamsProps = {
  tenantId: string;
  roleName: "teacher" | "student"
}

export function UsersRoloesList() {
  const [usersRoles, setUsersRoles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
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
      fireSuccesToast('Professor removido com sucesso')
    }).catch((err) => {
      console.log('err: ', err)
      fireErrorToast('Ocorreu um erro!')
    }).finally(() => {
      setIsLoadingAction(false)
      setIsOpen(false)
    })
  }

  const handleClickPlus = () => {
    navigation.navigate('createUserRole', {
      tenantId
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
                        <GenericItem.Root key={userRole.user.id} onLongPress={() => handleSelectUserRole(userRole)}>
                          <GenericItem.Avatar url={userRole.user.avatar} alt={userRole.user.avatar} />
                          <GenericItem.Content title={`${userRole.user.name.firstName} ${userRole.user.name.lastName}`} caption="@username" />
                        </GenericItem.Root>
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
                        Adicionar
                      </Heading>
                    </Box>
                    <Actionsheet.Item alignItems="center" justifyContent="center">
                      <Input
                        w="72"
                        value=""
                        placeholder="Nome de usuário"
                        InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
                      />
                    </Actionsheet.Item>
                    <Actionsheet.Item alignItems="center" justifyContent="center">
                      <Button title="Buscar" onPress={() => setIsModalOpen(true)} />
                    </Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} safeAreaTop={true}>
                  <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
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
                          <Heading fontFamily="heading" fontSize="2xl" color="coolGray.700">John Doe</Heading>
                          <Text fontFamily="body" color="coolGray.600"> @johndoe</Text>
                        </VStack>
                      </View>
                    </Modal.Body>
                    <Modal.Footer>
                      <VStack space={2} flex={1}>
                        <Button title="Cadastrar" />
                        <Button title="Cancelar" variant="outline" />
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