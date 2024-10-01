import { HStack, View, VStack } from "native-base";

export function ClassDaySkeleton() {
  return (
    <HStack px={6} py={5} space={6} alignItems="center" borderWidth={0.4} borderColor="coolGray.400" rounded="lg">
      <VStack space={2.5} alignItems="center" justifyContent="center">
        <View size={6} bgColor="coolGray.200" />
        <View w={8} h={3} bgColor="coolGray.200" />
      </VStack>
      <VStack space={2.5} flex={1} justifyContent="center">
        <View w={24} h={3} bgColor="coolGray.200" />
        <View w={16} h={2} bgColor="coolGray.200" />
        <View w={9} h={2} bgColor="coolGray.200" />
      </VStack>
      <HStack alignItems="center" justifyContent="center">
        <View w={9} h={9} bgColor="coolGray.200" borderColor="white" borderWidth={1} />
        <View w={9} h={9} bgColor="coolGray.200" borderColor="white" borderWidth={1} ml={-5} />
        <View w={9} h={9} bgColor="coolGray.200" borderColor="white" borderWidth={1} ml={-5} />
      </HStack>
    </HStack>
  )
}