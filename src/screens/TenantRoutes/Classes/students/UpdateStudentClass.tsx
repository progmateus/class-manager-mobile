import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/classes/IClass"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { Text, View, VStack } from "native-base"
import { BookBookmark, Check } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService, UpdateStudentClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantIdParams: string;
  classIdExists: string;
  userId?: string;
  subscriptionId?: string;
}

export function UpdateStudentClass() {
  const [classes, setClasses] = useState<IClassDTO[]>([])
  const [selectedClassId, setSelectedClassId] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const route = useRoute()
  const { tenantIdParams, userId: userIdParam, classIdExists, subscriptionId } = route.params as RouteParamsProps;
  const { tenant, authenticationType, user } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  let userId = userIdParam ?? ""

  if (authenticationType === "user") {
    userId = user.id
  }

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListClassesService(tenantId).then(({ data }) => {
      setSelectedClassId(classIdExists)
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
    if (!selectedClassId || !subscriptionId) {
      return
    }

    UpdateStudentClassService(tenantId, userId, selectedClassId).then(() => {
      fireSuccesToast('Turma alterada com sucesso!')
      navigation.navigate('subscriptionProfile', { subscriptionId, tenantIdParams: tenantId })
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
                        <TouchableOpacity
                          key={classEntity.id}
                          onPress={() => handleSelectClass(classEntity.id)}
                        >
                          <GenericItem.Root
                            borderColor={classEntity.id === selectedClassId ? 'brand.500' : 'coolGray.400'}
                            borderWidth={classEntity.id === selectedClassId ? 2 : 0.5}
                          >
                            <GenericItem.Icon icon={BookBookmark} color={classEntity.id === selectedClassId ? 'brand.500' : 'coolGray.700'} />
                            <GenericItem.Content title={classEntity.name} caption={classEntity.description} />
                          </GenericItem.Root>
                        </TouchableOpacity>

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