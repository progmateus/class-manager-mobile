import { GenericItem } from "@components/GenericItem"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { ITenantPlanDTO } from "@dtos/ITenantPlanDTO"
import { View, VStack } from "native-base"
import { Barbell, BookBookmark, Coin, GraduationCap, IdentificationBadge, Plus } from "phosphor-react-native"

export function TenantPlansList() {
  const plans: ITenantPlanDTO[] = []

  const handleClickPlus = () => {

  }
  return (
    <View flex={1}>
      <PageHeader title="Planos" rightIcon={Plus} rightAction={handleClickPlus} />
      <Viewcontainer>
        <VStack space={8}>
          {
            plans && plans.length && (
              plans.map((plan: ITenantPlanDTO) => {
                return (
                  <GenericItem.Root>
                    <GenericItem.Icon icon={BookBookmark} />
                    <GenericItem.Content title={plan.name} caption={plan.description} />
                    <GenericItem.InfoSection>
                      <GenericItem.InfoContainer >
                        <Barbell size={18} color="#6b7280" />
                        <GenericItem.InfoValue text="7" />
                      </GenericItem.InfoContainer>
                      <GenericItem.InfoContainer >
                        <Coin size={18} color="#6b7280" />
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