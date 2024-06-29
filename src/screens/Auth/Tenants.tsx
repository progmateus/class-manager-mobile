import { TenantItem } from "@components/TenantItem";
import { FlatList, ScrollView } from "native-base";

export function Tenants() {
  const items = [
    {
      id: '1',
      image: "https://wallpaperaccess.com/full/317501.jpg",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: []
    },
    {
      id: '2',
      image: "https://wallpaperaccess.com/full/317501.jpg",
      name: "Vôlei Resenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: []
    }
  ]
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <FlatList
        flex={1}
        pt={50}
        px={4}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TenantItem image={item.image} name={item.name} description={item.description} categories={item.categories} />
        )}>
      </FlatList>
    </ScrollView>
  );
}