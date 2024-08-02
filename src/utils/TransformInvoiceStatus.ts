export const transformInvoiceStatus = (status: number) => {
  const situations: any = {
    1: "Pago",
    2: "Em aberto",
    3: "Atrasado",
  }
  return situations[status];
}