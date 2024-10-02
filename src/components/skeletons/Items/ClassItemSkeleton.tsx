import { GenericItem } from "@components/Items/GenericItem";
import { GraduationCap, IdentificationBadge } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Skeleton } from "..";
import { HStack, VStack } from "native-base";

export function ClassItemSkeleton() {
  return (
    <TouchableOpacity>
      <GenericItem.Root>
        <Skeleton mr={6} size={6} />
        <VStack flex={1} space={4}>
          <Skeleton w="16" h={3} />
          <Skeleton w="10" h={2} />
        </VStack>
        <GenericItem.InfoSection>
          <GenericItem.InfoContainer >
            <HStack space={1} alignItems="center">
              <Skeleton size={4} />
              <Skeleton w="5" h="2" />
            </HStack>
          </GenericItem.InfoContainer>
          <GenericItem.InfoContainer >
            <HStack space={1} alignItems="center">
              <Skeleton size={4} />
              <Skeleton w="3" h="2" />
            </HStack>
          </GenericItem.InfoContainer>
        </GenericItem.InfoSection>
      </GenericItem.Root>
    </TouchableOpacity>
  )
}