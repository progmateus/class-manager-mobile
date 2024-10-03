import { ISkeletonProps, Skeleton as NativeBaseSkeleton } from "native-base";

export function Skeleton({ ...rest }: ISkeletonProps) {
  return (
    <NativeBaseSkeleton startColor="coolGray.100" endColor="coolGray.300" rounded="md" {...rest} />
  )
}