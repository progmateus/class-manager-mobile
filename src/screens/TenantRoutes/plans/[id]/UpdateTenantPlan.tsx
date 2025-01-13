import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Text, useTheme, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { GetTenantPlanService, UpdatetenantPlanService } from "src/services/tenantPlansService";
import { useAuth } from "@hooks/useAuth";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { useQueryClient } from "@tanstack/react-query";
import { ITenantPlanDTO } from "@dtos/tenants/ITenantPlanDTO";
import { InputMask } from "@components/form/InputMask";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const updateTenantPlanSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  timesOfweek: z.string().regex(/\d+/g, "Apenas números"),
  price: z.string()
});

type RouteParamsProps = {
  tenantPlanId: string;
}

type UpdateTenantPlanProps = z.infer<typeof updateTenantPlanSchema>

export function UpdateTenantPlan() {
  const [isLoading, setIsLoadig] = useState(false)
  const { sizes, colors } = useTheme();
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const route = useRoute()
  const { tenantPlanId } = route.params as RouteParamsProps;

  const { tenant } = useAuth()
  const queryClient = useQueryClient();

  const tenantId = tenant?.id

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateTenantPlanProps>({
    resolver: zodResolver(updateTenantPlanSchema)
  });

  useFocusEffect(useCallback(() => {
    loadtenantPlan()
  }, []))


  const loadtenantPlan = () => {
    GetTenantPlanService(tenant.id, tenantPlanId).then(({ data }) => {
      const { name, description, price, timesOfweek } = data.data as ITenantPlanDTO
      const defaultValues = {
        name,
        description,
        price: String(price * 100),
        timesOfweek: String(timesOfweek)
      }
      reset(defaultValues)
    })
  }

  const handleUpdateTenantPlan = ({ name, description, price, timesOfweek }: UpdateTenantPlanProps) => {
    if (isLoading || !tenantId || !tenantPlanId) return;
    setIsLoadig(true)

    UpdatetenantPlanService(tenantId, tenantPlanId, name, description, Number(timesOfweek), price.replaceAll(/[A-z\$\.\-\,]/g, "").replace(/([0-9]+)([0-9]{2})/, '$1.$2')).then(async () => {
      fireSuccesToast('Plano atualizado')
      await queryClient.invalidateQueries({
        queryKey: ['get-tenant-plans', tenantId],
        exact: true
      })
      navigation.navigate('tenantPlansList')
      reset()
    }).catch((err) => {
      console.log(err)
      fireErrorToast('Ocorreu um erro')
    }).finally(() => {
      setIsLoadig(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Atualizar plano" rightIcon={Check} rightAction={handleSubmit(handleUpdateTenantPlan)} />
      <ScrollContainer>
        <VStack space={6} mt={2}>

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Nome" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
            )}
          />


          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Descrição" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.description?.message} />
            )}
          />


          <Controller
            name="timesOfweek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Vezes por semana" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.timesOfweek?.message} />
            )}
          />



          <Text fontSize="sm" fontWeight="medium" color="coolGray.700" mb={-4}> Preço: </Text>
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputMask
                placeholder="price"
                type="money"
                onChangeText={onChange} value={value} errorMessage={errors.price?.message}
              />
            )}
          />
        </VStack>
      </ScrollContainer>
    </View>
  )
}