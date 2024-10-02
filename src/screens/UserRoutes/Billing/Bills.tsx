import { BillItem } from "@components/Items/BillItem";
import { PageHeader } from "@components/PageHeader";
import { Viewcontainer } from "@components/ViewContainer";
import { FlatList, Text, View } from "native-base";

export function Bills() {
  const bills = [
    { id: "1", status: 0, price: 199.99, expiresDate: "JUL, (10/07/2024)" },
    { id: "2", status: 1, price: 199.99, expiresDate: "JUN, (10/06/2024)" },
    { id: "3", status: 2, price: 199.99, expiresDate: "MAI, (10/05/2024)" },
    { id: "4", status: 2, price: 199.99, expiresDate: "ABR, (10/04/2024)" },
    { id: "5", status: 2, price: 199.99, expiresDate: "MAR, (10/03/2024)" }
  ]
  return (
    <View flex={1}>
      <PageHeader title="Cobranças" />
      <Viewcontainer>
        <FlatList
          data={bills}
          pb={20}
          keyExtractor={bill => bill.id}
          renderItem={({ item }) => (
            <BillItem bill={item} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
        >
        </FlatList>
      </Viewcontainer>
    </View>
  )
}