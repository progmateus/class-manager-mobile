import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SignIn } from "@screens/GuestRoutes/SignIn";
import { SignUp } from "@screens/GuestRoutes/SignUp";

type GuestRoutes = {
  signIn: undefined;
  signUp: undefined;
}

export type GuestNavigatorRoutesProps = NativeStackNavigationProp<GuestRoutes>;


export function GuestRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator<GuestRoutes>();

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