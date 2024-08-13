import { HomeHeader } from "@components/HomeHeader";
import { TenantItem } from "@components/TenantItem";
import { FlatList, ScrollView, View } from "native-base";

export function Tenants() {
  const items = [
    {
      id: '1',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      username: "voleiparalelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '2',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }
  ]
  return (
    <View flex={1}>
      <HomeHeader />
    </View>
  );
}