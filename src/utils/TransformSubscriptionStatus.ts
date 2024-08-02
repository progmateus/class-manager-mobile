export const tranforSubscriptionStatus = (status: number) => {
  const situations: any = {
    1: "Ativo",
    2: "Inativo",
    3: "Cancelado",
    4: "Pausado"
  }
  return situations[status];
}