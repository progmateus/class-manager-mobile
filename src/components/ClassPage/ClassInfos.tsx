import { HStack, Text, VStack } from "native-base"
import CalendarSVG from "@assets/calendar.svg"
import ClockSVG from "@assets/clock-outline.svg"
import MapSVG from "@assets/map-marker-outline.svg"
import PersonSVG from "@assets/person-outline.svg"
import { TouchableOpacity } from "react-native";

interface IProps {
  infos: {
    date: Date;
    start: string;
    end: string;
    address: string;
    teacher: {
      name: string;
    }
  }
}

export function ClassInfos({ infos }: IProps) {

  const getDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(date)
  };

  return (
    <VStack space={1} p={4} mt={2}>
      <HStack alignItems="center" space={1}>
        <CalendarSVG width={24} height={24} />
        <Text fontSize="sm" textTransform="capitalize"> {getDate(infos.date)} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <ClockSVG width={24} height={24} />
        <Text fontSize="sm" > {infos.start} </Text>
        <Text fontSize="sm"> - </Text>
        <Text fontSize="sm"> {infos.end} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <MapSVG width={24} height={24} />
        <Text fontSize="sm"> {infos.address} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <PersonSVG width={24} height={24} />
        <Text fontSize="sm"> {infos.teacher.name} </Text>
      </HStack>
    </VStack>
  )
}