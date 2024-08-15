import { Button, HStack, PresenceTransition, Text, VStack } from "native-base"
import { CaretDown, TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { THEME } from "src/theme"

interface IProps {
  item: {
    id?: number;
    dayOfWeek: string;
    hours: IHour[]
  }
}

interface IHour {
  id: number;
  start: string;
  end: string
}
export function ClassHourItem({ item: { dayOfWeek, hours } }: IProps) {
  const [isOpen, setIsOpen] = useState(false)

  const transforWeekDay = (dayOfWeek: string | number) => {
    const objTransform: any = {
      '1': 'DOMINGO',
      '2': 'SEGUNDA-FEIRA',
      '3': 'TERÇA-FEIRA',
      '4': 'QUARTA-FEIRA',
      '5': 'QUINTA-FEIRA',
      '6': 'SEXTA-FEIRA',
      '7': 'SÁBADO'
    }

    return objTransform[String(dayOfWeek)]
  }

  const handleDeletehour = (hourId: number) => {
    console.log(hourId)
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
                  hours && hours.length && (
                    hours.map((hour) => {
                      return (
                        <TouchableOpacity onPress={() => handleDeletehour(hour.id)}>
                          <HStack key={hour.start} alignItems="center" justifyContent="space-evenly">
                            <Text fontSize="lg">{`${hour.start} - ${hour.end}`}</Text>
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