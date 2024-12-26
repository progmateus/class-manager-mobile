import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { IClassDTO } from "@dtos/classes/IClassDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HStack, Select, Text, useTheme, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { CreateClassDayService } from "src/services/classDaysService";
import { ListClassesService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { useAuth } from "@hooks/useAuth";
import { InputMask } from "@components/form/InputMask";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { Input } from "@components/form/Input";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const createClassDaySchema = z.object({
  name: z.string().min(3, "min 3 caracteres").max(80, "max 80 caracteres"),
  date: z.string(),
  hourStart: z.string(),
  hourEnd: z.string(),
  classId: z.string()
});

const defaultValues = {
  classId: "",
}

type createclassDayProps = z.infer<typeof createClassDaySchema>

export function CreateClassDay() {
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  const { tenant } = useAuth()
  const tenantId = tenant?.id

  const { control, handleSubmit, formState: { errors }, reset } = useForm<createclassDayProps>({
    resolver: zodResolver(createClassDaySchema)
  });

  useEffect(() => {
    ListClassesService(tenantId, {}).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [tenantId])

  useFocusEffect(useCallback(() => {
    reset(defaultValues)
  }, []))

  const handleCreateClassDay = ({ name, date, classId, hourEnd, hourStart }: createclassDayProps) => {
    if (isLoading) return;
    setIsLoadig(true)

    const fullDate = dayjs(`${date} ${hourStart}`, "DD/MM/YYYY HH:mm").toISOString();

    CreateClassDayService(tenantId, name, hourStart, hourEnd, fullDate, classId).then(({ data }) => {
      fireSuccesToast('Aula criada com sucesso!')
      reset(defaultValues)
      navigation.navigate('classDayProfile', {
        classDayId: data.data.id,
        tenantIdParams: tenantId
      })
    }).catch((err) => {
      console.log(err)
      fireErrorToast('Ocorreu um erro')
    }).finally(() => {
      setIsLoadig(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar aula" rightIcon={Check} rightAction={handleSubmit(handleCreateClassDay)} />
      <ScrollContainer>
        <VStack space={6} mt={4}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Nome" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputMask
                label="Data:"
                type="datetime"
                options={{
                  format: 'DD/MM/YYYY'
                }}
                onChangeText={onChange} value={value} errorMessage={errors.date?.message} />
            )}
          />
          <HStack space={4} w={'48%'}>
            <Controller
              name="hourStart"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputMask
                  label="Horário de inicio:"
                  type="datetime"
                  options={{
                    format: 'HH:mm'
                  }}
                  onChangeText={onChange} value={value} errorMessage={errors.hourStart?.message}
                />
              )}
            />

            <Controller
              name="hourEnd"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputMask
                  label="Horário de término:"
                  type="datetime"
                  options={{
                    format: 'HH:mm'
                  }}
                  onChangeText={onChange} value={value} errorMessage={errors.hourEnd?.message}
                />
              )}
            />

          </HStack>

          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Turma: </Text>
          <Controller
            name="classId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select accessibilityLabel="Selecione a turma" selectedValue={value} variant="outline" mt={-2} onValueChange={onChange}>
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
        </VStack>
      </ScrollContainer>
    </View>
  )
}