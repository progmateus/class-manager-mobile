import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { HStack, Heading, Icon, Link, Text, VStack, View } from "native-base";
import { CaretDown, CheckCircle, XCircle, Warning, CurrencyCircleDollar, CreditCard } from "phosphor-react-native";
import { Pressable, TouchableOpacity } from "react-native";
import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import dayjs from "dayjs"
import { useCallback, useMemo, useState } from "react";
import { THEME } from 'src/theme'
import { HasRole } from "@utils/HasRole";
import { useAuth } from "@hooks/useAuth";
import { EInvoiceType } from "src/enums/EInvoiceType";


interface IProps {
  invoice: IInvoiceDTO
}

export function InvoiceItem({ invoice }: IProps) {

  const [isOpen, setIsOpen] = useState(false)
  const { sizes, colors } = THEME;
  const { user } = useAuth()

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
      4: {
        label: "Expirado",
        color: "coolGray.500"
      },
      5: {
        label: "Indisponível",
        color: "coolGray.500"
      },
    }
    return formatBillState[billState]
  }


  const hasInvoiceStatus = (status: EInvoiceStatus[]): boolean => {
    return status.includes(invoice.status)
  }

  const isInvoiceAdmin = useMemo(() => {
    if (invoice.type != EInvoiceType.USER_SUBSCRIPTION) {
      return false
    }
    return HasRole(user.usersRoles, invoice.tenantId, ["admin"])
  }, [invoice.id])

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

          {
            isInvoiceAdmin && hasInvoiceStatus([EInvoiceStatus.OPEN, EInvoiceStatus.UNPAID]) && (
              <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                <Icon as={CaretDown} color="coolGray.600" />
              </TouchableOpacity>
            )
          }

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