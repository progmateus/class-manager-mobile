import { Viewcontainer } from "@components/ViewContainer";
import { HStack, View, VStack } from "native-base";
import { StudentItemSkeleton } from "../../Items/StudentItemSkeleton";

export function ClassDayProfileSkeleton() {
  return (
    <Viewcontainer>
      <VStack space={2}>
        <HStack alignItems="center" space={3}>
          <View width={6} height={6} bgColor="coolGray.200" />
          <View width="56" height={3} bgColor="coolGray.200" />
        </HStack>

        <HStack alignItems="center" space={3}>
          <View width={6} height={6} bgColor="coolGray.200" />
          <View width="32" height={3} bgColor="coolGray.200" />
        </HStack>

        <HStack alignItems="center" space={3}>
          <View width={6} height={6} bgColor="coolGray.200" />
          <View width="24" height={3} bgColor="coolGray.200" />
        </HStack>

        <HStack alignItems="center" space={3}>
          <View width={6} height={6} bgColor="coolGray.200" />
          <View width="32" height={3} bgColor="coolGray.200" />
        </HStack>
      </VStack>
      <View mt={8} ml={2} flex={1}>
        <View width="32" height={4} mb={4} bgColor="coolGray.200" />
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