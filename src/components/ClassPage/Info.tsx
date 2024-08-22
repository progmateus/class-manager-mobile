import { HStack, Text, VStack } from "native-base"
import CalendarSVG from "@assets/calendar.svg"
import ClockSVG from "@assets/clock-outline.svg"
import MapSVG from "@assets/map-marker-outline.svg"
import PersonSVG from "@assets/person-outline.svg"
import { TouchableOpacity } from "react-native";
import dayjs from "dayjs"

interface IProps {
  infos: {
    date: Date,
    hourStart: string,
    hourEnd: string,
    address: string,
    teachers: ITeacher[]
  }
}

interface ITeacher {
  name: string
}

export function Info({ infos }: IProps) {
  const getDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(dayjs(date, 'YYYY-MM-DD:hh:mm').toDate())
  };

  return (
    <VStack space={2} p={4} mt={2}>
      <HStack alignItems="center" space={1}>
        <CalendarSVG width={24} height={24} />
        <Text fontSize="sm" textTransform="capitalize"> {getDate(infos.date)} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <ClockSVG width={24} height={24} />
        <Text fontSize="sm" > {infos.hourStart} </Text>
        <Text fontSize="sm"> - </Text>
        <Text fontSize="sm"> {infos.hourEnd} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <MapSVG width={24} height={24} />
        <Text fontSize="sm"> {infos.address} </Text>
      </HStack>

      {
        infos.teachers && infos.teachers.length > 0 && (
          <HStack alignItems="center" space={1}>
            <PersonSVG width={24} height={24} />
            <Text fontSize="sm"> {infos.teachers[0].name} </Text>
          </HStack>
        )
      }
    </VStack>
  )
}