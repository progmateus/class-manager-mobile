import { HStack, Text } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

interface IProps {
  title: string;
  icon: ReactNode,
  onPress?: () => void;
}

export function MenuOption({ title, icon, onPress }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
        {icon}
        <Text> {title} </Text>
      </HStack>
    </TouchableOpacity>
  )
}