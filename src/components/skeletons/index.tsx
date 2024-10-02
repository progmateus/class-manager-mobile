import { ISkeletonProps, Skeleton as NativeBaseSkeleton } from "native-base";

export function Skeleton({ ...rest }: ISkeletonProps) {
  return (
    <NativeBaseSkeleton {...rest} />
  )
}