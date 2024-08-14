import { ClassHourItem } from "@components/Class/HoursItem/ClasshourItem";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { View, VStack } from "native-base";

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
        <VStack space={4}>
          {
            items && items.length && (
              items.map((item) => {
                return (
                  <ClassHourItem key={item.id} item={item} />
                )
              })
            )
          }
        </VStack>

      </ScrollContainer>
    </View >
  )
}