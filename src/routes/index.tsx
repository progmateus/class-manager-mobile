import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GuestRoutes } from "./guest.routes";
import { Box, useTheme } from "native-base";
import { UserRoutes } from "./user.routes";

export function Routes() {
  const { colors } = useTheme();
  const token = null;

  const theme = DefaultTheme;
  theme.colors.background = colors.white
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        {
          token ? <UserRoutes /> : <GuestRoutes />
        }
      </NavigationContainer>
    </Box>
  )
}