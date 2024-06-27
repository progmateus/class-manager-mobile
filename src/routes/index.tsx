import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GuestRoutes } from "./guest.routes";
import { Box, useTheme } from "native-base";

export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.white
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        <GuestRoutes />
      </NavigationContainer>
    </Box>
  )
}