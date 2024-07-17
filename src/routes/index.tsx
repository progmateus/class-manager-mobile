import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GuestRoutes } from "./guest.routes";
import { Box, useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { colors } = useTheme();
  const token = "123456";

  const theme = DefaultTheme;
  theme.colors.background = colors.white
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        {
          token ? <AuthRoutes /> : <GuestRoutes />
        }
      </NavigationContainer>
    </Box>
  )
}