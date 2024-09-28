import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { IClassDTO } from "@dtos/classes/IClass";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoute } from "@react-navigation/native";
import { size } from "lodash";
import { AddIcon, HStack, Select, Text, useTheme, View, VStack } from "native-base";
import { background, border, color } from "native-base/lib/typescript/theme/styled-system";
import { Check } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { CreateClassDayService } from "src/services/classDaysService";
import { ListClassesService } from "src/services/classesService";
import { THEME } from "src/theme";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { useAuth } from "@hooks/useAuth";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const createClassDaySchema = z.object({
  date: z.string(),
  hourStart: z.string(),
  hourEnd: z.string(),
  classId: z.string()
});

type createclassDayProps = z.infer<typeof createClassDaySchema>

export function CreateClassDay() {
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const { sizes, colors } = useTheme();

  const { tenant } = useAuth()
  const tenantId = tenant?.id

  const { control, handleSubmit, formState: { errors } } = useForm<createclassDayProps>({
    resolver: zodResolver(createClassDaySchema)
  });


  useEffect(() => {
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [tenantId])

  const handleCreateClassDay = (data: createclassDayProps) => {
    if (isLoading) return;
    setIsLoadig(true)
    const { hourStart, hourEnd, date, classId } = data

    const fullDate = dayjs(`${date} ${hourStart}`, "DD/MM/YYYY HH:mm").toISOString();

    CreateClassDayService(tenantId, hourStart, hourEnd, fullDate, classId).then(() => {
      fireSuccesToast('Aula criada')
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
          <Text fontSize="sm" fontWeight="medium" color="coolGray.700" mb={-4}> Data: </Text>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputMask
                style={{
                  width: '100%',
                  borderBottomColor: 'red',
                  color: colors.coolGray[700],
                  height: sizes[10],
                  borderColor: colors.coolGray[300],
                  borderWidth: 0.8,
                  borderRadius: 4,
                  paddingLeft: sizes[4]
                }}
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }} onChangeText={onChange} value={value}
              />

            )}
          />
          <HStack space={4} w={'48%'}>
            <VStack space={4} w={'100%'}>
              <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Horário de inicio: </Text>
              <Controller
                name="hourStart"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInputMask
                    style={{
                      width: '100%',
                      borderBottomColor: 'red',
                      color: colors.coolGray[700],
                      height: sizes[10],
                      borderColor: colors.coolGray[300],
                      borderWidth: 0.8,
                      borderRadius: 4,
                      paddingLeft: sizes[4]
                    }}
                    type={'datetime'}
                    options={{
                      format: 'HH:mm'
                    }} onChangeText={onChange} value={value}
                  />
                )}
              />
            </VStack>

            <VStack space={4} w={'100%'}>
              <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Horário de término: </Text>
              <Controller
                name="hourEnd"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInputMask
                    style={{
                      width: '100%',
                      borderBottomColor: 'red',
                      color: colors.coolGray[700],
                      height: sizes[10],
                      borderColor: colors.coolGray[300],
                      borderWidth: 0.8,
                      borderRadius: 4,
                      paddingLeft: sizes[4]
                    }}
                    type={'datetime'}
                    options={{
                      format: 'HH:mm'
                    }} onChangeText={onChange} value={value}
                  />
                )}
              />
            </VStack>

          </HStack>

          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Turma: </Text>
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