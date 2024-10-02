import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IStudentClassDTO } from "@dtos/classes/IStudentClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fireInfoToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, FlatList, Heading, Icon, Text, View, VStack } from "native-base"
import { Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { ListStudentsByClassService, RemoveStudentFromClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantIdParams: string;
  classId: string;
}

export function StudentsClassList() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStudent, setselectedStudent] = useState<any>(null)
  const route = useRoute()
  const { tenantIdParams, classId } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  const { data: students, isLoading, refetch } = useQuery<IStudentClassDTO[]>({
    queryKey: ['get-classes', tenantId, classId],
    queryFn: () => {
      return ListStudentsByClassService(tenantId, classId).then(({ data }) => {
        return data.data
      })
    }
  })

  useFocusEffect(useCallback(() => {
    refetch()
  }, []))

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      classId,
      roleName: "student"
    })
  }

  const handleRemove = async () => {
    if (!selectedStudent) {
      return
    }
    return await RemoveStudentFromClassService(tenantId, selectedStudent.id, classId)
  }

  const removeMutation = useMutation({
    mutationFn: handleRemove,
    onSuccess: () => {
      if (!selectedStudent) {
        return
      }
      const index = students?.findIndex(sc => sc.id == selectedStudent.id)
      if (index != -1) {
        students?.slice(1, index)
      }
      fireInfoToast('Aluno removido com sucesso!')
      setIsOpen(false)
    }
  })


  const handleSelectStudent = (student: any) => {
    Vibration.vibrate(100)
    setselectedStudent(student)
    setIsOpen(true)
  }
  return (
    <View flex={1}>
      <PageHeader title="Gerenciar alunos" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>
        <FlatList
          data={students}
          pb={20}
          keyExtractor={student => student.id}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.user?.id} onLongPress={() => handleSelectStudent(item)}>
              <GenericItem.Root>
                <GenericItem.Avatar url={item.user?.avatar} alt="Foto de perfil do aluno" username={item.user?.username ?? ""} />
                <GenericItem.Content title={`${item.user?.firstName} ${item.user?.lastName}`} caption="@username" />
              </GenericItem.Root>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
          ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
        >
        </FlatList>
      </Viewcontainer>
    </View>
  )
}