import { WeekScheduleDay } from "@components/Class/HoursItem/WeekScheduleDay";
import { Input } from "@components/form/Input";
import { Loading } from "@components/Loading";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { useQueryClient } from "@tanstack/react-query";
import { fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications";
import { HStack, Text, View, VStack } from "native-base";
import { Check, Info } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { GetTimeTableService, UpdateTimeTableService } from "src/services/timeTablesService";
import { THEME } from "src/theme";

type RouteParamsProps = {
  timeTableId: string;
}

export function UpdateTimeTable() {
  const route = useRoute()
  const { tenant } = useAuth()

  const { timeTableId } = route.params as RouteParamsProps;
  const [isLoading, setIsLoading] = useState(false)
  const [timeTable, setTimeTable] = useState<ITimeTableDTO>({} as ITimeTableDTO)
  const [name, setName] = useState("")
  const [isActing, setIsActing] = useState(false)

  const navigation = useNavigation<TenantNavigatorRoutesProps>()
  const queryClient = useQueryClient()

  useFocusEffect(useCallback(() => {
    loadTimeTable()
  }, [timeTableId]))

  const weeksDays = [0, 1, 2, 3, 4, 5, 6]

  const loadTimeTable = async () => {
    setIsLoading(true)
    GetTimeTableService(timeTableId, tenant.id).then(({ data }) => {
      setName(data.data.name)
      setTimeTable(data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }
  const handleSave = async () => {
    if (isActing) return

    if (!timeTable.name) {
      fireWarningToast("Informe o nome da tabela")
      return
    }
    setIsActing(true)
    UpdateTimeTableService(timeTable, tenant.id, timeTableId).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['get-times-tables', tenant.id]
      })
      fireSuccesToast('Table de horários atualizada!')
      navigation.navigate('timesTablesList')
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsActing(false)
    })
  }

  const handleAddScheduleDay = useCallback((dayOfWeek: number, name: string, hourStart: string, hourEnd: string) => {
    setTimeTable(prevState => (
      {
        ...prevState,
        schedulesDays: [
          ...prevState.schedulesDays,
          {
            id: String(Math.floor(Math.random() * 100)),
            name: name,
            weekDay: dayOfWeek,
            hourStart,
            hourEnd
          }
        ]
      }
    ))
  }, [timeTable])

  const handleRemoveScheduleDay = useCallback((id: string) => {
    setTimeTable((prevState: any) => { return { ...prevState, schedulesDays: [...prevState.schedulesDays.filter((item: any) => item.id !== id)] } })
  }, [timeTable])



  return (
    <View flex={1}>
      {
        isLoading || !timeTable ? (<Loading />)
          : (
            <>
              <PageHeader title={timeTable.name ?? ''} rightIcon={Check} rightAction={handleSave} />
              <ScrollContainer >
                <View mb={12}>
                  <Input label="Nome" variant="outline" autoCapitalize="none" onChangeText={(text) => setTimeTable(prev => ({ ...prev, name: text }))} value={timeTable.name} />
                </View>
                {
                  <VStack>
                    <Text fontFamily="body" color="coolGray.500" mb={4}>Horários</Text>
                    {
                      weeksDays.map((wd) => (
                        <WeekScheduleDay
                          key={wd}
                          dayOfWeek={wd}
                          schedulesDays={timeTable?.schedulesDays?.filter((sd: any) => sd.weekDay == wd)}
                          addScheduleDayFn={handleAddScheduleDay}
                          removeScheduleDayFn={handleRemoveScheduleDay}
                        />
                      ))
                    }
                  </VStack>

                }
                < HStack mt={2}
                  alignItems="center" space={2}
                  mb={20}>
                  <Info size={18}
                    color={THEME.colors.danger['500']} />
                  <Text flex={1}
                    color="danger.500" fontSize="xs" > As alterações afetarão todas as turmas que utilizam esta jornada de horários </Text>
                </HStack>
              </ScrollContainer>
            </>
          )
      }

    </View >
  )
}