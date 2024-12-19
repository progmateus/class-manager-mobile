import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { FlatList, Text, View } from "native-base"
import { BookBookmark, Check } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService, TransferClassStudentsService } from "src/services/classesService"


type RouteParamsProps = {
  classId: string;
}


export function TransferClassStudents() {

  const { tenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>()
  const route = useRoute()
  const queryClient = useQueryClient();

  const { classId } = route.params as RouteParamsProps;

  const [selectedNewClassId, setSelectedNewclassId] = useState("")


  const loadClasses = async () => {
    try {
      const { data } = await ListClassesService(tenant.id, {})
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: classes, isLoading } = useQuery<ITimeTableDTO[]>({
    queryKey: ['get-classes', tenant.id],
    queryFn: loadClasses
  })

  const handleUpdateClassTimeTable = async () => {
    await TransferClassStudentsService(tenant.id, classId, selectedNewClassId).then(() => {
      fireSuccesToast("Alunos transferidos")
      queryClient.invalidateQueries({
        queryKey: ['get-class-profile', tenant.id, classId],
      }).then(() => {
        navigation.navigate('classProfile', { classId: classId, tenantIdParams: tenant.id })
      })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Selecione uma turma" rightIcon={Check} rightAction={handleUpdateClassTimeTable} />
      <Viewcontainer>
        {
          isLoading ? (<Loading />) : (
            <FlatList
              data={classes?.filter(x => x.id !== classId)}
              pb={20}
              keyExtractor={classItem => classItem.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedNewclassId(item.id)} key={item.id}>
                  <GenericItem.Root
                    key={item.id}
                    isSelected={item.id === selectedNewClassId}
                  >
                    <GenericItem.Icon icon={BookBookmark} color={item.id === selectedNewClassId ? 'brand.500' : 'coolGray.700'} />
                    <GenericItem.Content title={item.name} caption="" />
                  </GenericItem.Root>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
            />
          )
        }
      </Viewcontainer>
    </View >
  )
}