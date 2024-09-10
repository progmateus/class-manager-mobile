import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Divider, HStack, Heading, Icon, Image, Text, TextArea, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CaretLeft, CaretRight, Check, Plus, PlusCircle } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";
import { useCallback, useState } from "react";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { CreateTenantservice } from "src/services/tenantsService";
import { GetUserByUsernameService } from "src/services/usersService";
import { isValidCPF } from "@utils/isValidCPF";
import { useFocusEffect } from "@react-navigation/native";
import { ListAppPlansService } from "src/services/appServices";
import { VerifyUsernameService } from "src/services/usernameService";

const cpfRegex = /(^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$)/
const documentRegex = /(^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$)|(^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$)/gi
const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm

const createTenantSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  document: z.string({ required_error: "Campo obrigatório", }).regex(documentRegex, "Documento inválido").trim(),
  username: z.string().regex(usernameRegex, "Nome de usuário inválido").trim(),
  description: z.string().optional()
});

type CreateTenantProps = z.infer<typeof createTenantSchema>

export function CreateTenant() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubimiting, setIsSubmiting] = useState(false)
  const [tab, setTab] = useState(0)
  const [plans, setPlans] = useState<any[]>([])

  const { control, handleSubmit, formState: { errors }, getValues, setError, trigger, getFieldState } = useForm<CreateTenantProps>({
    resolver: zodResolver(createTenantSchema)
  });

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    ListAppPlansService().then(({ data }) => {
      setPlans(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, []))

  const handleCreate = ({ name, document, username }: CreateTenantProps) => {
    if (isSubimiting) return
    setIsSubmiting(true)
    CreateTenantservice({ name, document, username }).then(() => {
      fireSuccesToast('Infirmações atualizadas com sucesso!')
    }).finally(() => {
      setIsSubmiting(false)
    })
  }

  const priceFormatted = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  const handleContinue = async () => {
    if (isSubimiting) return
    setIsSubmiting(true)
    if (tab === 0) {
      await trigger("username")
      const isValiUserName = getFieldState("username")
      if (isValiUserName.invalid) {
        setIsSubmiting(false)
        return
      }
      const response = await VerifyUsernameService(getValues("username"))
      const { data } = response
      if (data?.message === "ERR_USERNAME_ALREADY_EXISTS") {
        setError("username", {
          message: "Este nome de usuário já esta sendo utilizado"
        })
        setIsSubmiting(false)
        return
      }
    }
    if (tab === 1) {
      await trigger(["name", "document"])
      const nameState = getFieldState("name")
      const documentState = getFieldState("document")
      if (nameState.invalid || documentState.invalid) {
        setIsSubmiting(false)
        return
      }

      if (getValues("document").match(cpfRegex)) {
        if (!isValidCPF(getValues("document"))) {
          setError("document", {
            message: "Documeno inválido"
          })
          setIsSubmiting(false)
          return
        }
      }
    }
    setIsSubmiting(false)
    setTab(tab + 1)
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar Empresa" />
      <ScrollContainer>
        {
          tab === 0 ? (
            <VStack pb={20} flex={1}>
              <Heading fontFamily="heading" textAlign="center" fontSize="md" mb={8}> Escolha um nome de usuário </Heading>
              <Controller
                name="username"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input variant="outline" onChangeText={(e) => { onChange(e); trigger("username") }} value={value} errorMessage={errors.username?.message} />
                )}
              />
            </VStack>
          ) : tab === 1 ? (
            <VStack pb={20}>
              <Heading fontFamily="heading" textAlign="center" fontSize="md" mb={4}> Informe os dados da empresa </Heading>
              <VStack space={6} mt={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input label="Nome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
                  )}
                />

                <Controller
                  name="document"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input label="CPF / CNPJ" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.document?.message} />
                  )}
                />
              </VStack>
            </VStack>
          )
            : tab == 2 ? (
              <View>
                <Heading fontFamily="heading" textAlign="center" fontSize="md" mb={8}> Descreva a sua empresa </Heading>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextArea autoCompleteType={false} value={value} onChangeText={onChange} h={24} px={2} mb={20} fontSize="sm" variant="outline" color="coolGray.800" />
                  )}
                />
              </View>
            )

              : (
                plans && plans.length ? (
                  <VStack space={8} mb={20}>
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
                              <Button w="48" bgColor="brand.500" rounded="lg">Escolher plano</Button>
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
              )
        }
        <HStack justifyContent={tab !== 0 ? "space-between" : "flex-end"}>
          {
            tab != 0 && (
              <Button size="md" variant="ghost" onPress={() => setTab(tab - 1)} startIcon={<Icon as={CaretLeft} name="cloud-download-outline" size="sm" />}> Voltar </Button>
            )
          }

          {
            tab != 3 && (
              <Button size="md" variant="ghost" onPress={handleContinue} endIcon={<Icon as={CaretRight} name="cloud-download-outline" size="sm" />}> Continuar </Button>
            )
          }

          {
            tab == 3 && (
              <Button size="md" variant="ghost" onPress={handleSubmit(handleCreate)} endIcon={<Icon as={CaretRight} name="cloud-download-outline" size="sm" />}> Concluir </Button>
            )
          }
        </HStack>
      </ScrollContainer>
    </View >
  )
}