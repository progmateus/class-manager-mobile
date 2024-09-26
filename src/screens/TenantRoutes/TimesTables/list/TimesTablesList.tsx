import { GenericItem } from "@components/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { Center, Text, View } from "native-base"
import { Calendar, Plus } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListTimesTablesService } from "src/services/timeTablesService"

export function TimesTablesList() {

  const [isLoading, setIsLoading] = useState(false)
  const { tenant } = useAuth()
  const [timesTables, setTimesTables] = useState([])
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListTimesTablesService(tenant.id).then(({ data }) => {
      setTimesTables(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, []))

  const handleAdd = () => {
    console.log('add')
  }

  return (
    <View flex={1}>
      <PageHeader title="Horários" rightIcon={Plus} rightAction={handleAdd} />
      <ScrollContainer>
        {
          isLoading ? (<Loading />) : (

            timesTables && timesTables.length > 0 ? (
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
            ) : (
              <Center>
                <Text> Nenhum resultado ecnontrado</Text>
              </Center>
            )

          )
        }
      </ScrollContainer>
    </View >
  )
}