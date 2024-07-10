import { View } from "native-base";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export function Container() {
  return (
    <View flex={1} pt={statusBarHeight}>

    </View>
  );
}