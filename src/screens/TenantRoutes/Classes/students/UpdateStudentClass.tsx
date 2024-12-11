import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/classes/IClassDTO"
import { IStudentClassDTO } from "@dtos/classes/IStudentClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { Text, View, VStack } from "native-base"
import { BookBookmark, Check } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { EAuthType } from "src/enums/EAuthType"
import { ListClassesService, ListStudentClassesService, UpdateOneStudentClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantIdParams: string;
  userId?: string;
  subscriptionId?: string;
}

export function UpdateStudentClass() {
  const [selectedClassId, setSelectedClassId] = useState("")
  const route = useRoute()
  const { tenantIdParams, userId: userIdParam, subscriptionId } = route.params as RouteParamsProps;
  const { tenant, authenticationType, user } = useAuth()
  const [existentClasses, setExistentClasses] = useState<IStudentClassDTO[]>([])
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  const queryClient = useQueryClient();

  let userId = userIdParam ?? ""

  if (authenticationType === EAuthType.USER) {
    userId = user.id
  }

  const loadClasses = async () => {
    try {
      const { data } = await ListClassesService(tenantId, {})
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  useFocusEffect(useCallback(() => {
    getStudentClasses()
  }, []))

  const { data: classes, isLoading } = useQuery<IClassDTO[]>({
    queryKey: ['get-student-classes', tenantId, userId],
    queryFn: loadClasses
  })


  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId)
  }

  const handleSave = async () => {
    if (!selectedClassId || !subscriptionId) {
      return
    }

    try {
      await UpdateOneStudentClassService(tenantId, userId, selectedClassId)
      fireSuccesToast('Turma alterada com sucesso!')
      navigation.navigate('subscriptionProfile', { subscriptionId, tenantIdParams: tenantId })
    } catch (err) {
      console.log('err')
    }
  }

  const { mutate: handleSaveMutation } = useMutation({
    mutationFn: handleSave,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-student-classes', tenantId, userId]
      })
      queryClient.invalidateQueries({
        queryKey: ['get-class-profile', tenantId, selectedClassId]
      })
    }
  })


  const getStudentClasses = async () => {
    if (existentClasses && existentClasses.length > 0) {
      return
    }
    const { data } = await ListStudentClassesService(tenant.id, userId)
    setSelectedClassId(data?.data[0]?.classId ?? "")
    setExistentClasses(data.data)
  }

  return (
    <View flex={1}>
      <PageHeader title="Alterar turma" rightIcon={Check} rightAction={handleSaveMutation} />
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