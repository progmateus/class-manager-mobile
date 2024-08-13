import { HomeHeader } from "@components/HomeHeader";
import { useTheme, View } from "native-base";

export function Dashboard() {
  return (
    <View flex={1}>
      <HomeHeader />
    </View>
  )
}