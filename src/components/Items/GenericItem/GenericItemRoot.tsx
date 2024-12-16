import { HStack } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { ReactNode } from "react";

type IProps = InterfaceHStackProps & {
  children: ReactNode;
  isSelected?: boolean;
}

export function GenericItemRoot({ isSelected = false, children, ...rest }: IProps) {

  return (
    <HStack borderWidth={isSelected ? 0.8 : 0.3} borderColor={isSelected ? 'brand.500' : 'coolGray.500'} w="full" rounded="md" alignItems="center" px={4} py={4} {...rest}>
      {children}
    </HStack>
  )
}