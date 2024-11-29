import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { UserItem } from "@components/Users/UserItem"
import { Viewcontainer } from "@components/ViewContainer"
import { IUserClassDTO } from "@dtos/classes/IUserClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
      const { data } = await ListTeachersByClassService(tenantId, classId, {})
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

  const handleRemoveTeacher = async () => {
    if (!selectedTeacherClass) {
      return
    }
    try {
      await RemoveTeacherFromClassService(tenantId, selectedTeacherClass.id, classId)
    } finally {
      setIsOpen(false)
    }
  }

  const queryClient = useQueryClient();

  const { mutate: removeTeacherMutation } = useMutation({
    mutationFn: handleRemoveTeacher,
    onSuccess: () => {
      fireInfoToast('Professor removido com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['get-teachers-class', tenantId, classId]
      })
    }
  })


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
                  <UserItem.Root key={item.id} onLongPress={() => handleSelectTeacher(item)}>
                    <UserItem.Avatar url={item.user?.avatar ?? ""} alt="Foto de perfil do aluno " />
                    <UserItem.Section>
                      <UserItem.Content>
                        <UserItem.Title title={`${item.user?.firstName} ${item.user?.lastName}`} />
                        <UserItem.Caption caption={`@${item.user?.username}`} />
                      </UserItem.Content>
                    </UserItem.Section>
                  </UserItem.Root>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
                ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
              >
              </FlatList>
              <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
                <Actionsheet.Content>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Heading fontSize="16" color="coolGray.700" textAlign="center">
                      {`${selectedTeacherClass?.user?.firstName} ${selectedTeacherClass?.user?.lastName}`}
                    </Heading>
                  </Box>
                  <Actionsheet.Item onPress={() => removeTeacherMutation()} startIcon={<Icon as={TrashSimple} size="6" name="delete" />}>
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