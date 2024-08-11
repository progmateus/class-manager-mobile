import { GenericItem } from "@components/GenericItem"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { View, VStack } from "native-base"
import { BookBookmark } from "phosphor-react-native"

export function ClassesList() {
  const classes = [
    {
      name: "opa",
      businnesHour: "Seg, Ter, Qua"
    }
  ]
  return (
    <View flex={1}>
      <PageHeader title="Alunos" />
      <Viewcontainer>
        <VStack space={8}>
          {
            classes && classes.length && (
              classes.map((classInfo) => {
                return (
                  <GenericItem.Root>
                    <GenericItem.Icon icon={BookBookmark} />
                    <GenericItem.Content title={classInfo.name} caption={classInfo.businnesHour} />
                  </GenericItem.Root>
                )
              })
            )
          }
        </VStack>
      </Viewcontainer>
    </View>
  )
}