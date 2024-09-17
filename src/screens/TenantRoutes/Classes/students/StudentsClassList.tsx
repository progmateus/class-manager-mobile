import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
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
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStudent, setselectedStudent] = useState<any>(null)
  const route = useRoute()
  const { tenantIdParams, classId } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListStudentsByClassService(tenantId, classId).then(({ data }) => {
      setStudents(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId, classId]))

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      tenantIdParams: tenantId,
      classId,
      roleName: "student"
    })
  }

  const handleRemove = () => {
    if (!selectedStudent) {
      return
    }

    RemoveStudentFromClassService(tenantId, selectedStudent.id, classId).then(() => {
      fireInfoToast('Aluno removido com sucesso!')
      setStudents(list => list.filter(item => item.id !== selectedStudent.id))
      setIsOpen(false)
    })
  }


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
            <TouchableOpacity key={item.user.id} onLongPress={() => handleSelectStudent(item)}>
              <GenericItem.Root>
                <GenericItem.Avatar url={item.user.avatar} alt={item.user.avatar} />
                <GenericItem.Content title={`${item.user.firstName} ${item.user.lastName}`} caption="@username" />
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