import { HStack, View, VStack } from "native-base";
import { Skeleton } from "..";

export function ClassDayItemSkeleton() {
  return (
    <HStack px={6} py={5} space={6} alignItems="center" borderWidth={0.4} borderColor="coolGray.400" rounded="lg">
      <VStack space={2.5} alignItems="center" justifyContent="center">
        <Skeleton size={6} />
        <Skeleton w={8} h={3} />
      </VStack>
      <VStack space={2.5} flex={1} justifyContent="center">
        <Skeleton w={24} h={3} />
        <Skeleton w={16} h={2} />
        <Skeleton w={9} h={2} />
      </VStack>
      <HStack alignItems="center" justifyContent="center">
        <Skeleton w={9} h={9} borderColor="white" borderWidth={1} />
        <Skeleton w={9} h={9} borderColor="white" borderWidth={1} ml={-5} />
        <Skeleton w={9} h={9} borderColor="white" borderWidth={1} ml={-5} />
      </HStack>
    </HStack>
  )
}