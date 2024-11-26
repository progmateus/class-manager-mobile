import { HStack, Text, VStack } from "native-base"
import CalendarSVG from "@assets/calendar.svg"
import ClockSVG from "@assets/clock-outline.svg"
import MapSVG from "@assets/map-marker-outline.svg"
import PersonSVG from "@assets/person-outline.svg"
import { TouchableOpacity } from "react-native";
import dayjs from "dayjs"
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO"
import { Cloud } from "phosphor-react-native"
import { EClassDayStatus } from "src/enums/EClassDayStatus"

interface IProps {
  classDay: ICLassDayDTO
}

interface ITeacher {
  name: string
}

export function Info({ classDay }: IProps) {

  const getDate = (date: Date) => {
    if (!date) return ""
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(dayjs(date, 'YYYY-MM-DD:hh:mm').toDate())
  };

  const status = classDay.status == EClassDayStatus.PENDING ? 'Pendente' : classDay.status == EClassDayStatus.CANCELED ? 'Cancelada' : 'Concluída'
  const color = classDay.status == EClassDayStatus.PENDING ? 'warning.400' : classDay.status == EClassDayStatus.CANCELED ? 'red.500' : 'green.600'

  return (
    <VStack space={2}>
      <HStack alignItems="center" space={1}>
        <CalendarSVG width={24} height={24} />
        <Text fontSize="sm" textTransform="capitalize"> {getDate(classDay.date)} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <ClockSVG width={24} height={24} />
        <Text fontSize="sm" > {classDay.hourStart} </Text>
        <Text fontSize="sm"> - </Text>
        <Text fontSize="sm"> {classDay.hourEnd} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <MapSVG width={24} height={24} />
        <Text fontSize="sm"> Praia da bica </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <PersonSVG width={24} height={24} />
        <Text fontSize="sm"> {classDay.class?.teachersClasses[0]?.user?.name ?? 'Não informado'} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <Cloud size={24} />
        <Text
          fontSize="sm"
          color={classDay.status == EClassDayStatus.PENDING ? 'warning.400' : classDay.status == EClassDayStatus.CANCELED ? 'red.500' : 'green.600'}>
          {status}
        </Text>
      </HStack>
    </VStack>
  )
}