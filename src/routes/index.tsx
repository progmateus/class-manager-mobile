import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GuestRoutes } from "./guest.routes";
import { Box, useTheme } from "native-base";
import { UserRoutes } from "./user.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.white

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        {
          user.id ? <UserRoutes /> : <GuestRoutes />
        }
      </NavigationContainer>
    </Box>
  )
}