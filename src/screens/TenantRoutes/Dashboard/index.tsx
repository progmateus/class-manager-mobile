import { HomeHeader } from "@components/HomeHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { DashboardOption } from "@components/tenant/dashboardOption";
import { Viewcontainer } from "@components/ViewContainer";
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { SimpleGrid, View } from "native-base";
import { BookBookmark, Clock, GraduationCap, IdentificationBadge, Receipt, SimCard } from "phosphor-react-native";

export function Dashboard() {
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const size = 18
  const color = "white"

  return (
    <View flex={1}>
      <HomeHeader />
      <Viewcontainer>
        <SimpleGrid columns={2} spacingX={4} spacingY={2} flex={1} pl={3}>
          <DashboardOption text="Alunos" icon={<GraduationCap size={size} color={color} />} onPress={() => navigation.navigate('students')} />
          <DashboardOption text="Turmas" icon={<BookBookmark size={size} color={color} />} onPress={() => navigation.navigate('classes')} />
          <DashboardOption text="Professores" icon={<IdentificationBadge size={size} color={color} />} onPress={() => navigation.navigate('students')} />
          <DashboardOption text="Inscrições" icon={<Receipt size={size} color={color} />} onPress={() => navigation.navigate('studentInfo')} />
          <DashboardOption text="Planos" icon={<SimCard size={size} color={color} />} onPress={() => navigation.navigate('students')} />
          <DashboardOption text="Jornadas" icon={<Clock size={size} color={color} />} onPress={() => navigation.navigate('classHoursList')} />
        </SimpleGrid>
      </Viewcontainer>
    </View >
  )
}