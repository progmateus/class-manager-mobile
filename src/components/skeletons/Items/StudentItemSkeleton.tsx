import { HStack, View, VStack } from "native-base";
import { Skeleton } from "..";

export function StudentItemSkeleton() {
  return (
    <HStack alignItems="center" rounded="md">
      <VStack space={2.5} alignItems="center" justifyContent="center">
        <Skeleton size="10" rounded="full" />
      </VStack>
      <VStack flex={1} ml={3} justifyContent="center" space={2}>
        <Skeleton w={24} h={3} />
        <Skeleton w={16} h={2} />
      </VStack>
    </HStack>
  )
}