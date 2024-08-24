import { GenericItem } from "@components/GenericItem"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { View, VStack } from "native-base"
import { BookBookmark, GraduationCap, IdentificationBadge } from "phosphor-react-native"

type RouteParamsProps = {
  tenantId?: string;
}
export function ClassesList() {
  const route = useRoute()
  const { tenantId } = route.params as RouteParamsProps;
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const classes = [
    {
      name: "Turma avançada",
      businnesHour: "Seg, Ter, Qua"
    }
  ]
  return (
    <View flex={1}>
      <PageHeader title="Turmas" />
      <Viewcontainer>
        <VStack space={8}>
          {
            classes && classes.length && (
              classes.map((classInfo) => {
                return (
                  <GenericItem.Root>
                    <GenericItem.Icon icon={BookBookmark} />
                    <GenericItem.Content title={classInfo.name} caption={classInfo.businnesHour} />
                    <GenericItem.InfoSection>
                      <GenericItem.InfoContainer >
                        <IdentificationBadge size={18} color="#6b7280" />
                        <GenericItem.InfoValue text="7" />
                      </GenericItem.InfoContainer>
                      <GenericItem.InfoContainer >
                        <GraduationCap size={18} color="#6b7280" />
                        <GenericItem.InfoValue text="128" />
                      </GenericItem.InfoContainer>
                    </GenericItem.InfoSection>
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