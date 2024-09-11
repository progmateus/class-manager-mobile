import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GuestRoutes } from "./guest.routes";
import { Box, useTheme } from "native-base";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { TenantRoutes } from "./tenant.routes";
import { useTenant } from "@hooks/useTenant";
import { UserRoutes } from "./user.routes";

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();
  const { tenant, isLoadingTenantData } = useTenant();

  const theme = DefaultTheme;
  theme.colors.background = colors.white

  if (isLoadingUserStorageData || isLoadingTenantData) {
    return <Loading />
  }


  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        {
          tenant.id ? (
            <TenantRoutes />
          ) : user.id ? (
            <UserRoutes />
          ) : (
            <GuestRoutes />
          )
        }
      </NavigationContainer>
    </Box>
  )
}