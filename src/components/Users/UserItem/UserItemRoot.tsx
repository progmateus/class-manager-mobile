import { HStack } from "native-base"
import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"

type IUserItemRootProps = {
  children: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
}

export function UserItemRoot({ children, onPress, onLongPress }: IUserItemRootProps) {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <HStack w="full" rounded="lg" h={16} alignItems="center" px={4}>
        {children}
      </HStack>
    </TouchableOpacity>
  )
}