export const transformInvoiceStatus = (status: number) => {
  const situations: any = {
    1: "Pago",
    2: "Pendente",
    3: "Em atraso",
  }
  return situations[status];
}