import { PageHeader } from "@components/PageHeader";
import { Button, Center, Divider, HStack, Heading, Icon, Text, VStack, View } from "native-base";
import { Check } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ListAppPlansService } from "src/services/appServices";
import { useQueryClient } from "@tanstack/react-query";


export function CreateTenantSubscription() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubimiting, setIsSubmiting] = useState(false)
  const [plans, setPlans] = useState<any[]>([])

  const queryClient = useQueryClient();


  useFocusEffect(useCallback(() => {
    ListAppPlansService().then(({ data }) => {
      setPlans(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, []))

  const handleCreateSubscription = (planId: string) => {
    if (isSubimiting) return

    console.log('criando...')
  }

  const priceFormatted = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  return (
    <View flex={1}>
      <PageHeader title="Selecione o plano" />
      <ScrollContainer>
        {
          plans && plans.length ? (
            <VStack space={8}>
              {
                plans.map((plan) => {
                  return (
                    <VStack key={plan.id} borderWidth={0.4} borderColor="coolGray.700" py={6} px={4} rounded="lg">
                      <View>
                        <Heading textAlign="center" color="brand.800"> {plan.name}</Heading>
                        <Divider my={4} />
                        <VStack space={4}>
                          <Text> {plan.description}</Text>
                          <HStack>
                            <Icon as={Check} color="green.500" />
                            <Text> Cobranças automáticas</Text>
                          </HStack>

                          <HStack>
                            <Icon as={Check} color="green.500" />
                            <Text> Cobranças automáticas</Text>
                          </HStack>

                          <HStack>
                            <Icon as={Check} color="green.500" />
                            <Text> Limite de {plan.studentsLimit} alunos </Text>
                          </HStack>

                          <HStack>
                            <Icon as={Check} color="green.500" />
                            <Text> Limite de {plan.classesLimit} turmas </Text>
                          </HStack>
                        </VStack>
                      </View>
                      <Heading fontSize="xl" textAlign="center" my={8} color="brand.800">  {priceFormatted(plan.price)}/mês</Heading>
                      <View alignItems="center" justifyContent="center">
                        <Button w="48" bgColor="brand.500" rounded="lg" isLoading={isSubimiting} onPress={() => handleCreateSubscription(plan.id)}>Escolher plano</Button>
                      </View>
                    </VStack>
                  )
                })
              }
            </VStack>
          ) : (
            <Center>
              <Text> Nenhum plano encontrado</Text>
            </Center>
          )
        }
      </ScrollContainer>
    </View >
  )
}