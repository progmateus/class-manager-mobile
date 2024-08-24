import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoute } from "@react-navigation/native";
import { Select, Text, useTheme, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { CreateClassService, ListClassesService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { CreateTenantPlanService } from "src/services/tenantPlansService";
import { IClassDTO } from "@dtos/IClass";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

type RouteParamsProps = {
  tenantId: string;
}

const createSubscriptionSchema = z.object({
  planId: z.string(),
  classId: z.string()
});

type CreateSubscriptionProps = z.infer<typeof createSubscriptionSchema>

export function CreateSubscription() {
  const [classes, setClasses] = useState([])
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const { sizes, colors } = useTheme();
  const route = useRoute()

  const { tenantId } = route.params as RouteParamsProps;

  const { control, handleSubmit, formState: { errors } } = useForm<CreateSubscriptionProps>({
    resolver: zodResolver(createSubscriptionSchema)
  });


  useEffect(() => {
    Promise.all([
      listTenantplans(),
      listClasses()
    ])
  }, [tenantId])


  const listTenantplans = () => {
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    })
  }


  const listClasses = () => {
    ListClassesService(tenantId).then(({ data }) => {
      setPlans(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    })
  }

  const handleCreateClass = (data: CreateSubscriptionProps) => {
    console.log(data)


  }

  return (
    <View flex={1}>
      <PageHeader title="Assinar" rightIcon={Check} rightAction={handleSubmit(handleCreateClass)} />
      <ScrollContainer>
        <VStack space={6} mt={2}>

          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Selecione o plano: </Text>
          <Controller
            name="planId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select accessibilityLabel="Selecione o plano" selectedValue={value} variant="outline" mt={-2} onValueChange={onChange}>
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