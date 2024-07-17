import { HStack, Heading, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native"


type Props = {
  title: string;
  rightIcon?: any;
  rightAction?: () => {};
  rightIconColor?: string;
}

import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export function PageHeader({ title, rightIcon, rightAction, rightIconColor = "success.600" }: Props) {
  const statusBarHeight = Constants.statusBarHeight;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  }

  return (
    <HStack
      px={3}
      display="flex"
      alignItems="center"
      mt={statusBarHeight + 12}
      borderBottomWidth={0.5}
      py={3}
      borderBottomColor="coolGray.400"
    >
      <TouchableOpacity>
        <Icon as={ArrowLeft} onPress={handlePress} />
      </TouchableOpacity>
      <Heading flex={1} textAlign="center" fontFamily="heading" fontSize="2xl"> {title} </Heading>
      {
        rightIcon && (
          <TouchableOpacity onPress={rightAction}>
            <Icon as={rightIcon} color={rightIconColor} />
          </TouchableOpacity>
        )
      }
    </HStack>
  );
}