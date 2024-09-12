import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/classes/IClass"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { Center, Text, View, VStack } from "native-base"
import { BookBookmark, GraduationCap, IdentificationBadge, Plus } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService } from "src/services/classesService"

type RouteParamsProps = {
  tenantId: string;
}
export function ClassesList() {
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
      <PageHeader title="Turmas" rightIcon={Plus} rightAction={handleClickCreate} />
      <Viewcontainer>
        {
          isLoading ? (<Loading />)
            : (
              <VStack space={4}>
                {
                  classes && classes.length ? (
                    classes.map((classInfo: IClassDTO) => {
                      return (
                        <TouchableOpacity key={classInfo.id} onPress={() => handleSelectClass(classInfo.id)}>
                          <GenericItem.Root>
                            <GenericItem.Icon icon={BookBookmark} />
                            <GenericItem.Content title={classInfo.name} caption={classInfo.businessHour} />
                            <GenericItem.InfoSection>
                              <GenericItem.InfoContainer >
                                <GraduationCap size={18} color="#6b7280" />
                                <GenericItem.InfoValue text="128" />
                              </GenericItem.InfoContainer>
                              <GenericItem.InfoContainer >
                                <IdentificationBadge size={18} color="#6b7280" />
                                <GenericItem.InfoValue text="7" />
                              </GenericItem.InfoContainer>
                            </GenericItem.InfoSection>
                          </GenericItem.Root>
                        </TouchableOpacity>
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