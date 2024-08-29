import { Icon, Text, VStack } from "native-base";
import { ReactNode } from "react";

type IUserItemContentProps = {
  children: ReactNode
}

export function UserItemContent({ children }: IUserItemContentProps) {
  return (
    <VStack flex={1}>
      {children}
    </VStack>
  )
}