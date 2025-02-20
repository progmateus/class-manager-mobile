import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { THEME } from "src/theme";

export const transformInvoiceStatus = (status?: EInvoiceStatus) => {
  if (!status) {
    return "Indisponível"
  }

  const situations: any = {
    1: "Pendente",
    2: "Pago",
    3: "Em atraso",
    4: "Cancelado",
    5: "Indisponível",
  }
  return situations[status];
}


export const transformInvoiceColor = (status?: EInvoiceStatus) => {
  const { colors } = THEME;

  if (!status) {
    return colors.coolGray['400']
  }

  const situations: any = {
    1: colors.yellow['500'],
    2: colors.green['500'],
    3: colors.red['500'],
    4: colors.red['500'],
    5: colors.coolGray['400'],
  }
  return situations[status];
}


export const transformSubscriptionStatus = (status: ESubscriptionStatus) => {
  const situations: any = {
    1: "Incompleto",
    2: 'Pendente',
    3: 'Experiência',
    4: 'Ativa',
    5: 'Em atraso',
    6: 'Cancelada',
    7: 'Pausada',
    8: 'Não paga'
  }
  return situations[status];
}


export const transformSubscriptionColor = (status: ESubscriptionStatus) => {
  const { colors } = THEME;

  const situations: any = {
    1: colors.coolGray['400'],
    2: colors.yellow['500'],
    3: colors.brand['500'],
    4: colors.brand['500'],
    5: colors.red['500'],
    6: colors.red['500'],
    7: colors.coolGray['400'],
    8: colors.red['500'],
  }
  return situations[status];
}


export const transFormClassDayColor = (status: number) => {
  const { colors } = THEME;

  const situations: any = {
    1: colors.yellow['500'],
    2: colors.red['500'],
    3: colors.green['500']
  }
  return situations[status];
}
