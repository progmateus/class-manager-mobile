import { GenericItem } from "@components/GenericItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect } from "@react-navigation/native"
import { View } from "native-base"
import { Calendar, Plus } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListTimesTablesService } from "src/services/timeTablesService"

export function TimesTablesList() {

  const [isLoading, setIsLoading] = useState(false)
  const { tenant } = useAuth()
  const [timesTables, setTimesTables] = useState([])

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
          timesTables && timesTables.length && (
            timesTables.map((timeTable: any) => {
              return (
                <TouchableOpacity key={timeTable.id}>
                  <GenericItem.Root>
                    <GenericItem.Icon icon={Calendar} />
                    <GenericItem.Content title={timeTable.name} caption="" />
                  </GenericItem.Root>
                </TouchableOpacity>
              )
            })
          )
        }
      </ScrollContainer>
    </View >
  )
}