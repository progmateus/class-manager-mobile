import { Label } from "@components/form/Label"
import { ISCheduleDayDTO } from "@dtos/timeTables/IScheduleDayDTO"
import { fireErrorToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Button, Heading, HStack, Icon, PresenceTransition, Stack, Text, View, VStack } from "native-base"
import { CaretDown, Plus, TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { TextInputMask } from "react-native-masked-text"
import { THEME } from "src/theme"

interface IProps {
  dayOfWeek: number;
  addScheduleDayFn: (dayOfWeek: number, hourStart: string, hourEnd: string) => void;
  removeScheduleDayFn: (id: string) => void
  schedulesDays: ISCheduleDayDTO[]
}

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

export function WeekScheduleDay({ dayOfWeek, schedulesDays, addScheduleDayFn, removeScheduleDayFn }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedWeekDay, setSelectedWeekDay] = useState(0)
  const [hourStart, setHourStart] = useState("")
  const [hourEnd, setHourEnd] = useState("")

  const transforWeekDay = (dayOfWeek: string | number) => {
    const objTransform: any = {
      '0': 'DOMINGO',
      '1': 'SEGUNDA-FEIRA',
      '2': 'TERÇA-FEIRA',
      '3': 'QUARTA-FEIRA',
      '4': 'QUINTA-FEIRA',
      '5': 'SEXTA-FEIRA',
      '6': 'SÁBADO'
    }

    return objTransform[String(dayOfWeek)]
  }

  const { colors, sizes } = THEME;

  const handleOpenActions = (weekDay: number) => {
    setSelectedWeekDay(weekDay)
    setIsAddOpen(true)
  }

  const handleAdd = () => {
    if (!hourStart || !hourEnd) {
      fireErrorToast("Horário inválido")
      return
    }

    if (!hourStart.match(timeRegex) || !hourEnd.match(timeRegex)) {
      fireErrorToast("Horário inválido")
      return
    }
    addScheduleDayFn(dayOfWeek, hourStart, hourEnd)
    onClose()
  }


  const handleRemove = (id: string) => {
    removeScheduleDayFn(id)
  }

  const onClose = () => {
    setIsAddOpen(false)
    setHourStart("")
    setHourEnd("")
  }

  return (
    <VStack space={4} mb={4}>
      <VStack borderWidth={0.5} borderColor="coolGray.400" borderRadius={7} >
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <HStack justifyContent="space-between" alignItems="center" p={6}>
            <Text>{transforWeekDay(dayOfWeek)}</Text>
            <CaretDown color={THEME.colors.coolGray[400]} />
          </HStack>
        </TouchableOpacity>

        {
          isOpen && (
            <PresenceTransition visible={isOpen} initial={{
              opacity: 0
            }} animate={{
              opacity: 1,
              transition: {
                duration: 100
              }
            }}>
              <VStack px={8} space={4} my={6}>
                {
                  schedulesDays && schedulesDays.length > 0 && (
                    schedulesDays.map((scheduleDay: any, index) => {
                      return (
                        <HStack key={scheduleDay.id} alignItems="center" justifyContent="space-evenly">
                          <Text fontSize="lg">{`${scheduleDay.hourStart} - ${scheduleDay.hourEnd}`}</Text>
                          <TouchableOpacity onPress={() => handleRemove(scheduleDay.id)}>
                            <TrashSimple size={24} />
                          </TouchableOpacity>

                        </HStack>
                      )
                    })
                  )
                }
                <Button onPress={() => handleOpenActions(dayOfWeek)} alignSelf="center" size="md" w="1/2" variant="outline" color="brand.500" borderColor="brand.500" mt={4} rounded="full" borderStyle="dashed">
                  Adicionar +
                </Button>

              </VStack>
            </PresenceTransition>
          )
        }
      </VStack>
      <Actionsheet isOpen={isAddOpen} size="full" onClose={onClose}>
        <Actionsheet.Content>
          <VStack h="full" space={8}>
            <Box w="100%" minH={60} px={4} justifyContent="center" alignSelf="center">
              <Heading fontSize="16" color="coolGray.700" textAlign="center">
                {transforWeekDay(selectedWeekDay)}
              </Heading>
            </Box>
            <HStack space={4} w="100%" px={4} alignContent="center" justifyContent="center">
              <VStack flex={1} space={2}>
                <Label text="Início:" />
                <TextInputMask
                  onChangeText={setHourStart}
                  value={hourStart}
                  style={{
                    width: '100%',
                    borderBottomColor: 'red',
                    color: colors.coolGray[700],
                    height: sizes[10],
                    borderColor: colors.coolGray[300],
                    borderWidth: 0.8,
                    borderRadius: 4,
                    paddingLeft: sizes[4]
                  }}
                  type={'datetime'}
                  options={{
                    format: 'HH:mm'
                  }}
                />
              </VStack>

              <VStack flex={1} space={2}>
                <Label text="Fim:" />
                <TextInputMask
                  onChangeText={setHourEnd}
                  value={hourEnd}
                  style={{
                    width: '100%',
                    borderBottomColor: 'red',
                    color: colors.coolGray[700],
                    height: sizes[10],
                    borderColor: colors.coolGray[300],
                    borderWidth: 0.8,
                    borderRadius: 4,
                    paddingLeft: sizes[4]
                  }}
                  type={'datetime'}
                  options={{
                    format: 'HH:mm'
                  }}
                />
              </VStack>
            </HStack>
            <Actionsheet.Item alignSelf="center">
              <Button onPress={handleAdd} color="brand.700" px={8} rounded="full"> Adicionar </Button>
            </Actionsheet.Item>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  )
}