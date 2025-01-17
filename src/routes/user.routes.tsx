import { Platform } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { TenantProfile } from "@screens/Shared/Tenants/[id]/TenantProfile";
import { ClassDayProfile } from "@screens/UserRoutes/ClassesDays/[id]/ClassDayProfile";
import { UpdateClassDayStatus } from "@screens/UserRoutes/ClassesDays/[id]/UpdateClassDayStatus";
import { UpdateUser } from "@screens/UserRoutes/User/[id]/UpdateUser";
import { Calendar, CurrencyDollar, MagnifyingGlass, UserCircle } from "phosphor-react-native";
import { Profile } from "@screens/UserRoutes/User/profile/UserProfile";
import { UpdatePassword } from "@screens/UserRoutes/User/[id]/UpdatePassword";
import { TenantsList } from "@screens/UserRoutes/Tenants/list/TenantsList";
import { ClassesDaysList } from "@screens/UserRoutes/ClassesDays/ClassesDaysList";
import { CreateUserSubscription } from "@screens/UserRoutes/Subscriptions/CreateUserSubscription";
import { BookingsHistory } from "@screens/UserRoutes/Bookings/BookingsHistory";
import { CreateTenant } from "@screens/UserRoutes/Tenants/CreateTenant";
import { UpdateStudentClass } from "@screens/TenantRoutes/Classes/students/UpdateStudentClass";
import { UpdateUserSubscriptionPlan } from "@screens/TenantRoutes/tenantPlans/UpdateUserSubscriptionPlan";
import { UpdateUserAddress } from "@screens/UserRoutes/User/[id]/UpdateUserAddress";
import { InvoicesList } from "@screens/Shared/Invoices/InvoicesList";
import { SubscriptionProfile } from "@screens/Shared/Subscriptions/[id]/SubscriptionProfile";


type UserRoutes = {
  tenantsList: undefined;
  profile: undefined;
  invoicesList: { tenantIdParams?: string; subscriptionId?: string, userId?: string; };
  tenantProfile: { tenantIdParams: string };
  classesDays: { tenantIdParams?: string };
  classDayProfile: { tenantIdParams: string, classDayId: string };
  updateClassDayStatus: { tenantIdParams: string, classDayId: string };
  updateUser: undefined;
  updatePassword: undefined;
  createUserSubscription: { tenantIdParams: string };
  bookingsHistory: { tenantIdParams?: string; userId?: string; };
  createTenant: undefined
  subscriptionProfile: { tenantIdParams?: string, subscriptionId: string };
  updateStudentclass: { tenantIdParams: string; subscriptionId?: string; }
  updateUserSubscriptionPlan: { tenantIdParams: string; planIdExists: string; subscriptionId?: string; }
  updateUserAddress: undefined;
}
export type UserNavigatorRoutesProps = BottomTabNavigationProp<UserRoutes>;

export function UserRoutes() {
  const { sizes, colors } = useTheme();
  const { Navigator, Screen } = createBottomTabNavigator<UserRoutes>();

  const iconSize = sizes[6]
  return (
    <Navigator
      backBehavior="history"
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
        name="invoicesList"
        component={InvoicesList}
        initialParams={{}}
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
        name="classDayProfile"
        component={ClassDayProfile}
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
        name="createUserSubscription"
        component={CreateUserSubscription}
        options={{ tabBarButton: () => (null) }}
      />


      <Screen
        name="bookingsHistory"
        component={BookingsHistory}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="createTenant"
        component={CreateTenant}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="subscriptionProfile"
        component={SubscriptionProfile}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="updateStudentclass"
        component={UpdateStudentClass}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="updateUserSubscriptionPlan"
        component={UpdateUserSubscriptionPlan}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="updateUserAddress"
        component={UpdateUserAddress}
        options={{ tabBarButton: () => (null) }}
      />
    </Navigator>
  )
}