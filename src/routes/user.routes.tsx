import { Platform } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Bills } from "@screens/UserRoutes/Billing/Bills";
import { Tenant } from "@screens/UserRoutes/Tenants/[id]/TenantProfile";
import { Classes } from "@screens/UserRoutes/Classes/list/Classes";
import { ClassDayInfo } from "@screens/UserRoutes/Classes/[id]/ClassDayInfo";
import { UpdateClassDayStatus } from "@screens/UserRoutes/Classes/[id]/UpdateClassDayStatus";
import { UpdateUser } from "@screens/UserRoutes/User/[id]/UpdateUser";
import { Buildings, Calendar, CurrencyDollar, MagnifyingGlass, UserCircle } from "phosphor-react-native";
import { Profile } from "@screens/UserRoutes/User/profile/UserProfile";
import { UpdatePassword } from "@screens/UserRoutes/User/[id]/UpdatePassword";
import { TenantsList } from "@screens/UserRoutes/Tenants/list/TenantsList";


type UserRoutes = {
  tenants: undefined;
  search: undefined;
  profile: undefined;
  bills: undefined;
  tenant: undefined;
  classes: undefined;
  classDayInfo: undefined;
  updateClassDayStatus: undefined;
  updateUser: undefined;
  updatePassword: undefined;
}
export type UserNavigatorRoutesProps = BottomTabNavigationProp<UserRoutes>;

export function UserRoutes() {
  const { sizes, colors } = useTheme();
  const { Navigator, Screen, Group } = createBottomTabNavigator<UserRoutes>();

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
            <Buildings color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="search"
        component={TenantsList}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color={color} size={iconSize} />
          )
        }}
      />


      <Screen
        name="classes"
        component={Classes}
        options={{
          tabBarIcon: ({ color }) => (
            <Calendar color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="bills"
        component={Bills}
        options={{
          tabBarIcon: ({ color }) => (
            <CurrencyDollar color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <UserCircle color={color} size={iconSize} />
          )
        }}
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

      <Screen
        name="updatePassword"
        component={UpdatePassword}
        options={{ tabBarButton: () => (null) }}
      />
    </Navigator>
  )
}