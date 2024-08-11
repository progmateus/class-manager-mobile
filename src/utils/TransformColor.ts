export const transformSubscriptionColor = (status: number) => {
  const situations: any = {
    1: "brand.600",
    2: "",
    3: "red.500",
    4: "yellow.500"
  }
  return situations[status];
}

export const transformInvoiceColor = (status: number) => {
  const situations: any = {
    1: "green.500",
    2: "yellow.500",
    3: "red.500",
  }
  return situations[status];
}