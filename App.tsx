import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from 'src/components/Loading';
import { THEME } from 'src/theme';
import { Routes } from '@routes/index';
import { AuthContextProvider } from 'src/contexts/AuthContext';
import { TenantContextProvider } from 'src/contexts/TenantContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const queryClient = new QueryClient()

export default function App() {
  const [fotnsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold, Roboto_300Light })
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar backgroundColor='transparent' translucent />
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            {fotnsLoaded ? <Routes /> : <Loading />}
          </AuthContextProvider>
        </QueryClientProvider>
      </NativeBaseProvider >
    </SafeAreaProvider>
  );
}