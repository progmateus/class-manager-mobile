import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITenantPlanDTO } from "@dtos/ITenantPlanDTO"
import { IUserCompletedDTO } from "@dtos/IUserCompletedDTO"
import { IUserDTO } from "@dtos/IUserDTO"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { Text, View, VStack } from "native-base"
import { Barbell, Coin, Money, Plus, SimCard } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { ListStudentsByClassHandler, ListUsersByRoleNameService } from "src/services/classesService"
import { ListTenantPlansService } from "src/services/tenantPlansService"


type RouteParamsProps = {
  tenantId: string;
  classId: string;
  roleName: "student" | "teacher";
}

export function AddUserToClass() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute()
  const { tenantId, classId, roleName } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useEffect(() => {
    setIsLoading(true)
    ListUsersByRoleNameService(tenantId, roleName).then(({ data }) => {
      console.log("dataaa: ", data.data)
      setUsers(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [classId])

  const handleClickPlus = () => {
    console.log('opa eai ok')
    /* navigation.navigate('createTenantPlan', {
      tenantId
    }) */
  }
  return (
    <View flex={1}>
      <PageHeader title="Adicionar alunos" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={8}>
                {
                  users && users.length ? (
                    users.map((user: IUserCompletedDTO) => {
                      return (
                        <GenericItem.Root key={user.id}>
                          <GenericItem.Avatar url={user.avatar} alt="Foto de perfil" />
                          <GenericItem.Content title={`${user.name.firstName} ${user.name.lastName}`} caption="" />
                        </GenericItem.Root>
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

      </Viewcontainer>
    </View>
  )
}