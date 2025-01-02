import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Divider, HStack, Heading, Icon, Text, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CaretLeft, CaretRight, Check } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";
import { useCallback, useState } from "react";
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { CreateTenantservice } from "src/services/tenantsService";
import { isValidCPF } from "@utils/isValidCPF";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ListAppPlansService } from "src/services/appServices";
import { VerifyUsernameService } from "src/services/usernameService";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useAuth } from "@hooks/useAuth";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";
import { useQueryClient } from "@tanstack/react-query";
import { TextArea } from "@components/form/TextArea";

const documentRegex = /([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})/igm
const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const createTenantSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  number: z.string({ required_error: "Campo obrigatório", }).regex(phoneRegex, "Telefone inválido").trim(),
  email: z.string({ required_error: "Campo obrigatório", }).email().trim(),
  document: z.string({ required_error: "Campo obrigatório", }).regex(documentRegex, "Documento inválido").trim(),
  username: z.string({ required_error: "Campo obrigatório", }).regex(usernameRegex, "Nome de usuário inválido").trim(),
  description: z.string().optional()
});

type CreateTenantProps = z.infer<typeof createTenantSchema>

export function CreateTenant() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubimiting, setIsSubmiting] = useState(false)
  const [percentage, setPercentage] = useState("25")
  const [tab, setTab] = useState("")
  const [plans, setPlans] = useState<any[]>([])

  const { user, userUpdate } = useAuth()

  const queryClient = useQueryClient();


  const navigation = useNavigation<UserNavigatorRoutesProps>();
  const { control, formState: { errors }, getValues, setError, trigger, getFieldState, reset } = useForm<CreateTenantProps>({
    resolver: zodResolver(createTenantSchema)
  });

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    setTab("username")
    reset()
    ListAppPlansService().then(({ data }) => {
      setPlans(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, []))

  const handleCreate = (planId: string) => {
    if (isSubimiting) return

    setIsSubmiting(true)
    CreateTenantservice({
      name: getValues('name'),
      document: getValues('document'),
      username: getValues('username'),
      email: getValues('email'),
      number: getValues('number'),
      description: getValues('description'),
      planId
    }).then(({ data }) => {
      fireSuccesToast('Empresa criada com sucesso!')

      const responseRoles = data.data.usersRoles

      const userRoles = user.usersRoles ?? []

      const newUserRole = {
        ...responseRoles[0],
        tenant: data.data,
        user: user,
        role: responseRoles[0].role
      }

      const userUpdated = {
        ...user,
        usersRoles: [
          ...userRoles,
          newUserRole
        ]
      } as IUserProfileDTO

      userUpdate(userUpdated)

      queryClient.invalidateQueries({
        queryKey: ['get-tenants']
      })

      navigation.navigate('tenantProfile', { tenantIdParams: data.data.id })
    }).catch((err) => {
      console.log('err: ', err)
      const { errors } = err;
      if (errors && errors.length) {
        checkErrors(errors)
      } else {
        fireErrorToast('Ocorreu um erro')
      }
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

  const verifyDataTab = async () => {
    await trigger(["name", "document", "email", "number"])
    const nameState = getFieldState("name")
    const documentState = getFieldState("document")
    const emailState = getFieldState("document")
    const phoneState = getFieldState("document")
    if (nameState.invalid || documentState.invalid || emailState.invalid || phoneState.invalid) {
      return false
    }

    if (getValues("document").match(documentRegex)) {
      if (!isValidCPF(getValues("document")) && !isValidCNPJ(getValues("document"))) {
        setError("document", {
          message: "Documeno inválido"
        })
        return false
      }
    }
    return true
  }

  const verifyUsernameTab = async () => {
    await trigger("username")
    const isValiUserName = getFieldState("username")
    if (isValiUserName.invalid) {
      return false
    }
    const response = await VerifyUsernameService(getValues("username"))
    const { data } = response
    if (data?.message === "ERR_USERNAME_ALREADY_EXISTS") {
      setError("username", {
        message: "Este nome de usuário já esta sendo utilizado"
      })
      return false
    }
    return true
  }

  const handleContinue = async () => {
    if (isSubimiting) return
    setIsSubmiting(true)
    if (tab === "username") {
      if (!await verifyUsernameTab()) {
        setIsSubmiting(false)
        return
      }
    }
    if (tab === "data") {
      if (! await verifyDataTab()) {
        setIsSubmiting(false)
        return
      }
    }
    setIsSubmiting(false)
    handleNextTab()
  }

  const checkErrors = (errors: any[]) => {
    if (errors.find((e) => e.property == "Document.Number")) {
      setError("document", {
        message: "Documeno inválido"
      })
      setTab("data")
    }

    if (errors.find((e) => e.message == "Document already exists")) {
      setError("document", {
        message: "Este documento já está sendo utilizado"
      })
      setTab("data")
    }

    if (errors.find((e) => e.message == "E-mail already exists")) {
      setError("email", {
        message: "Este E-mail já esta sendo utilizado"
      })
      setTab("data")
    }

    if (errors.find((e) => e.message == "Username already exists")) {
      setError("username", {
        message: "Este nome de usuário já esta sendo utilizado"
      })
      setTab("username")
    }


  }


  const handleNextTab = () => {
    if (tab == "username") {
      setPercentage("50")
      setTab("data")
    }
    if (tab == "data") {
      setPercentage("75")
      setTab("description")
    }

    if (tab == "description") {
      setPercentage("100")
      setTab("plan")
    }
  }

  const handlePreviousTab = () => {
    if (tab == "plan") {
      setPercentage("75")
      setTab("description")
    }
    if (tab == "description") {
      setPercentage("50")
      setTab("data")
    }
    if (tab == "data") {
      setPercentage("25")
      setTab("username")
    }
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar Empresa" />
      <ScrollContainer>
        <View bgColor="coolGray.100" h={2} borderRadius={100} mb={12}>
          <View bgColor="success.600" w={`${percentage}%`} h={2} borderRadius={100}>
          </View>
        </View>
        {
          tab === "username" ? (
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
          ) : tab === "data" ? (
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
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input label="E-mail" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.email?.message} />
                  )}
                />

                <Controller
                  name="number"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input label="Telefone" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.number?.message} />
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
            : tab === "description" ? (
              <View>
                <Heading fontFamily="heading" textAlign="center" fontSize="md" mb={8}> Descreva a sua empresa </Heading>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextArea value={value} onChangeText={onChange} h={24} px={2} mb={20} fontSize="sm" variant="outline" color="coolGray.800" />
                  )}
                />
              </View>
            )
              : (
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
                              <Button w="48" bgColor="brand.500" rounded="lg" isLoading={isSubimiting} onPress={() => handleCreate(plan.id)}>Escolher plano</Button>
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
        <HStack justifyContent={tab !== "username" ? "space-between" : "flex-end"} pb={20} pt={4}>
          {
            tab !== "username" && (
              <Button size="md" variant="ghost" onPress={handlePreviousTab} startIcon={<Icon as={CaretLeft} name="cloud-download-outline" size="sm" />}> Voltar </Button>
            )
          }

          {
            tab !== "plan" && (
              <Button size="md" variant="ghost" onPress={handleContinue} endIcon={<Icon as={CaretRight} name="cloud-download-outline" size="sm" />}> Continuar </Button>
            )
          }
        </HStack>
      </ScrollContainer>
    </View >
  )
}