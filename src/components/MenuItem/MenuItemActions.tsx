import { HStack } from "native-base";
import { ReactNode } from "react";

type IMenuItemActionsProps = {
  children: ReactNode;
}

export function MenuItemActions({ children }: IMenuItemActionsProps) {
  return (
    <HStack space={2}>
      {children}
    </HStack>
  )
}