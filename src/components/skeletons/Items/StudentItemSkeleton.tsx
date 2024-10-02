import { HStack, View, VStack } from "native-base";

export function StudentItemSkeleton() {
  return (
    <HStack alignItems="center" rounded="md">
      <VStack space={2.5} alignItems="center" justifyContent="center">
        <View size="10" bgColor="coolGray.200" rounded="full" />
      </VStack>
      <VStack flex={1} ml={3} justifyContent="center" space={2}>
        <View w={24} h={3} bgColor="coolGray.200" />
        <View w={16} h={2} bgColor="coolGray.200" />
      </VStack>
    </HStack>
  )
}