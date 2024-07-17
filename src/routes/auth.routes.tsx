import { Platform } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { Profile } from "@screens/Auth/User/UserProfile";
import { Search } from "@screens/Auth/Search";
import { useTheme } from "native-base";
import TenantSVG from "@assets/tenant.svg"
import SearchSVG from "@assets/search.svg"
import CalendarSVG from "@assets/calendar.svg"
import ProfileSVG from "@assets/profile.svg"
import { Bills } from "@screens/Auth/Bills";
import { Tenant } from "@screens/Auth/Tenants/TenantProfile";
import { Classes } from "@screens/Auth/Classes/Classes";
import { ClassDayInfo } from "@screens/Auth/Classes/ClassDayInfo";
import { UpdateClassDayStatus } from "@screens/Auth/Classes/UpdateClassDayStatus";
import { UpdateUser } from "@screens/Auth/User/UpdateUser";


type AuthRoutes = {
  tenants: undefined;
  search: undefined;
  profile: undefined;
  bills: undefined;
  tenant: undefined;
  classes: undefined;
  classDayInfo: undefined;
  updateClassDayStatus: undefined;
  updateUser: undefined;
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
        component={ClassDayInfo}
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
        name="classes"
        component={Classes}
        options={{
          tabBarIcon: ({ color }) => (
            <CalendarSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      >

      </Screen>

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

      <Screen
        name="classDayInfo"
        component={ClassDayInfo}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="updateClassDayStatus"
        component={UpdateClassDayStatus}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="updateUser"
        component={UpdateUser}
        options={{ tabBarButton: () => (null) }}
      />
    </Navigator>
  )
}