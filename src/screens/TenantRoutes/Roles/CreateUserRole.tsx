import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireErrorToast, fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Heading, Icon, Text, View, VStack } from "native-base"
import { Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { DeleteUserRoleService, ListUsersRolesService } from "src/services/rolesService"

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
              </VStack>
            )
        }

      </Viewcontainer>
    </View>
  )
}