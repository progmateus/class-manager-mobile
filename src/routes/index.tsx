import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GuestRoutes } from "./guest.routes";
import { Box, useTheme } from "native-base";
import { UserRoutes } from "./user.routes";
import { TenantRoutes } from "./tenant.routes";
import { User } from "phosphor-react-native";

export function Routes() {
  const { colors } = useTheme();
  const token = null;

  const theme = DefaultTheme;
  theme.colors.background = colors.white
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        {
          token ? <TenantRoutes /> : <UserRoutes />
        }
      </NavigationContainer>
    </Box>
  )
}