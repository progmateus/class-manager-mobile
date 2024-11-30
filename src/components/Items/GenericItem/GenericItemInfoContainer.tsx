import { HStack } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = {
  children: ReactNode
}

export function GenericItemRightInfoContainer({ children }: IProps) {
  return (
    <HStack alignItems="center">
      {children}
    </HStack>
  )
}