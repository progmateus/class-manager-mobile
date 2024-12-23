import { Input } from "@components/form/Input"
import { InputMask } from "@components/form/InputMask"
import { Label } from "@components/form/Label"
import { ISCheduleDayDTO } from "@dtos/timeTables/IScheduleDayDTO"
import { zodResolver } from "@hookform/resolvers/zod"
import { fireErrorToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Button, Heading, HStack, Icon, PresenceTransition, Stack, Text, View, VStack } from "native-base"
import { CaretDown, Plus, TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TouchableOpacity } from "react-native"
import { TextInputMask } from "react-native-masked-text"
import { THEME } from "src/theme"
import { z } from "zod"

interface IProps {
  dayOfWeek: number;
  addScheduleDayFn: (dayOfWeek: number, name: string, startHour: string, endHour: string) => void;
  removeScheduleDayFn: (id: string) => void
  schedulesDays: ISCheduleDayDTO[]
}

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

const createScheduleDateSchema = z.object({
  startHour: z.string().regex(timeRegex, "Horário inválido"),
  endHour: z.string().regex(timeRegex, "Horário inválido"),
  name: z.string().min(3, "min 3 caracteres").max(80, "max 80 caracteres")
});

type createScheduleDateProps = z.infer<typeof createScheduleDateSchema>


export function WeekScheduleDay({ dayOfWeek, schedulesDays, addScheduleDayFn, removeScheduleDayFn }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedWeekDay, setSelectedWeekDay] = useState(0)

  const { control, handleSubmit, formState: { errors }, reset } = useForm<createScheduleDateProps>({
    resolver: zodResolver(createScheduleDateSchema)
  });

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

  const handleOpenActions = (weekDay: number) => {
    setSelectedWeekDay(weekDay)
    setIsAddOpen(true)
  }

  const handleAdd = ({ name, startHour, endHour }: createScheduleDateProps) => {
    if (!startHour || !endHour) {
      fireErrorToast("Horário inválido")
      return
    }

    if (!startHour.match(timeRegex) || !endHour.match(timeRegex)) {
      fireErrorToast("Horário inválido")
      return
    }
    addScheduleDayFn(selectedWeekDay, name, startHour, endHour)
    onClose()
  }


  const handleRemove = (id: string) => {
    removeScheduleDayFn(id)
  }

  const onClose = () => {
    setIsAddOpen(false)
    reset()
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
                    schedulesDays.map((scheduleDay: any) => {
                      return (
                        <HStack key={scheduleDay.id} alignItems="center" justifyContent="space-evenly">
                          <Text fontSize="lg">{scheduleDay.name}</Text>
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
      <Actionsheet isOpen={isAddOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack space={8} px={4}>
            <Box w="100%" minH={60} px={4} justifyContent="center" alignSelf="center">
              <Heading fontSize="16" color="coolGray.700" textAlign="center">
                {transforWeekDay(selectedWeekDay)}
              </Heading>
            </Box>

            <Box h="20">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input label="Nome" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
                )}
              />
            </Box>

            <HStack space={4}>
              <Controller
                name="startHour"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    label="Início:"
                    type="datetime"
                    options={{
                      format: 'HH:mm'
                    }}
                    onChangeText={onChange} value={value} errorMessage={errors.startHour?.message} />
                )}
              />

              <Controller
                name="endHour"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    label="Fim:"
                    type="datetime"
                    options={{
                      format: 'HH:mm'
                    }}
                    onChangeText={onChange} value={value} errorMessage={errors.endHour?.message} />
                )}
              />
            </HStack>
            <Actionsheet.Item alignSelf="center" mb="10">
              <Button onPress={handleSubmit(handleAdd)} color="brand.700" px={8} rounded="full"> Adicionar </Button>
            </Actionsheet.Item>
          </VStack>
        </Actionsheet.Content >
      </Actionsheet >
    </VStack >
  )
}