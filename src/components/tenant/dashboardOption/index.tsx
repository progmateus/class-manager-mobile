import { ReactNode } from "react";
import { HStack, Text, useTheme, View, VStack } from "native-base";
import { TouchableOpacity } from "react-native";


interface IProps {
  icon: ReactNode,
  text: string;
  onPress: () => void;
}
export function DashboardOption({ icon, text, onPress }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <VStack alignItems="center" justifyContent="center" w="20" space={3}>
        <View bgColor="coolGray.100" rounded="full" p={4}>
          {icon}
        </View>
        <Text color="black" textAlign="center" maxWidth="24" fontSize={12}>{text}</Text>
      </VStack>
    </TouchableOpacity>
  )
}