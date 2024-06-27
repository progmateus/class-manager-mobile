import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SignIn } from "@screens/Guest/SignIn";
import { SignUp } from "@screens/Guest/SignUp";

type GuestRoutes = {
  signIn: undefined;
  signUp: undefined;
}

export type GuestNavigatorRoutesProps = NativeStackNavigationProp<GuestRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<GuestRoutes>();

export function GuestRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="signIn"
        component={SignIn}
      />

      <Screen
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  )
}