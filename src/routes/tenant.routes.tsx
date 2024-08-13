import { Platform } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import HomeSVG from "@assets/home-outline.svg"
import { ClassDayInfo } from "@screens/UserRoutes/Classes/ClassDayInfo";
import { ClassInfo } from "@screens/TenantRoutes/Classes/ClassInfo";
import { StudentInfo } from "@screens/TenantRoutes/Students/StudentInfo";
import { SubscriptionsList } from "@screens/TenantRoutes/Subscriptions/SubscriptionsList";
import { ClassesList } from "@screens/TenantRoutes/Classes/ClassesList";


type TenantRoutes = {
  home: undefined;
  studentInfo: undefined;
  students: undefined;
  classes: undefined;
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
        name="students"
        component={SubscriptionsList}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="studentInfo"
        component={StudentInfo}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen
        name="home"
        component={ClassInfo}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="classes"
        component={ClassesList}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
    </Navigator>
  )
}