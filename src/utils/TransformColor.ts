import { useTheme } from "native-base";
import { THEME } from "src/theme";

export const transformSubscriptionColor = (status: number) => {
  const { sizes, colors } = THEME;

  const situations: any = {
    1: colors.yellow['600'],
    2: colors.red['500'],
    3: colors.green['500'],
  }
  return situations[status];
}

export const transformInvoiceColor = (status: number) => {
  const { sizes, colors } = THEME;

  const situations: any = {
    1: colors.yellow['500'],
    2: colors.red['500'],
    3: colors.green['500'],
  }
  return situations[status];
}


export const transFormClassDayColor = (status: number) => {
  const { sizes, colors } = THEME;

  const situations: any = {
    1: colors.yellow['500'],
    2: colors.red['500'],
    3: colors.green['500']
  }
  return situations[status];
}