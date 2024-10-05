import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IUserClassDTO } from "@dtos/classes/IUserClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { fireInfoToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, FlatList, Heading, Icon, Text, View } from "native-base"
import { Plus, TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { ListTeachersByClassService, RemoveTeacherFromClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantIdParams: string;
  classId: string;
}

export function TeachersClassList() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTeacherClass, setSelectedTeacherClass] = useState<any>(null)
  const route = useRoute()
  const { tenantIdParams, classId } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  const loadTeachersClass = async () => {
    try {
      const { data } = await ListTeachersByClassService(tenantId, classId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: teachersClass, isLoading } = useQuery<IUserClassDTO[]>({
    queryKey: ['get-teachers-class', tenantId, classId],
    queryFn: loadTeachersClass
  })

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
      const index = teachersClass?.findIndex((ur) => ur.id == selectedTeacherClass.id)
      if (index !== -1) {
        teachersClass?.slice(index, 1)
      }
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
          isLoading ? (<Loading />) : (
            <>
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
            </>
          )
        }

      </Viewcontainer>
    </View>
  )
}