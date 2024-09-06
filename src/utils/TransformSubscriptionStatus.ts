export const transformSubscriptionStatus = (status: number) => {
  const situations: any = {
    1: "Inativo",
    2: "Cancelado",
    3: "Ativo"
  }
  return situations[status];
}