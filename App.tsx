import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from 'src/components/Loading';
import { THEME } from 'src/theme';
import { SignIn } from '@screens/Guest/SignIn';
import { signUp } from '@screens/Guest/SignUp';


export default function App() {
  const [fotnsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <NativeBaseProvider theme={THEME}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar backgroundColor='transparent' translucent />
        {fotnsLoaded ? <SignIn /> : <Loading />}
      </View>
    </NativeBaseProvider >
  );
}