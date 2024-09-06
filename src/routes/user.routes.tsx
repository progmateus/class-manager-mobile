import { Platform } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Bills } from "@screens/UserRoutes/Billing/Bills";
import { TenantProfile } from "@screens/UserRoutes/Tenants/[id]/TenantProfile";
import { ClassDayInfo } from "@screens/UserRoutes/ClassesDays/[id]/ClassDayInfo";
import { UpdateClassDayStatus } from "@screens/UserRoutes/ClassesDays/[id]/UpdateClassDayStatus";
import { UpdateUser } from "@screens/UserRoutes/User/[id]/UpdateUser";
import { Calendar, CurrencyDollar, MagnifyingGlass, UserCircle } from "phosphor-react-native";
import { Profile } from "@screens/UserRoutes/User/profile/UserProfile";
import { UpdatePassword } from "@screens/UserRoutes/User/[id]/UpdatePassword";
import { TenantsList } from "@screens/UserRoutes/Tenants/list/TenantsList";
import { ClassesDaysList } from "@screens/UserRoutes/ClassesDays/ClassesDaysList";
import { CreateClassDay } from "@screens/UserRoutes/ClassesDays/CreateClassDay";
import { CreateSubscription } from "@screens/UserRoutes/Subscriptions/CreateSubscription";
import { BookingsHistory } from "@screens/UserRoutes/Bookings/BookingsHistory";


type UserRoutes = {
  tenantsList: undefined;
  profile: undefined;
  bills: undefined;
  tenantProfile: { tenantId: string };
  classesDays: undefined;
  classDayInfo: { tenantId: string, classDayId: string };
  updateClassDayStatus: { tenantId: string, classDayId: string };
  updateUser: undefined;
  updatePassword: undefined;
  createClassDay: { tenantId?: string };
  createSubscription: { tenantId?: string };
  bookingsHistory: { tenantId?: string; userId?: string; };
}
export type UserNavigatorRoutesProps = BottomTabNavigationProp<UserRoutes>;

export function UserRoutes() {
  const { sizes, colors } = useTheme();
  const { Navigator, Screen } = createBottomTabNavigator<UserRoutes>();

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
        name="tenantsList"
        component={TenantsList}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color={color} size={iconSize} />
          )
        }}
      />


      <Screen
        name="classesDays"
        component={ClassesDaysList}
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
        name="tenantProfile"
        component={TenantProfile}
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

      <Screen
        name="createClassDay"
        component={CreateClassDay}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="createSubscription"
        component={CreateSubscription}
        options={{ tabBarButton: () => (null) }}
      />


      <Screen
        name="bookingsHistory"
        component={BookingsHistory}
        options={{ tabBarButton: () => (null) }}
      />
    </Navigator>
  )
}