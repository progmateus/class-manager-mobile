import { MenuItem } from "@components/MenuItem"
import { PageHeader } from "@components/PageHeader"
import { ScrollContainer } from "@components/ScrollContainer"
import { SubscriptionItem } from "@components/subscriptionItem"
import { Viewcontainer } from "@components/ViewContainer"
import { transformInvoiceStatus } from "@utils/TransformInvoiceStatus"
import { transformSubscriptionStatus } from "@utils/TransformSubscriptionStatus"
import { Center, HStack, Icon, Image, Link, Text, View, VStack } from "native-base"
import { GraduationCap, ArrowRight, IdentificationBadge, LinkSimple, Clock, Info, IdentificationCard, ArrowsLeftRight, CurrencyDollar, BookBookmark, MapPin, Phone, Article, Command, CurrencyCircleDollar, Target, Check, CheckCircle, LockKey, Money } from "phosphor-react-native"
import { TouchableOpacity } from "react-native"

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