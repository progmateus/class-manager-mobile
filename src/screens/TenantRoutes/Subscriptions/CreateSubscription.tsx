import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Heading, Icon, Modal, Select, Text, useTheme, View, VStack } from "native-base";
import { At, Check } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ListClassesService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications";
import { ListTenantPlansService } from "src/services/tenantPlansService";
import { IClassDTO } from "@dtos/classes/IClassDTO";
import { CreateSubscriptionService } from "src/services/subscriptionService";
import { useAuth } from "@hooks/useAuth";
import { Avatar } from "@components/Avatar/Avatar";
import { GetUserByUsernameService } from "src/services/usersService";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { Button } from "@components/Button";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { ITenantPlanDTO } from "@dtos/tenants/ITenantPlanDTO";
import { useQueryClient } from "@tanstack/react-query";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const createSubscriptionSchema = z.object({
  planId: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  classId: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  username: z.string({ required_error: 'Campo obrigatório' })
});

const defaultValues = {
  planId: "",
  classId: "",
  username: "",
}

type CreateSubscriptionProps = z.infer<typeof createSubscriptionSchema>

export function CreateSubscription() {
  const [classes, setClasses] = useState<IClassDTO[]>([])
  const [plans, setPlans] = useState<ITenantPlanDTO[]>([])
  const [isLoading, setIsLoadig] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [userFound, setUserFound] = useState<IUserPreviewDTO>({} as IUserPreviewDTO)


  const navigation = useNavigation<TenantNavigatorRoutesProps>()
  const { tenant, user } = useAuth()


  const queryClient = useQueryClient();


  const tenantId = tenant?.id

  const { control, handleSubmit, formState: { errors, isValid }, reset, getValues, resetField } = useForm<CreateSubscriptionProps>({
    resolver: zodResolver(createSubscriptionSchema)
  });

  useFocusEffect(useCallback(() => {
    reset(defaultValues)
  }, []))


  useEffect(() => {
    Promise.all([
      listTenantplans(),
      listClasses()
    ])
  }, [tenantId])


  const listTenantplans = () => {
    ListTenantPlansService(tenantId, {}).then(({ data }) => {
      setPlans(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }


  const listClasses = () => {
    ListClassesService(tenantId, {}).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleCreateSubscription = () => {
    if (isLoading) return

    if (!isValid || !userFound.id) {
      fireErrorToast('Dados inválidos')
      setIsModalOpen(false)
      return
    }

    if (user.id === userFound.id) {
      fireErrorToast('Você não pode criar uma assinatura para si mesmo')
      resetField('username')
      setIsModalOpen(false)
      return
    }

    errors.root
    setIsLoadig(true)
    CreateSubscriptionService(tenantId, getValues("planId"), getValues("classId"), userFound.id).then(async ({ data }) => {
      fireSuccesToast('Assinatura realizada com sucesso!')
      setIsModalOpen(false)
      await queryClient.invalidateQueries({
        queryKey: ['get-subscriptions', tenantId]
      })
      navigation.navigate('subscriptionProfile', { subscriptionId: data.data.id })
    }).catch((err) => {
      console.log(err)
      setIsModalOpen(false)
    }).finally(() => {
      setIsLoadig(false)
    })
  }

  const handleContinue = async (data: CreateSubscriptionProps) => {
    if (isSearching) return
    setIsSearching(true)

    GetUserByUsernameService(data.username).then(({ data }) => {
      if (!data.data) {
        fireWarningToast('Nenhum usuário encontrado!')
        return
      }
      setIsModalOpen(true)
      setUserFound(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsSearching(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Realizar assinatura" />
      <ScrollContainer>
        <VStack space={6} mt={2}>
          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Selecione o plano: </Text>
          <VStack>
            <Controller
              name="planId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select accessibilityLabel="Selecione o plano" selectedValue={value} variant="outline" mt={-4} onValueChange={onChange} fontSize={14}>
                  <Select.Item label="Selecione" value="" />
                  {
                    plans && plans.length > 0 && (
                      plans.map((c: any) => {
                        return (
                          <Select.Item key={c.id} label={c.name} value={c.id} />
                        )
                      })
                    )
                  }
                </Select>
              )}
            />
            {errors.planId?.message && (<Text color="red.500" ml={1}>{errors.planId?.message}</Text>)}
          </VStack>


          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Selecione a turma: </Text>
          <VStack mb={2}>
            <Controller
              name="classId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select accessibilityLabel="Selecione a turma" selectedValue={value} variant="outline" mt={-4} onValueChange={onChange} fontSize={14}>
                  <Select.Item label="Selecione" value="" />
                  {
                    classes && classes.length > 0 && (
                      classes.map((c: IClassDTO) => {
                        return (
                          <Select.Item key={c.id} label={c.name} value={c.id} />
                        )
                      })
                    )

                  }
                </Select>
              )}
            />
            {errors.planId?.message && (<Text color="red.500" ml={1}>{errors.planId?.message}</Text>)}
          </VStack>

          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                variant="outline"
                value={value}
                onChangeText={onChange}
                label="Nome de usuário do aluno"
                InputLeftElement={<Icon as={At} style={{ marginLeft: 8 }} color="coolGray.400" />}
                errorMessage={errors.username?.message}
              />
            )}
          />

          <Button title="Continuar" onPress={handleSubmit(handleContinue)} isLoading={isSearching} />
        </VStack>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} safeAreaTop={true}>
          <Modal.Content maxWidth="350">
            {/* <Modal.CloseButton /> */}
            <Modal.Header>Criar assinatura</Modal.Header>
            <Modal.Body justifyContent="center">
              <Text fontFamily="body" color="coolGray.600">Deseja criar uma assinatura para este usuário?</Text>
              <View alignItems="center" justifyContent="center" py={4} mt={2}>
                <Avatar
                  rounded="full"
                  w={20}
                  h={20}
                  alt="Foto de perfil"
                  src={userFound.avatar}
                />

                <VStack alignItems="center" justifyContent="center" mt={4}>
                  <Heading fontFamily="heading" fontSize="md" color="coolGray.700">{userFound?.name}</Heading>
                  <Text fontFamily="body" color="coolGray.600">@{userFound?.username}</Text>
                </VStack>
              </View>
            </Modal.Body>
            <Modal.Footer>
              <VStack space={2} flex={1}>
                <Button title="Criar" isLoading={isLoading} onPress={handleCreateSubscription} />
                <Button title="Cancelar" variant="outline" onPress={() => setIsModalOpen(false)} />
              </VStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </ScrollContainer>
    </View>
  )
}