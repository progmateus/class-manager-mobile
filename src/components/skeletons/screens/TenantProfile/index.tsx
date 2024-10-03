import { Viewcontainer } from "@components/ViewContainer";
import { Box, Center, HStack, ScrollView, View, VStack } from "native-base";
import { StudentItemSkeleton } from "../../Items/StudentItemSkeleton";
import { Skeleton } from "@components/skeletons";

export function TenantProfileSkeleton() {
  return (
    <View>
      <VStack space={2}>
        <Center>
          <VStack space={5} justifyContent="center" alignItems="center">
            <Skeleton w="24" h="24" rounded="full" />
            <VStack space={3} alignItems="center">
              <Skeleton w="32" h="5" />
              <Skeleton w="20" h="3" />
            </VStack>
            <Skeleton w="48" h="10" rounded="md" />
            <HStack space={2} mt={2}>
              <Skeleton w="9" h="9" rounded="full" />
              <Skeleton w="9" h="9" rounded="full" />
              <Skeleton w="9" h="9" rounded="full" />
            </HStack>
          </VStack>
        </Center>
      </VStack>
      <Box>
        <Skeleton w="8" h="3" />
        <VStack space={2} mt={4}>
          <Skeleton w="full" h="2" />
          <Skeleton w="98%" h="2" />
          <Skeleton w="4/5" h="2" />
        </VStack>
      </Box>
      <View mt={4} py={2} borderBottomWidth={0.5} borderBottomColor="coolGray.400">
        <Center>
          <Skeleton w="4" h="4" />
        </Center>
      </View>
      <View flex={1} justifyContent="space-between" display="flex" flexDirection="row" flexWrap="wrap">
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
        <Skeleton size="32" rounded="none" mb={1} />
      </View>
    </View>
  )
}