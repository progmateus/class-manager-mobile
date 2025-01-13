import { Platform, TouchableOpacity } from "react-native"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { SubscriptionsList } from "@screens/TenantRoutes/Subscriptions/list/SubscriptionsList";
import { ClassesList } from "@screens/TenantRoutes/Classes/CRUD/ClassesList";
import { Dashboard } from "@screens/TenantRoutes/Dashboard";
import { BookBookmark, Buildings, Calendar, GraduationCap, House, Receipt, UserCircle } from "phosphor-react-native";
import { TenantPlansList } from "@screens/TenantRoutes/plans/TenantPlansList";
import { CreateTenantPlan } from "@screens/TenantRoutes/plans/CreateTenantPlan";
import { CreateClass } from "@screens/TenantRoutes/Classes/CRUD/CreateClass";
import { ClassProfile } from "@screens/TenantRoutes/Classes/CRUD/[id]/ClassProfile";
import { StudentsClassList } from "@screens/TenantRoutes/Classes/students/StudentsClassList";
import { TeachersClassList } from "@screens/TenantRoutes/Classes/teachers/TeachersClassList";
import { AddUserToClass } from "@screens/TenantRoutes/Classes/AddUserToClass";
import { TeachersList } from "@screens/TenantRoutes/Roles/TeachersList";
import { CreateUserRole } from "@screens/TenantRoutes/Roles/CreateUserRole";
import { UpdateStudentClass } from "@screens/TenantRoutes/Classes/students/UpdateStudentClass";
import { BookingsHistory } from "@screens/UserRoutes/Bookings/BookingsHistory";
import { UpdateSubscriptionPlan } from "@screens/TenantRoutes/plans/UpdateSubscriptionPlan";
import { TenantProfile } from "@screens/Shared/Tenants/[id]/TenantProfile";
import { UpdateTenant } from "@screens/TenantRoutes/Profile/UpdateTenant";
import { UpdateTimeTable } from "@screens/TenantRoutes/TimesTables/[id]/UpdateTimeTable";
import { TimesTablesList } from "@screens/TenantRoutes/TimesTables/list/TimesTablesList";
import { CreateTimeTable } from "@screens/TenantRoutes/TimesTables/CreateTimeTable";
import { CreateSubscription } from "@screens/TenantRoutes/Subscriptions/CreateSubscription";
import { UpdateClassTimeTable } from "@screens/TenantRoutes/Classes/CRUD/[id]/UpdateClassTimeTable";
import { CreateClassDay } from "@screens/TenantRoutes/ClassesDays/CreateClassDay";
import { ClassesDaysList } from "@screens/UserRoutes/ClassesDays/ClassesDaysList";
import { ClassDayProfile } from "@screens/UserRoutes/ClassesDays/[id]/ClassDayProfile";
import { UpdateClassDayStatus } from "@screens/UserRoutes/ClassesDays/[id]/UpdateClassDayStatus";
import { useAuth } from "@hooks/useAuth";
import { CreateAddress } from "@screens/TenantRoutes/Addresses/CRUD/CreateAddress";
import { AddressesList } from "@screens/TenantRoutes/Addresses/CRUD/AddressesList";
import { UpdateClassAddress } from "@screens/TenantRoutes/Classes/CRUD/[id]/UpdateClassAddress";
import { InvoicesList } from "@screens/Shared/Invoices/InvoicesList";
import { SubscriptionProfile } from "@screens/Shared/Subscriptions/[id]/SubscriptionProfile";
import { TransferClassStudents } from "@screens/TenantRoutes/Classes/CRUD/[id]/TransferClassStudents";
import { UpdateTenantPlan } from "@screens/TenantRoutes/plans/[id]/UpdateTenantPlan";
import { UpdateClassData } from "@screens/TenantRoutes/Classes/CRUD/[id]/UpdateClassData";


export type TenantRoutes = {
  subscriptionProfile: { tenantIdParams?: string, subscriptionId: string };
  createSubscription: { userId?: string },
  students: undefined;
  classes: undefined;
  classProfile: { classId: string, tenantIdParams: string };
  createClass: undefined;
  listStudentsClass: { tenantIdParams: string; classId: string; }
  listTeachersClass: { tenantIdParams: string; classId: string; }
  addUserToClass: { classId: string; roleName: string; }
  tenantProfile: { tenantIdParams?: string };
  dashboard: undefined;
  timeTable: { timeTableId: string };
  timesTablesList: undefined;
  tenantPlansList: undefined;
  createTimeTable: undefined;
  createTenantPlan: undefined;
  updateTenantPlan: { tenantPlanId: string }
  updateClassTimeTable: { classId: string; timeTableIdExists?: string; };
  transferClassStudents: { classId: string; };
  updateClassAddress: { classId: string; addressIdExists?: string; };
  updateStudentclass: { tenantIdParams: string; userId: string; subscriptionId?: string; }
  updateClassData: { classId: string; }
  teachersList: { roleName: string; }
  createUserRole: undefined;
  bookingsHistory: { tenantIdParams?: string; userId?: string; };
  updateSubscriptionPlan: { tenantIdParams: string; planIdExists: string; subscriptionId?: string; }
  updateTenant: undefined;
  createClassDay: undefined;
  classesDaysList: undefined;
  classDayProfile: { tenantIdParams: string, classDayId: string };
  updateClassDayStatus: { tenantIdParams: string, classDayId: string };
  addressesList: undefined;
  createAddress: undefined;
  invoicesList: { tenantIdParams?: string; subscriptionId?: string, userId?: string; };
}
export type TenantNavigatorRoutesProps = BottomTabNavigationProp<TenantRoutes>;

export function TenantRoutes() {
  const { sizes, colors } = useTheme();
  const { Navigator, Screen } = createBottomTabNavigator<TenantRoutes>();
  const { tenant } = useAuth();

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
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="classesDaysList"
        component={ClassesDaysList}
        options={{
          tabBarIcon: ({ color }) => (
            <Calendar color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="invoicesList"
        initialParams={{}}
        component={InvoicesList}
        options={{
          tabBarIcon: ({ color }) => (
            <Receipt color={color} size={iconSize} />
          )
        }}
      />


      <Screen
        name="tenantProfile"
        component={TenantProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Buildings color={color} size={iconSize} />
          )
        }}
      />

      <Screen
        name="students"
        component={SubscriptionsList}
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
        name="updateClassData"
        component={UpdateClassData}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="timeTable"
        component={UpdateTimeTable}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="timesTablesList"
        component={TimesTablesList}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="createTimeTable"
        component={CreateTimeTable}
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
        name="updateTenantPlan"
        component={UpdateTenantPlan}
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
        name="teachersList"
        component={TeachersList}
        options={{
          tabBarButton: () => (null)
        }}
      />

      <Screen
        name="createUserRole"
        component={CreateUserRole}
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
        name="bookingsHistory"
        component={BookingsHistory}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="updateSubscriptionPlan"
        component={UpdateSubscriptionPlan}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="subscriptionProfile"
        component={SubscriptionProfile}
        options={{ tabBarButton: () => (null) }}
      />


      <Screen
        name="createSubscription"
        component={CreateSubscription}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="updateTenant"
        component={UpdateTenant}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="updateClassTimeTable"
        component={UpdateClassTimeTable}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="createClassDay"
        component={CreateClassDay}
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
        name="classes"
        component={ClassesList}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="addressesList"
        component={AddressesList}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="createAddress"
        component={CreateAddress}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="updateClassAddress"
        component={UpdateClassAddress}
        options={{ tabBarButton: () => (null) }}
      />

      <Screen
        name="transferClassStudents"
        initialParams={{}}
        component={TransferClassStudents}
        options={{ tabBarButton: () => (null) }}
      />
    </Navigator>
  )
}