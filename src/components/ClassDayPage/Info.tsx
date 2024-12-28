import { HStack, Icon, Text, VStack } from "native-base"
import dayjs from "dayjs"
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO"
import { BookBookmark, BookmarkSimple, Calendar, Clock, Cloud, Info, MapPin, User } from "phosphor-react-native"
import { EClassDayStatus } from "src/enums/EClassDayStatus"

interface IProps {
  classDay: ICLassDayDTO
}

export function ClassDayHeader({ classDay }: IProps) {

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

  return (
    <VStack space={2}>
      <HStack alignItems="center" space={1}>
        <Icon as={<Calendar size={22} />} />
        <Text fontSize="sm" textTransform="capitalize"> {getDate(classDay.date)} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <Icon as={<Clock size={22} />} />
        <Text fontSize="sm" > {classDay.hourStart}</Text>
        <Text fontSize="sm"> - </Text>
        <Text fontSize="sm">{classDay.hourEnd}</Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <Icon as={<MapPin size={22} />} />
        <Text fontSize="sm"> {
          `${classDay.class?.address?.street ?? 'Não informado'}${classDay.class?.address?.street && classDay.class?.address?.number ? `, ${classDay.class?.address?.number}` : ''}`
        } </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <Icon as={<BookBookmark size={22} />} />
        <Text fontSize="sm"> {classDay.class.name ?? "Não informado"} </Text>
      </HStack>

      <HStack alignItems="center" space={1}>
        <Icon as={<User size={22} />} />
        <Text fontSize="sm"> {classDay.class?.teachersClasses[0]?.user?.name ?? 'Não informado'} </Text>
      </HStack>

      <HStack alignItems="center" space={2}>
        <Icon as={<Info size={22} />} />
        <Text
          fontSize="sm"
          color={classDay.status == EClassDayStatus.PENDING ? 'warning.400' : classDay.status == EClassDayStatus.CANCELED ? 'red.500' : 'green.600'}>
          {status}
        </Text>
      </HStack>
    </VStack>
  )
}