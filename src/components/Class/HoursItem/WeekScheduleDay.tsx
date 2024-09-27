import { Button, HStack, PresenceTransition, Text, VStack } from "native-base"
import { CaretDown, TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { THEME } from "src/theme"

interface IProps {
  dayOfWeek: number;
  schedulesDays: ScheduleDay[]
}

interface ScheduleDay {
  id: number;
  hourStart: string;
  hourEnd: string
}
export function WeekScheduleDay({ dayOfWeek, schedulesDays }: IProps) {
  const [isOpen, setIsOpen] = useState(false)

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
                        <TouchableOpacity>
                          <HStack key={scheduleDay.id} alignItems="center" justifyContent="space-evenly">
                            <Text fontSize="lg">{`${scheduleDay.hourStart} - ${scheduleDay.hourEnd}`}</Text>
                            <TrashSimple size={24} />
                          </HStack>
                        </TouchableOpacity>
                      )
                    })
                  )
                }
                <Button alignSelf="center" size="md" w="1/2" variant="outline" color="brand.500" borderColor="brand.500" mt={4} rounded="full" borderStyle="dashed">
                  Adicionar +
                </Button>

              </VStack>
            </PresenceTransition>
          )
        }
      </VStack>
    </VStack>
  )
}