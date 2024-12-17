import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useAuth } from "@hooks/useAuth"
import { fireErrorToast, fireInfoToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, FlatList, Heading, Icon, Text, View } from "native-base"
import { TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { DeleteUserRoleService } from "src/services/rolesService"

export function CreateUserRole() {
  const [usersRoles, setUsersRoles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUserRole, setSelectedUserRole] = useState<any>(null)
  const { tenant } = useAuth()
  const tenantId = tenant?.id


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
    }).catch((err) => {
      console.log('err: ', err)
      fireErrorToast('Ocorreu um erro!')
    }).finally(() => {
      setIsLoadingAction(false)
      setIsOpen(false)
    })
  }


  return (
    <View flex={1}>
      <PageHeader title="Cadastrar professor" />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <View>
                <FlatList
                  data={usersRoles}
                  pb={20}
                  keyExtractor={userRole => userRole.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity key={item.user.id} onLongPress={() => handleSelectUserRole(item)}>
                      <GenericItem.Root>
                        <GenericItem.Avatar url={item.user.avatar} alt={item.user.avatar} username={item.user.username} />
                        <GenericItem.Content title={`${item.user.name}`} caption="@username" />
                      </GenericItem.Root>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
                  ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
                />

                <Actionsheet isOpen={isOpen} size="full">
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
              </View>
            )
        }

      </Viewcontainer>
    </View>
  )
}