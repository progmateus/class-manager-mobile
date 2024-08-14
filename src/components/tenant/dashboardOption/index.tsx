import { ReactNode } from "react";
import { HStack, Text, useTheme, View } from "native-base";
import { TouchableOpacity } from "react-native";


interface IProps {
  icon: ReactNode,
  text: string;
  onPress: () => void;
}
export function DashboardOption({ icon, text, onPress }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack bgColor="brand.600" py={5} w="40" pl={6} alignItems="center" rounded="md">
        <View p={1} bgColor="brand.500" rounded="full" mr={4}>
          {icon}
        </View>
        <Text color="white">{text}</Text>
      </HStack>
    </TouchableOpacity>
  )
}