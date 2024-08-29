import { HStack } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { border } from "native-base/lib/typescript/theme/styled-system";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = InterfaceHStackProps & {
  children: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
}

export function GenericItemRoot({ children, onPress, onLongPress, ...rest }: IProps) {

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <HStack w="full" rounded="md" alignItems="center" borderWidth={0.5} px={4} py={4} {...rest}>
        {children}
      </HStack>
    </TouchableOpacity>
  )
}