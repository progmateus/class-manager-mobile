import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { HStack, Heading, Icon, Link, Text, VStack, View } from "native-base";
import { CaretDown, CheckCircle, XCircle, Warning, CurrencyCircleDollar, CreditCard } from "phosphor-react-native";
import { Pressable, TouchableOpacity } from "react-native";
import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import dayjs from "dayjs"
import { useState } from "react";
import { THEME } from 'src/theme'


interface IProps {
  invoice: IInvoiceDTO
}

export function InvoiceItem({ invoice }: IProps) {

  const [isOpen, setIsOpen] = useState(false)
  const { sizes, colors } = THEME;

  const priceFormatted = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(dayjs(date, 'YYYY-MM-DD:hh:mm').toDate())
  }

  const convertBillStatus = (billState: number) => {
    const formatBillState: any = {
      1: {
        label: "Pendente",
        color: "yellow.500"
      },
      2: {
        label: "Pago",
        color: "success.500"
      },
      3: {
        label: "Em Atraso",
        color: "danger.500"
      },
    }
    return formatBillState[billState]
  }


  const handleClickInvoice = () => {
    if (invoice.status == EInvoiceStatus.OPEN || invoice.status == EInvoiceStatus.UNPAID) {
      setIsOpen(!isOpen)
    }
  }

  const color = convertBillStatus(invoice.status).color

  return (
    <Pressable>
      <View borderWidth={0.2} borderColor="coolGray.600" p={4} borderRadius={4}>
        <HStack space={2} alignItems="center" >
          <Icon as={invoice.status === EInvoiceStatus.OPEN ? Warning : invoice.status === EInvoiceStatus.UNPAID ? XCircle : CheckCircle} color={color} />
          <VStack flex={1} space={1} ml={2}>
            <Heading fontFamily="heading" fontSize="sm">{formatDate(invoice.expiresAt)}</Heading>
            <Text color="coolGray.600" fontSize="sm" fontWeight="light">{invoice.tenant?.name} </Text>
            <Text color={color} fontSize="sm" fontWeight="light">{convertBillStatus(invoice.status).label} </Text>
          </VStack>
          <Text color={color} fontSize="md" mr={2}>{priceFormatted(invoice.amount)}</Text>
          <TouchableOpacity onPress={handleClickInvoice}>
            <Icon as={CaretDown} color="coolGray.600" />
          </TouchableOpacity>
        </HStack>
        {
          isOpen && (
            <VStack pt={6} pb={2}>
              <TouchableOpacity>
                <Link href={invoice.stripeInvoiceUrl}>
                  <HStack alignItems="center" space={4} ml={1}>
                    <CreditCard size={sizes["6"]} color={colors.blue[500]} />
                    <Text fontSize="15" fontFamily="body" color="blue.500">
                      Pagar online
                    </Text>
                  </HStack>
                </Link>
              </TouchableOpacity>
            </VStack >
          )
        }
      </View >
    </Pressable >
  )
}