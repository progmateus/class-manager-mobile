import { HStack, VStack } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = {
  children: ReactNode
}

export function GenericItemRightContainer({ children }: IProps) {
  return (
    <VStack alignItems="center">
      {children}
    </VStack>
  )
}