import { HStack, VStack } from "native-base";
import { Skeleton } from "@components/skeletons";
import { SubscriptionInfoItemSkeleton } from "./SubscriptionInfoItemSkeleton";
import { Viewcontainer } from "@components/ViewContainer";

export function SubscriptionProfileSkeleton() {
  return (
    <Viewcontainer>
      <VStack space={8}>
        <HStack justifyContent="space-between">
          <VStack space={1} justifyContent="center">
            <SubscriptionInfoItemSkeleton />
            <SubscriptionInfoItemSkeleton width="12" />
            <SubscriptionInfoItemSkeleton width="24" />
            <SubscriptionInfoItemSkeleton />
            <SubscriptionInfoItemSkeleton width="20" />
          </VStack>
          <VStack space={4}>
            <Skeleton w="24" h="24" rounded="full" alignSelf="center" />
            <Skeleton w="12" h="2" rounded="full" alignSelf="center" />
          </VStack>
        </HStack>
        <HStack justifyContent="space-between" space={4}>
          <Skeleton flex={1} rounded="lg" h="14" />
          <Skeleton flex={1} rounded="lg" h="14" />
        </HStack>
        <VStack space={4} pb={20}>
          <Skeleton w="12" h="4" />
          <Skeleton h="16" />
          <Skeleton h="16" />
          <Skeleton h="16" />
        </VStack>
      </VStack>
    </Viewcontainer>
  )
}