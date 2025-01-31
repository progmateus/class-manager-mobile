import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GuestRoutes } from "./guest.routes";
import { Box, useTheme } from "native-base";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { TenantRoutes } from "./tenant.routes";
import { UserRoutes } from "./user.routes";
import { EAuthType } from "src/enums/EAuthType";

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingData, tenant, authenticationType } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.white

  if (isLoadingData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        {
          user.id && tenant.id && authenticationType === EAuthType.TENANT ? (
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