import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITenantPlanDTO } from "@dtos/ITenantPlanDTO"
import { IUserDTO } from "@dtos/IUserDTO"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { Text, View, VStack } from "native-base"
import { Barbell, Coin, Money, Plus, SimCard } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { ListStudentsByClassHandler, ListTeachersByClassHandler } from "src/services/classesService"
import { ListTenantPlansService } from "src/services/tenantPlansService"


type RouteParamsProps = {
  tenantId: string;
  classId: string;
}

export function TeachersClassList() {
  const [teachers, setTeachers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute()
  const { tenantId, classId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useEffect(() => {
    setIsLoading(true)
    ListTeachersByClassHandler(tenantId, classId).then(({ data }) => {
      setTeachers(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId])

  const handleClickPlus = () => {
    navigation.navigate('createTenantPlan', {
      tenantId
    })
  }
  return (
    <View flex={1}>
      <PageHeader title="Professores" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={8}>
                {
                  teachers && teachers.length ? (
                    teachers.map((teacher: IUserDTO) => {
                      return (
                        <GenericItem.Root key={teacher.id}>
                          <GenericItem.Icon icon={SimCard} />
                          <GenericItem.Content title={teacher.name ?? ""} caption="" />
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