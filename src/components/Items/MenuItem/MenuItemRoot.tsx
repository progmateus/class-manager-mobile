import { HStack } from "native-base"
import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"

type IMenuItemRootProps = {
  children: ReactNode;
  onPress?: () => void;
}

export function MenuItemRoot({ children, onPress }: IMenuItemRootProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack w="full" rounded="lg" h={16} alignItems="center" borderWidth={0.5} px={4}>
        {children}
      </HStack>
    </TouchableOpacity>
  )
}