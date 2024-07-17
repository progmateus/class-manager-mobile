import { HStack, Heading, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native"
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  rightIcon?: any;
  rightAction?: () => {};
  rightIconColor?: string;
}

export function PageHeader({ title, rightIcon, rightAction, rightIconColor = "success.600" }: Props) {
  const statusBarHeight = Constants.statusBarHeight;
  const navigation = useNavigation();

  const handleBack = () => {
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
      <TouchableOpacity onPress={handleBack}>
        <Icon as={ArrowLeft} />
      </TouchableOpacity>
      <Heading
        style={{
          marginLeft: rightAction ? 0 : -28
        }}
        flex={1} textAlign="center" fontFamily="heading" fontSize="2xl"> {title} </Heading>
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