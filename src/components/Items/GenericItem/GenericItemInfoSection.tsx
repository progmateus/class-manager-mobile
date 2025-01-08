import { HStack, VStack } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = {
  children: ReactNode
}

export function GenericItemInfoSection({ children }: IProps) {
  return (
    <VStack space={1}>
      {children}
    </VStack>
  )
}