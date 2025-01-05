import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { HStack, Heading, Icon, Link, Modal, Text, VStack, View, Button as NativeBaseButton, Divider } from "native-base";
import { CaretDown, CheckCircle, XCircle, Warning, CurrencyCircleDollar, CreditCard, Check } from "phosphor-react-native";
import { Pressable, TouchableOpacity } from "react-native";
import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import dayjs from "dayjs"
import { useCallback, useMemo, useState } from "react";
import { THEME } from 'src/theme'
import { HasRole } from "@utils/HasRole";
import { useAuth } from "@hooks/useAuth";
import { EInvoiceType } from "src/enums/EInvoiceType";
import { UpdateInvoiceStatusService } from "src/services/invoiceService";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { Loading } from "@components/Loading";
import { Button } from "@components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { ETargetType } from "src/enums/ETargetType";


interface IProps {
  invoice: IInvoiceDTO
}

export function InvoiceItem({ invoice }: IProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { sizes, colors } = THEME;
  const { user } = useAuth()

  const queryClient = useQueryClient();

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

  const handleUpdateInvoiceStatus = async () => {
    if (isLoading) return
    setIsLoading(true)
    UpdateInvoiceStatusService(invoice.tenantId, invoice.id, EInvoiceStatus.PAID).then(async () => {
      await queryClient.cancelQueries({
        queryKey: ['get-subscription-profile', invoice.subscriptionId]
      })
      await queryClient.cancelQueries({
        queryKey: ['get-subscriptions']
      })
      await queryClient.cancelQueries({
        queryKey: ['get-invoices']
      })
      fireSuccesToast('Cobrança atualizada!')
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
      setIsModalOpen(false)
    })
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
          <VStack flex={1} ml={2}>
            <Heading fontFamily="heading" fontSize="sm">{formatDate(invoice.expiresAt)}</Heading>
            <Text color="coolGray.500" fontSize="sm" fontWeight="light">{invoice.tenant?.name} </Text>
            <Text color={color} fontSize="sm" fontWeight="light">{convertBillStatus(invoice.status).label} </Text>
          </VStack>
          <Text color={color} fontSize="sm" mr={2}>{priceFormatted(invoice.amount)}</Text>

          {
            isInvoiceAdmin && hasInvoiceStatus([EInvoiceStatus.OPEN, EInvoiceStatus.UNPAID]) && (
              <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                <Icon as={CaretDown} color="coolGray.600" />
              </TouchableOpacity>
            )
          }

        </HStack>
        {
          isOpen && isInvoiceAdmin && hasInvoiceStatus([EInvoiceStatus.OPEN, EInvoiceStatus.UNPAID]) && invoice.targetType == ETargetType.USER && (
            <VStack pt={6} pb={2}>
              <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
                <HStack alignItems="center" space={4} ml={1}>
                  <Check size={sizes["6"]} color={colors.blue[500]} />
                  <Text fontSize="15" fontFamily="body" color="blue.500">
                    Informar pagamento
                  </Text>
                </HStack>
              </TouchableOpacity>
            </VStack >
          )
        }

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} safeAreaTop={true}>
          <Modal.Content maxWidth="350">
            <Modal.Header borderBottomWidth={0}>
              <Text fontFamily="heading"> Informar pagamento? </Text>
            </Modal.Header>
            <Modal.Body justifyContent="center" py={6} borderWidth={0}>
              <Text fontFamily="body" color="coolGray.600">
                Deseja informar que esta cobrança já foi paga? Após realizada, esta ação não poderá ser desfeita.
              </Text>
            </Modal.Body>
            <Modal.Footer borderWidth={0} borderTopWidth={0}>
              <VStack flex={1}>
                <Button title="Confirmar" variant="unstyled" color="brand.600" isLoading={isLoading} onPress={handleUpdateInvoiceStatus} />
                <Divider my={1} bgColor="coolGray.300" />
                <NativeBaseButton mt={2} variant="unstyled" fontWeight="bold" color="coolGray.500" onPress={() => setIsModalOpen(false)}>
                  Voltar
                </NativeBaseButton>
              </VStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View >
    </Pressable >
  )
}