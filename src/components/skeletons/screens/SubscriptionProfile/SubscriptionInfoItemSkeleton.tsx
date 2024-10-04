import { Skeleton } from "@components/skeletons";
import { HStack } from "native-base";

interface IProps {
  width?: string;
}
export function SubscriptionInfoItemSkeleton({ width = "16" }: IProps) {
  return (
    <HStack space={1} alignItems="center">
      <Skeleton w="6" h="6" />
      <Skeleton w={width} h="3" rounded="md" />
    </HStack>
  )
}