import { HStack, PresenceTransition, Text, VStack } from "native-base"
import { CaretDown, TrashSimple } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { THEME } from "src/theme"

export function ClassDayHourItem() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <VStack space={4}>
      <VStack borderWidth={0.5} borderColor="coolGray.400" borderRadius={7} p={6}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text>SEGUNDA-FEIRA</Text>
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
              <VStack px={8} space={4} mt={6}>
                <HStack alignItems="center" justifyContent="space-evenly">
                  <Text fontSize="lg">17:00 - 18:00</Text>
                  <TrashSimple size={24} />
                </HStack>

                <HStack alignItems="center" justifyContent="space-evenly">
                  <Text fontSize="lg">20:00 - 21:00</Text>
                  <TrashSimple size={24} />
                </HStack>

                <HStack alignItems="center" justifyContent="space-evenly">
                  <Text fontSize="lg">21:00 - 22:00</Text>
                  <TrashSimple size={24} />
                </HStack>

                <HStack alignItems="center" justifyContent="space-evenly">
                  <Text fontSize="lg">22:00 - 23:00</Text>
                  <TrashSimple size={24} />
                </HStack>
              </VStack>
            </PresenceTransition>
          )
        }
      </VStack>
    </VStack>
  )
}