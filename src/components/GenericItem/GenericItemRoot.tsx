import { HStack } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { border } from "native-base/lib/typescript/theme/styled-system";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = InterfaceHStackProps & {
  children: ReactNode;
}

export function GenericItemRoot({ children, ...rest }: IProps) {

  return (
    <HStack w="full" rounded="md" alignItems="center" borderWidth={0.5} px={4} py={4} {...rest}>
      {children}
    </HStack>
  )
}