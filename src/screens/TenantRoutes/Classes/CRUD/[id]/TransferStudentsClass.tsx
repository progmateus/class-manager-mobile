import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { Viewcontainer } from "@components/ViewContainer"
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { Center, FlatList, Text, View, VStack } from "native-base"
import { BookBookmark, Calendar, Check, Plus } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService, UpdateClasstimeTableService } from "src/services/classesService"
import { ListTimesTablesService } from "src/services/timeTablesService"


type RouteParamsProps = {
  classId: string;
}


export function TransferStudentsClass() {

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
    await UpdateClasstimeTableService(tenant.id, classId, selectedTimeTable).then(() => {
      fireSuccesToast("Horário atualizado")
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
      <PageHeader title="Horários" rightIcon={Check} rightAction={handleUpdateClassTimeTable} />
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