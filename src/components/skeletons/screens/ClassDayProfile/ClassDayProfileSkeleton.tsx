import { Viewcontainer } from "@components/ViewContainer";
import { HStack, View, VStack } from "native-base";
import { StudentItemSkeleton } from "../../Items/StudentItemSkeleton";
import { Skeleton } from "@components/skeletons";

export function ClassDayProfileSkeleton() {
  return (
    <Viewcontainer>
      <VStack space={2}>
        <HStack alignItems="center" space={3}>
          <Skeleton width={6} height={6} />
          <Skeleton width="56" height={3} />
        </HStack>

        <HStack alignItems="center" space={3}>
          <Skeleton width={6} height={6} />
          <Skeleton width="32" height={3} />
        </HStack>

        <HStack alignItems="center" space={3}>
          <Skeleton width={6} height={6} />
          <Skeleton width="24" height={3} />
        </HStack>

        <HStack alignItems="center" space={3}>
          <Skeleton width={6} height={6} />
          <Skeleton width="32" height={3} />
        </HStack>
      </VStack>
      <View mt={8} ml={2} flex={1}>
        <Skeleton width="32" height={4} mb={4} />
        <VStack space={5}>
          <StudentItemSkeleton />
          <StudentItemSkeleton />
          <StudentItemSkeleton />
          <StudentItemSkeleton />
          <StudentItemSkeleton />
        </VStack>
      </View>
      <View height="10" bgColor="coolGray.100" mx={4} mt={4} rounded="md" />
    </Viewcontainer>
  )
}