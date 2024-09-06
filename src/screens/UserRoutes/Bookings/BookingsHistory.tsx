import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/IClass"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { Center, Icon, Text, View, VStack } from "native-base"
import { BookBookmark, Clock, GraduationCap, IdentificationBadge, Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService } from "src/services/classesService"

type RouteParamsProps = {
  tenantId: string;
}
export function BookingsHistory() {
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const route = useRoute()
  const { tenantId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  const handleClickCreate = () => {
    navigation.navigate('createClass', {
      tenantId
    })
  }

  const handleSelectClass = (classId: string) => {
    navigation.navigate('classProfile', {
      tenantId,
      classId
    })
  }

  useFocusEffect(useCallback(() => {
    setIsLoadig(true)
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoadig(false)
    })
  }, []))
  return (
    <View flex={1}>
      <PageHeader title="Histórico de aulas" rightIcon={Plus} rightAction={handleClickCreate} />
      <Viewcontainer>
        {
          isLoading ? (<Loading />)
            : (
              <VStack space={4}>
                {
                  classes && classes.length ? (
                    classes.map((classInfo: IClassDTO) => {
                      return (
                        <GenericItem.Root touchable={false} key={classInfo.id} onPress={() => handleSelectClass(classInfo.id)}>
                          <GenericItem.InfoSection>
                            <Icon as={Clock} mr={4} />
                            <Text mr={4}>16:00</Text>
                          </GenericItem.InfoSection>
                          <GenericItem.Content title="QUA, 16/04/2022" caption="Dupla" />
                          <GenericItem.InfoSection>
                            <TouchableOpacity>
                              <Icon as={TrashSimple} color="red.600" />
                            </TouchableOpacity>
                          </GenericItem.InfoSection>
                        </GenericItem.Root>
                      )
                    })
                  ) : (
                    <Center>
                      <Text fontFamily="body" color="coolGray.700"> Nenhum resultado encontrado</Text>
                    </Center>
                  )
                }
              </VStack>
            )
        }
      </Viewcontainer>
    </View>
  )
}