import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/IClass"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Checkbox, Heading, Icon, Radio, Text, View, VStack } from "native-base"
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
  const { tenantId, userId, classId } = route.params as RouteParamsProps;
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
      <PageHeader title="Alterar turma" rightIcon={Check} rightAction={handleSave} />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={4}>
                {
                  classes && classes.length ? (
                    classes.map((classEntity: IClassDTO) => {
                      return (
                        <GenericItem.Root
                          key={classEntity.id}
                          onPress={() => handleSelectClass(classEntity.id)}
                          borderColor={classEntity.id === selectedClassId ? 'brand.500' : 'coolGray.400'}
                          borderWidth={classEntity.id === selectedClassId ? 2 : 0.5}
                        >
                          <GenericItem.Icon icon={BookBookmark} color={classEntity.id === selectedClassId ? 'brand.500' : 'coolGray.700'} />
                          <GenericItem.Content title={classEntity.name} caption={classEntity.description} />
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