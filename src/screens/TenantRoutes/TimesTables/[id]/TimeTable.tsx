import { WeekScheduleDay } from "@components/Class/HoursItem/WeekScheduleDay";
import { Loading } from "@components/Loading";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { HStack, Text, View, VStack } from "native-base";
import { Check, Info } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { GetTimeTableService } from "src/services/timeTablesService";
import { THEME } from "src/theme";

type RouteParamsProps = {
  timeTableId: string;
}

export function TimeTable() {
  const route = useRoute()
  const navigation = useNavigation<TenantNavigatorRoutesProps>()
  const { tenant } = useAuth()


  const [isLoading, setIsLoading] = useState(false)
  const [timeTable, setTimeTable] = useState<ITimeTableDTO>({} as ITimeTableDTO)
  const { timeTableId } = route.params as RouteParamsProps;

  const weeksDays = [0, 1, 2, 3, 4, 5, 6]

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    GetTimeTableService(timeTableId, tenant.id).then(({ data }) => {
      setTimeTable(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, []))


  const handleSave = () => {
    alert('save')
  }
  return (
    <View flex={1}>
      {
        isLoading ? (<Loading />)
          : (
            <>
              <PageHeader title={timeTable.name ?? ''} rightIcon={Check}
                rightAction={() => handleSave} />
              <ScrollContainer >
                {

                  <>
                    {
                      weeksDays.map((wd) => <WeekScheduleDay key={wd} dayOfWeek={wd} schedulesDays={timeTable?.schedulesDays?.filter((sd: any) => sd.weekDay == wd) ?? []} setTimeTable={setTimeTable} />)
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