import { HStack } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = {
  children: ReactNode;
  onPress?: () => void;
}

export function GenericItemRoot({ children, onPress }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack w="full" rounded="lg" alignItems="center" borderWidth={0.5} px={4} py={4}>
        {children}
      </HStack>
    </TouchableOpacity>
  )
}