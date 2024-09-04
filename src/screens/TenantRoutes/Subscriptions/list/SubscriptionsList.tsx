import { PageHeader } from "@components/PageHeader"
import { SubscriptionItem } from "@components/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { View, VStack } from "native-base"

export function SubscriptionsList() {
  const students = [
    {
      user: {
        name: "Jane Doe",
        username: "@johndoe",
        document: "759.785.860-47",
        phone: "(21) 94002-8922",
        avatar: "https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-bonita-em-pe-na-parede-cinza_231208-10760.jpg?ga=GA1.1.1603704743.1686338071&semt=sph",
        address: {
          street: "Estrada da bica",
          number: "241"
        },
      },
      classes: [{ name: "Intermediário" }],
      subscriptions: [
        {
          plan: {
            name: "Básico"
          },
          status: 1,
          invoices: [
            {
              status: 1
            }
          ],
          createdAt: '12/04/2024'
        }
      ]
    }
  ]
  return (
    <View flex={1}>
      <PageHeader title="Alunos" />
      <Viewcontainer>
        <VStack space={8}>
          {
            students && students.length && (
              students.map((student, index) => {
                return (
                  <SubscriptionItem key={index} subscription={student} />
                )
              })
            )
          }
        </VStack>
      </Viewcontainer>
    </View>

  )
}