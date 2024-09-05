import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/IClass"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Checkbox, Heading, Icon, Text, View, VStack } from "native-base"
import { BookBookmark, Check, Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { Vibration } from "react-native"
import { ListClassesService, ListStudentsByClassService, RemoveStudentFromClassService, UpdateStudentClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantId: string;
  classId: string;
  userId: string;
}

export function UpdateStudentClass() {
  const [classes, setClasses] = useState<IClassDTO[]>([])
  const [selectedClassId, setSelectedClassId] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute()
  const { tenantId, userId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId, userId]))


  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId)
  }

  const handleSave = () => {
    if (!selectedClassId) {
      return
    }

    UpdateStudentClassService(tenantId, userId, selectedClassId).then(() => {
      fireSuccesToast('Turma alterada com sucesso')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Gerenciar alunos" rightIcon={Check} rightAction={handleSave} />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={8}>
                {
                  classes && classes.length ? (
                    classes.map((classEntity: IClassDTO) => {
                      return (
                        <GenericItem.Root key={classEntity.id} onPress={() => handleSelectClass(classEntity.id)}>
                          <GenericItem.Icon icon={BookBookmark} />
                          <GenericItem.Content title={`${classEntity.name} ${classEntity.description}`} caption="@username" />
                          <GenericItem.InfoSection>
                            <View></View>
                          </GenericItem.InfoSection>
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