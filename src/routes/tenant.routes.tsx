import { Platform, TouchableOpacity } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { ClassInfo } from "@screens/TenantRoutes/Classes/ClassInfo";
import { StudentInfo } from "@screens/TenantRoutes/Students/StudentInfo";
import { SubscriptionsList } from "@screens/TenantRoutes/Subscriptions/SubscriptionsList";
import { ClassesList } from "@screens/TenantRoutes/Classes/ClassesList";
import { Dashboard } from "@screens/TenantRoutes/Dashboard";
import { BookBookmark, GraduationCap, House } from "phosphor-react-native";


type TenantRoutes = {
  studentInfo: undefined;
  students: undefined;
  classes: undefined;
  classInfo: undefined;
  dashboard: undefined;
}
export type TenantNavigatorRoutesProps = BottomTabNavigationProp<TenantRoutes>;

export function TenantRoutes() {
  const { sizes, colors } = useTheme();
  const { Navigator, Screen } = createBottomTabNavigator<TenantRoutes>();

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
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="students"
        component={SubscriptionsList}
        options={{
          tabBarIcon: ({ color }) => (
            <GraduationCap color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="studentInfo"
        component={StudentInfo}
        options={{
          tabBarButton: () => (null)
        }}
      />
      <Screen
        name="classInfo"
        component={ClassInfo}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="classes"
        component={ClassesList}
        options={{
          tabBarIcon: ({ color }) => (
            <BookBookmark color={color} size={iconSize} />
          )
        }}
      />
    </Navigator>
  )
}