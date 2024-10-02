import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IUserClassDTO } from "@dtos/classes/IUserClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, FlatList, Heading, Icon, Text, View, VStack } from "native-base"
import { Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { ListTeachersByClassService, RemoveTeacherFromClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantIdParams: string;
  classId: string;
}

export function TeachersClassList() {
  const [teachersClass, setTeachersClass] = useState<IUserClassDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTeacherClass, setSelectedTeacherClass] = useState<any>(null)
  const route = useRoute()
  const { tenantIdParams, classId } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListTeachersByClassService(tenantId, classId).then(({ data }) => {
      setTeachersClass(data.data)
    }).catch((err) => {
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId, classId]))

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      classId,
      roleName: "teacher"
    })
  }

  const handleRemoveTeacher = () => {
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
        <FlatList
          data={teachersClass}
          pb={20}
          keyExtractor={teacherClass => teacherClass.id}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.user.id} onLongPress={() => handleSelectTeacher(item)}>
              <GenericItem.Root>
                <GenericItem.Avatar url={item.user.avatar} alt="Foto de perfil do professor" username={item.user.username} />
                <GenericItem.Content title={`${item.user.firstName} ${item.user.lastName}`} caption="@username" />
              </GenericItem.Root>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
        >
        </FlatList>
        <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Heading fontSize="16" color="coolGray.700" textAlign="center">
                {`${selectedTeacherClass?.user?.name.firstName} ${selectedTeacherClass?.user?.name.lastName}`}
              </Heading>
            </Box>
            <Actionsheet.Item onPress={handleRemoveTeacher} startIcon={<Icon as={TrashSimple} size="6" name="delete" />}>
              Remover
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Viewcontainer>
    </View>
  )
}