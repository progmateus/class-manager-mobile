import { HStack } from "native-base";
import { ReactNode } from "react";

type IUserItemActionsProps = {
  children: ReactNode;
}

export function UserItemSection({ children }: IUserItemActionsProps) {
  return (
    <HStack space={2}>
      {children}
    </HStack>
  )
}