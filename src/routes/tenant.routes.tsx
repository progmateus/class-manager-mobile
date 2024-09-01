import { Platform, TouchableOpacity } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { SubscriptionsList } from "@screens/TenantRoutes/Subscriptions/list/SubscriptionsList";
import { ClassesList } from "@screens/TenantRoutes/Classes/list/ClassesList";
import { Dashboard } from "@screens/TenantRoutes/Dashboard";
import { BookBookmark, GraduationCap, House } from "phosphor-react-native";
import { StudentInfo } from "@screens/TenantRoutes/Students/[id]/StudentInfo";
import { ClassHoursList } from "@screens/TenantRoutes/classHours/list/ClassHoursList";
import { TenantPlansList } from "@screens/TenantRoutes/plans/TenantPlansList";
import { CreateTenantPlan } from "@screens/TenantRoutes/plans/CreateTenantPlan";
import { CreateClass } from "@screens/TenantRoutes/Classes/CreateClass";
import { ClassProfile } from "@screens/TenantRoutes/Classes/[id]/ClassProfile";
import { StudentsClassList } from "@screens/TenantRoutes/Students/StudentsClassList";
import { TeachersClassList } from "@screens/TenantRoutes/Teachers/TeachersClassList";
import { AddUserToClass } from "@screens/TenantRoutes/Classes/AddUserToClass";
import { UsersRoloesList } from "@screens/TenantRoutes/Roles/ListUsersRoles";


export type TenantRoutes = {
  studentInfo: undefined;
  students: undefined;
  classes: { tenantId: string; };
  classProfile: { classId: string, tenantId: string };
  dashboard: undefined;
  classHoursList: undefined;
  tenantPlansList: { tenantId: string; }
  createTenantPlan: { tenantId: string; }
  createClass: { tenantId: string; }
  listStudentsClass: { tenantId: string; classId: string; }
  listTeachersClass: { tenantId: string; classId: string; }
  addUserToClass: { tenantId: string; classId: string; roleName: string; }
  usersRolesList: { tenantId: string; roleName: string; }
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
        name="classes"
        component={ClassesList}
        options={{
          tabBarIcon: ({ color }) => (
            <BookBookmark color={color} size={iconSize} />
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
        name="classProfile"
        component={ClassProfile}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="classHoursList"
        component={ClassHoursList}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="tenantPlansList"
        component={TenantPlansList}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="createTenantPlan"
        component={CreateTenantPlan}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="createClass"
        component={CreateClass}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="listStudentsClass"
        component={StudentsClassList}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="listTeachersClass"
        component={TeachersClassList}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="addUserToClass"
        component={AddUserToClass}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="usersRolesList"
        component={UsersRoloesList}
        options={{
          tabBarButton: () => (null)
        }}
      />
    </Navigator>
  )
}