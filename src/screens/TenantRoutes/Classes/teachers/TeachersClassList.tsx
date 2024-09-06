import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IUserClassDTO } from "@dtos/IUserClassDTO"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Heading, Icon, Text, View, VStack } from "native-base"
import { Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { ListTeachersByClassService, RemoveTeacherFromClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantId: string;
  classId: string;
}

export function TeachersClassList() {
  const [teachersClass, setTeachersClass] = useState<IUserClassDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTeacherClass, setSelectedTeacherClass] = useState<any>(null)
  const route = useRoute()
  const { tenantId, classId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListTeachersByClassService(tenantId, classId).then(({ data }) => {
      setTeachersClass(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId, classId]))

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      tenantId,
      classId,
      roleName: "teacher"
    })
  }

  const handleRemove = () => {
    if (!selectedTeacherClass) {
      return
    }

    RemoveTeacherFromClassService(tenantId, selectedTeacherClass.id, classId).then(() => {
      fireInfoToast('Professor removido com sucesso!')
      setTeachersClass(list => list.filter(item => item.id !== selectedTeacherClass.id))
      setIsOpen(false)
    })
  }


  const handleSelectTeacher = (teacherClass: IUserClassDTO) => {
    Vibration.vibrate(100)
    setSelectedTeacherClass(teacherClass)
    setIsOpen(true)
  }
  return (
    <View flex={1}>
      <PageHeader title="Gerenciar professores" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={8}>
                {
                  teachersClass && teachersClass.length ? (
                    teachersClass.map((teacher: any) => {
                      return (
                        <TouchableOpacity key={teacher.user.id} onLongPress={() => handleSelectTeacher(teacher)}>
                          <GenericItem.Root>
                            <GenericItem.Avatar url={teacher.user.avatar} alt={teacher.user.avatar} />
                            <GenericItem.Content title={`${teacher.user.name.firstName} ${teacher.user.name.lastName}`} caption="@username" />
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
                        {`${selectedTeacherClass?.user?.name.firstName} ${selectedTeacherClass?.user?.name.lastName}`}
                      </Heading>
                    </Box>
                    <Actionsheet.Item onPress={handleRemove} startIcon={<Icon as={TrashSimple} size="6" name="delete" />}>
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