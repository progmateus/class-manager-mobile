import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { Center, FlatList, Text, View, VStack } from "native-base"
import { Calendar, Plus } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListTimesTablesService } from "src/services/timeTablesService"


type RouteParamsProps = {
  classId: string;
  timeTableIdExists: string;
}


export function UpdateClassTimeTable() {

  const { tenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>()
  const route = useRoute()

  const { timeTableIdExists, classId } = route.params as RouteParamsProps;

  const [selectedTimeTable, setSelectedTimeTable] = useState("")


  useFocusEffect(useCallback(() => {
    setSelectedTimeTable(timeTableIdExists)
  }, [classId]))

  const loadTimesTables = async () => {
    try {
      const { data } = await ListTimesTablesService(tenant.id)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: timesTables, isLoading } = useQuery<ITimeTableDTO[]>({
    queryKey: ['get-times-tables', tenant.id, classId],
    queryFn: loadTimesTables
  })

  const handleSave = () => {
    console.log('save')
  }

  return (
    <View flex={1}>
      <PageHeader title="Horários" rightIcon={Plus} rightAction={handleSave} />
      <ScrollContainer>
        {
          isLoading ? (<Loading />) : (
            <FlatList
              data={timesTables}
              pb={20}
              keyExtractor={classItem => classItem.id}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('timeTable', { timeTableId: item.id })}>
                  <GenericItem.Root
                    key={item.id}
                    borderColor={item.id === selectedTimeTable ? 'brand.500' : 'coolGray.400'}
                    borderWidth={item.id === selectedTimeTable ? 2 : 0.5}
                  >
                    <GenericItem.Icon icon={Calendar} />
                    <GenericItem.Content title={item.name} caption="" />
                  </GenericItem.Root>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
            />
          )
        }
      </ScrollContainer>
    </View >
  )
}