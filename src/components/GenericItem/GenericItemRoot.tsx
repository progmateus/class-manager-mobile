import { HStack } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = {
  children: ReactNode
}

export function GenericItemRoot({ children }: IProps) {
  return (
    <TouchableOpacity>
      <HStack py={3} alignItems="center" rounded="md">
        {children}
      </HStack>
    </TouchableOpacity>
  )
}