import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { CaretDown, CheckCircle, XCircle, Warning } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

interface IBill {
  id: string;
  expiresDate: string;
  status: number;
  price: number
}

interface IProps {
  bill: IBill
}

export function BillItem({ bill }: IProps) {
  const priceFormatted = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  const convertBillStatus = (billState: number) => {
    const formatBillState: any = {
      0: {
        label: "Pendente",
        color: "yellow.500"
      },
      1: {
        label: "Em Atraso",
        color: "danger.500"
      },
      2: {
        label: "Pago",
        color: "success.500"
      }
    }
    return formatBillState[billState]
  }

  const color = convertBillStatus(bill.status).color

  return (
    <TouchableOpacity>
      <HStack space={2} alignItems="center" borderWidth={0.2} borderColor="coolGray.600" p={4} borderRadius={4}>
        <Icon as={bill.status === 0 ? Warning : bill.status === 1 ? XCircle : CheckCircle} color={color} />
        <VStack flex={1} space={1}>
          <Heading fontFamily="heading" fontSize="md">{bill.expiresDate}</Heading>
          <Text color={color} fontSize="sm" fontWeight="light"> {convertBillStatus(bill.status).label} </Text>
        </VStack>
        <Text color={color} fontSize="lg">  {priceFormatted(bill.price)} </Text>
        <Icon as={CaretDown} color="coolGray.400" />
      </HStack>
    </TouchableOpacity>
  )
}