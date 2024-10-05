import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { Center, Text, View, VStack } from "native-base"
import { Calendar, Plus } from "phosphor-react-native"
import { TouchableOpacity } from "react-native"
import { ListTimesTablesService } from "src/services/timeTablesService"




export function TimesTablesList() {

  const { tenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const loadTimesTables = async () => {
    try {
      const { data } = await ListTimesTablesService(tenant.id)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: timesTables, isLoading } = useQuery<ITimeTableDTO[]>({
    queryKey: ['get-times-tables', tenant.id],
    queryFn: loadTimesTables
  })

  const handleAdd = () => {
    navigation.navigate('createTimeTable')
  }

  return (
    <View flex={1}>
      <PageHeader title="Horários" rightIcon={Plus} rightAction={handleAdd} />
      <ScrollContainer>
        {
          isLoading ? (<Loading />) : (

            timesTables && timesTables.length > 0 ? (
              <VStack space={4}>
                {
                  timesTables.map((timeTable: any) => {
                    return (
                      <TouchableOpacity key={timeTable.id} onPress={() => navigation.navigate('timeTable', { timeTableId: timeTable.id })}>
                        <GenericItem.Root>
                          <GenericItem.Icon icon={Calendar} />
                          <GenericItem.Content title={timeTable.name} caption="" />
                        </GenericItem.Root>
                      </TouchableOpacity>
                    )
                  })
                }
              </VStack>
            ) : (
              <Center>
                <Text> Nenhum resultado encontrado</Text>
              </Center>
            )

          )
        }
      </ScrollContainer>
    </View >
  )
}