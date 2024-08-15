import { ClassHourItem } from "@components/Class/HoursItem/ClasshourItem";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { HStack, Text, View, VStack } from "native-base";
import { Info } from "phosphor-react-native";
import { THEME } from "src/theme";

export function ClassHoursList() {
  const items = [
    {
      id: 1,
      dayOfWeek: '1',
      hours: [
        { start: '7:00', end: '8:00' },
        { start: '8:00', end: '9:00' },
        { start: '9:00', end: '10:00' },
        { start: '10:00', end: '11:00' }
      ]
    },
    {
      id: 2,
      dayOfWeek: '2',
      hours: [
        { start: '7:00', end: '8:00' },
        { start: '8:00', end: '9:00' },
        { start: '9:00', end: '10:00' },
        { start: '10:00', end: '11:00' }
      ]
    },
    {
      id: 3,
      dayOfWeek: '3',
      hours: [
        { start: '7:00', end: '8:00' },
        { start: '8:00', end: '9:00' },
        { start: '9:00', end: '10:00' },
        { start: '10:00', end: '11:00' }
      ]
    },
    {
      id: 4,
      dayOfWeek: '4',
      hours: [
        { start: '7:00', end: '8:00' },
        { start: '8:00', end: '9:00' },
        { start: '9:00', end: '10:00' },
        { start: '10:00', end: '11:00' }
      ]
    }
  ]
  return (
    <View flex={1}>
      <PageHeader title="Jornadas" />
      <ScrollContainer>
        {
          items && items.length && (
            items.map((item) => {
              return (
                <ClassHourItem key={item.id} item={item} />
              )
            })
          )
        }
        <HStack mt={2} alignItems="center" space={2} mb={20}>
          <Info size={18} color={THEME.colors.danger['500']} />
          <Text flex={1} color="danger.500" fontSize="xs"> As alterações afetarão todas as turmas que utilizam esta jornada de horários </Text>
        </HStack>
      </ScrollContainer>
    </View >
  )
}