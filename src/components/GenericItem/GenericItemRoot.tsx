import { HStack } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { border } from "native-base/lib/typescript/theme/styled-system";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

type IProps = InterfaceHStackProps & {
  children: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  touchable?: boolean;
}

export function GenericItemRoot({ children, onPress, onLongPress, touchable = true, ...rest }: IProps) {

  return (
    <>
      {
        touchable ? (
          <TouchableOpacity onPress={onPress} onLongPress={onLongPress} >
            <HStack w="full" rounded="md" alignItems="center" borderWidth={0.5} px={4} py={4} {...rest}>
              {children}
            </HStack>
          </TouchableOpacity>
        ) : (
          <HStack w="full" rounded="md" alignItems="center" borderWidth={0.5} px={4} py={4} {...rest}>
            {children}
          </HStack >
        )
      }
    </>
  )
}