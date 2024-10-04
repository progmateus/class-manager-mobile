import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Select, Text, useTheme, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ListClassesService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { ListTenantPlansService } from "src/services/tenantPlansService";
import { IClassDTO } from "@dtos/classes/IClass";
import { CreateSubscriptionService } from "src/services/subscriptionService";
import { useAuth } from "@hooks/useAuth";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const createSubscriptionSchema = z.object({
  planId: z.string(),
  classId: z.string()
});

type RouteParamsProps = {
  tenantIdParams?: string;
}

const defaultValues = {
  planId: "",
  classId: ""
}

type CreateSubscriptionProps = z.infer<typeof createSubscriptionSchema>

export function CreateSubscription() {
  const [classes, setClasses] = useState([])
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const route = useRoute()
  const params = route.params as RouteParamsProps;
  const { user, userUpdate, tenant } = useAuth()

  const tenantId = tenant?.id || params?.tenantIdParams

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<CreateSubscriptionProps>({
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
    if (!tenantId) return
    ListTenantPlansService(tenantId).then(({ data }) => {
      setPlans(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }


  const listClasses = () => {
    if (!tenantId) return
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handeCreateSubscription = (data: CreateSubscriptionProps) => {
    if (!tenantId) return
    setIsLoadig(true)
    const { planId, classId } = data
    CreateSubscriptionService(tenantId, planId, classId).then(({ data }) => {
      if (!user.subscriptions) user.subscriptions = []
      userUpdate({
        ...user,
        subscriptions: [...user.subscriptions, data.data]
      })
      fireSuccesToast('Assinatura realizada com sucesso!')
    }).catch((err) => {
      console.log(err)
      fireErrorToast('Ocorreu um erro')
    }).finally(() => {
      setIsLoadig(false)
    })

  }

  return (
    <View flex={1}>
      <PageHeader title="Realizar assinatura" rightIcon={Check} rightAction={handleSubmit(handeCreateSubscription)} />
      <ScrollContainer>
        <VStack space={6} mt={2}>

          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Selecione o plano: </Text>
          <Controller
            name="planId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select accessibilityLabel="Selecione o plano" selectedValue={value} variant="outline" mt={-2} onValueChange={onChange}>
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

          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Selecione a turma: </Text>
          <Controller
            name="classId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select accessibilityLabel="Selecione a turma" selectedValue={value} variant="outline" mt={-2} onValueChange={onChange}>
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
        </VStack>
      </ScrollContainer>
    </View>
  )
}