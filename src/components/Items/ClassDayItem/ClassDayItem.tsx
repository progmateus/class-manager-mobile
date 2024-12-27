import { Heading, HStack, Icon, Text, View, VStack } from "native-base";
import { Clock, MapPin } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { Avatar } from "@components/Avatar/Avatar";
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO";
import { EClassDayStatus } from "src/enums/EClassDayStatus";
import { THEME } from "src/theme";
import { size } from "lodash";

interface IProps {
  classDay: ICLassDayDTO
}
function ClassDayItem({ classDay }: IProps) {
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  const { colors, sizes } = THEME;


  function handleClickClassDay(classDayId: string, tenantId: string) {
    navigation.navigate('classDayProfile', {
      tenantIdParams: tenantId,
      classDayId
    });
  }

  const statusColor = classDay.status == EClassDayStatus.PENDING ? colors.coolGray['700'] : classDay.status == EClassDayStatus.CANCELED ? colors.red['500'] : colors.green['500']

  const getHours = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(date))
  };

  return (
    <TouchableOpacity key={classDay.id} onPress={() => handleClickClassDay(classDay.id, classDay.class.tenantId)}>
      <HStack p={4} space={6} alignItems="center" borderWidth={0.4} borderColor="coolGray.400" rounded="lg">
        <VStack space={2} alignItems="center" justifyContent="center">
          <Clock size={20} color={statusColor}
            style={{
              marginLeft: 4
            }} />
          <Text fontWeight="bold" color={statusColor}> {getHours(classDay.date)}</Text>
        </VStack>
        <VStack space={0.5} flex={1}>
          <Heading fontSize="sm" fontFamily="heading">{classDay.name ?? "Não informado"}</Heading>
          <Text fontSize="xs" fontWeight="light">{classDay.class?.tenant?.name}</Text>
          <Text fontSize="xs" fontWeight="light" color="coolGray.500" numberOfLines={1} >{
            `${classDay.class?.address?.street ?? 'Não informado'}${classDay.class?.address?.street && classDay.class?.address?.number ? `, ${classDay.class?.address?.number}` : ''}`
          } </Text>

        </VStack>
        <HStack>


          {
            classDay.bookings && classDay.bookings.length > 0 && (
              classDay.bookings.map((booking, index) => {
                return (
                  index <= 2 && (
                    <View ml={-5} key={booking.id}>
                      <Avatar
                        rounded="md"
                        key={booking.id}
                        w={9}
                        h={9}
                        alt="image profile"
                        src={booking.user.avatar}
                      />
                    </View>
                  )
                )
              })
            )
          }
          {
            classDay.bookings && classDay.bookings.length > 3 && (
              <View w={9} h={9} backgroundColor="brand.600" rounded="md" ml={-5} alignItems="center" justifyContent="center">
                <Text color="coolGray.100" fontSize="xs"> +{classDay.bookings.length - 3}</Text>
              </View>
            )
          }
        </HStack>
      </HStack>
    </TouchableOpacity>
  )
}

export { ClassDayItem }