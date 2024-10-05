import { WeekScheduleDay } from "@components/Class/HoursItem/WeekScheduleDay";
import { Loading } from "@components/Loading";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO";
import { useAuth } from "@hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { HStack, Text, View } from "native-base";
import { Check, Info } from "phosphor-react-native";
import { useCallback } from "react";
import { GetTimeTableService, UpdateTimeTableService } from "src/services/timeTablesService";
import { THEME } from "src/theme";

type RouteParamsProps = {
  timeTableId: string;
}

export function TimeTable() {
  const route = useRoute()
  const { tenant } = useAuth()

  const { timeTableId } = route.params as RouteParamsProps;

  const weeksDays = [0, 1, 2, 3, 4, 5, 6]

  const loadTimeTable = async () => {
    try {
      const { data } = await GetTimeTableService(timeTableId, tenant.id)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: timeTable, isLoading } = useQuery<ITimeTableDTO>({
    queryKey: ['get-time-table', timeTableId],
    queryFn: loadTimeTable
  })

  const handleAddScheduleDay = useCallback((dayOfWeek: number, hourStart: string, hourEnd: string) => {
    timeTable?.schedulesDays.push({
      id: String(Math.floor(Math.random() * 100)),
      weekDay: dayOfWeek,
      hourStart, hourEnd
    })
  }, [])

  const handleRemoveScheduleDay = useCallback((id: string) => {
    const index = timeTable?.schedulesDays.findIndex((tt) => tt.id == id)
    if (index != -1) {
      timeTable?.schedulesDays.slice(index, 1)
    }
  }, [])


  const handleSave = () => {
    UpdateTimeTableService(timeTable, tenant.id, timeTableId).then(() => {
      fireSuccesToast('Table de horários atualizada!')
    }).catch((err) => {
      console.log('err: ', err)
    })
  }
  return (
    <View flex={1}>
      {
        isLoading || !timeTable ? (<Loading />)
          : (
            <>
              <PageHeader title={timeTable.name ?? ''} rightIcon={Check} rightAction={handleSave} />
              <ScrollContainer >
                {

                  <>
                    {
                      weeksDays.map((wd) => (
                        <WeekScheduleDay
                          key={wd}
                          dayOfWeek={wd}
                          schedulesDays={timeTable?.schedulesDays?.filter((sd: any) => sd.weekDay == wd) ?? []}
                          addScheduleDayFn={handleAddScheduleDay}
                          removeScheduleDayFn={handleRemoveScheduleDay}
                        />
                      ))
                    }
                  </>
                }
                < HStack mt={2}
                  alignItems="center" space={2}
                  mb={20}>
                  < Info size={18}
                    color={THEME.colors.danger['500']} />
                  < Text flex={1}
                    color="danger.500" fontSize="xs" > As alterações afetarão todas as turmas que utilizam esta jornada de horários </Text>
                </HStack>
              </ScrollContainer>
            </>
          )
      }

    </View >
  )
}