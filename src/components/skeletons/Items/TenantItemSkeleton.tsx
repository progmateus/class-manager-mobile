import { HStack, VStack } from "native-base";
import { Skeleton } from "..";

export function TenantItemSkeleton() {
  return (
    <HStack space={5} px={2} py={3} alignItems="center" rounded="md">
      <Skeleton size="12" rounded="md" />
      <VStack space={2} flex={1}>
        <Skeleton w="24" h="3" />
        <Skeleton w="14" h="2" />
      </VStack>
    </HStack>
  )
}