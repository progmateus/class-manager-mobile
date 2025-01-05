import { Button } from "@components/Button"
import { GenericItem } from "@components/Items/GenericItem"
import { Input } from "@components/form/Input"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useRoute } from "@react-navigation/native"
import { fireInfoToast, fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, FlatList, Heading, Icon, Modal, Text, View, VStack, Button as NativeBaseButton } from "native-base"
import { MagnifyingGlass, Plus } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { CreateUserRoleService, DeleteUserRoleService, ListUsersRolesService } from "src/services/rolesService"
import { GetUserByUsernameService } from "src/services/usersService"
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO"
import { useAuth } from "@hooks/useAuth"
import { Avatar } from "@components/Avatar/Avatar"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO"
import { debounce } from "lodash"

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
  const [search, setSearch] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const route = useRoute()
  const { tenantIdParams, roleName } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams


  const loadTeachers = async (page: number) => {
    try {
      const { data } = await ListUsersRolesService([roleName], { page, tenantId, search })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<IUsersRolesDTO[]>({
    queryKey: ['get-tenant-teachers', tenantId, roleName, search],
    queryFn: ({ pageParam }) => loadTeachers(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })

  function onLoadMore() {
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }


  const handleRemoveTeacher = async (userRoleId: string) => {
    if (isLoadingAction) return
    setIsLoadingAction(true)
    try {
      await DeleteUserRoleService(tenantId, userRoleId)
      queryClient.invalidateQueries({
        queryKey: ['get-tenant-teachers', tenantId, roleName]
      })
      fireInfoToast('Professor removido com sucesso')
    } finally {
      setIsLoadingAction(false)
      setIsOpen(false)
    }
  }


  const handleAddTeacher = async () => {
    if (!userFound) {
      return
    }
    try {
      await CreateUserRoleService(tenantId, userFound.id, "teacher")
      fireSuccesToast('Professor cadastrado com sucesso!')
      setIsModalOpen(false)
      setIsOpenAdd(false)
      setIsOpen(false)
    } catch (err) {
      console.log('err: ', err)
    }
  }

  const queryClient = useQueryClient();


  const { mutate: addTeahcerMutation } = useMutation({
    mutationFn: handleAddTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tenant-teachers', tenantId, roleName]
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

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-tenant-teachers', tenantId, roleName, search],
      exact: true
    })
  }

  const changeTextDebounced = (text: string) => {
    setSearch(text)
  }

  const changeTextDebouncer = useCallback(debounce(changeTextDebounced, 250), []);


  return (
    <View flex={1}>
      <PageHeader title="Gerenciar professores" rightIcon={tenantId ? Plus : null} rightAction={() => setIsOpenAdd(true)} />
      <Viewcontainer>
        <View h={20}>
          <Input
            onChangeText={changeTextDebouncer}
            placeholder="Buscar"
            InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
          />
        </View>
        {
          isLoading ? (
            <Loading />
          )
            : (


              <>
                <FlatList
                  data={results?.pages.map(page => page).flat()}
                  pb={20}
                  keyExtractor={teacher => teacher.id}
                  renderItem={({ item }) => (
                    <GenericItem.Root key={item.id}>
                      <GenericItem.Avatar url={item.user?.avatar} alt="Foto de perfil do usuário" />
                      <GenericItem.Content title={`${item.user.name}`} caption={item.user.username} />
                      <GenericItem.InfoSection>
                        <NativeBaseButton bg="red.500" size="xs" px={4} onPress={() => handleRemoveTeacher(item.id)}>
                          Remover
                        </NativeBaseButton>
                      </GenericItem.InfoSection>
                    </GenericItem.Root>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                  ListFooterComponent={
                    isFetchingNextPage ? <Loading /> : <></>
                  }
                  onEndReached={onLoadMore}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={
                    <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                  }
                  refreshing={isLoading}
                  onRefresh={onRefresh}
                />

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
                    <Modal.Header>Cadastrar professor</Modal.Header>
                    <Modal.Body justifyContent="center">
                      <View alignItems="center" justifyContent="center" py={4}>
                        <Avatar
                          rounded="full"
                          w={24}
                          h={24}
                          alt="Foto de perfil"
                          src={userFound?.avatar}
                        />

                        <VStack alignItems="center" justifyContent="center">
                          <Heading fontFamily="heading" fontSize="2xl" color="coolGray.700">{userFound?.name}</Heading>
                          <Text fontFamily="body" color="coolGray.600"> {userFound?.username}</Text>
                        </VStack>
                      </View>
                    </Modal.Body>
                    <Modal.Footer>
                      <VStack space={2} flex={1}>
                        <Button title="Cadastrar" isLoading={isSearching} onPress={() => addTeahcerMutation()} />
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