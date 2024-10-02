import { GenericItem } from "@components/Items/GenericItem";
import { GraduationCap, IdentificationBadge } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Skeleton } from "..";
import { HStack, VStack } from "native-base";

export function SubscriptionItemSkeleton() {
  return (
    <HStack space={4} alignItems="center">
      <Skeleton
        rounded="full"
        w={12}
        h={12}
      />
      <VStack flex={1} space={3}>
        <Skeleton w="24" h="3" />
        <Skeleton w="12" h="3" />
      </VStack>

      <VStack textAlign="right" space={2}>
        <Skeleton w="20" h="2" />
        <VStack>
          <HStack alignItems="center" space={2} justifyContent="flex-end" mr={1}>
            <Skeleton w="8" h="2" />
            <Skeleton w="3" h="3" />
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  )
}