import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITenantPlanDTO } from "@dtos/ITenantPlanDTO"
import { IUserCompletedDTO } from "@dtos/IUserCompletedDTO"
import { IUserDTO } from "@dtos/IUserDTO"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Heading, Icon, Text, View, VStack } from "native-base"
import { Plus, TrashSimple } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { Vibration } from "react-native"
import { ListStudentsByClassHandler, RemoveStudentFromClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantId: string;
  classId: string;
}

export function StudentsClassList() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStudent, setselectedStudent] = useState<any>(null)
  const route = useRoute()
  const { tenantId, classId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useEffect(() => {
    setIsLoading(true)
    ListStudentsByClassHandler(tenantId, classId).then(({ data }) => {
      setStudents(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId])

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      tenantId,
      classId,
      roleName: "student"
    })
  }

  const handleRemove = () => {
    if (!selectedStudent) {
      return
    }

    RemoveStudentFromClassService(tenantId, selectedStudent.id, classId).then(() => {
      fireSuccesToast('Aluno removido com sucesso!')
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

        {
          isLoading ? (
            <Loading />
          )
            : (
              <VStack space={8}>
                {
                  students && students.length ? (
                    students.map((student: any) => {
                      return (
                        <GenericItem.Root key={student.user.id} onLongPress={() => handleSelectStudent(student)}>
                          <GenericItem.Avatar url={student.user.avatar} alt={student.user.avatar} />
                          <GenericItem.Content title={`${student.user.name.firstName} ${student.user.name.lastName}`} caption="@username" />
                        </GenericItem.Root>
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
                        {`${selectedStudent?.user?.name.firstName} ${selectedStudent?.user?.name.lastName}`}
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