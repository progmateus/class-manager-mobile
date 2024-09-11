import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from 'src/components/Loading';
import { THEME } from 'src/theme';
import { Routes } from '@routes/index';
import { AuthContextProvider } from 'src/contexts/AuthContext';
import { TenantContextProvider } from 'src/contexts/TenantContext';


export default function App() {
  const [fotnsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar backgroundColor='transparent' translucent />
      <AuthContextProvider>
        <TenantContextProvider>
          {fotnsLoaded ? <Routes /> : <Loading />}
        </TenantContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider >
  );
}