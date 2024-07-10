import { Platform } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { Profile } from "@screens/Auth/Profile";
import { Search } from "@screens/Auth/Search";
import { Tenants } from "@screens/Auth/Tenants";
import { useTheme } from "native-base";
import { UserCircle, MagnifyingGlass, Buildings } from "phosphor-react-native"
import TenantSVG from "@assets/tenant.svg"
import SearchSVG from "@assets/search.svg"
import ProfileSVG from "@assets/profile.svg"
import MoneySVG from "@assets/money.svg"
import { Bills } from "@screens/Auth/Bills";
import { Tenant } from "@screens/Auth/Tenant";


type AuthRoutes = {
  tenants: undefined;
  search: undefined;
  profile: undefined;
  bills: undefined;
  tenant: undefined;
}
export type AuthNavigatorRoutesProps = BottomTabNavigationProp<AuthRoutes>;

export function AuthRoutes() {
  const { sizes, colors } = useTheme();
  const { Navigator, Screen } = createBottomTabNavigator<AuthRoutes>();

  const iconSize = sizes[6]
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.blue[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[6]
        }
      }}>
      <Screen
        name="tenants"
        component={Tenant}
        options={{
          tabBarIcon: ({ color }) => (
            <TenantSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <SearchSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="bills"
        component={Bills}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="tenant"
        component={Tenant}
        options={{ tabBarButton: () => (null) }}
      />
    </Navigator>
  )
}