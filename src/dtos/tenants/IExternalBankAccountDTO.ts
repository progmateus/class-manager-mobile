import { ITenantDTO } from "./ITenantDTO";

interface IExternalBankAccountDTO {
  stripeExternalBankAccountId: string;
  name: string;
  country: string;
  currency: string;
  last4: string;
  routingNumber: string;
  status: number
  tenant?: ITenantDTO;
  createdAt: Date
  updatedAt: Date
}

export { IExternalBankAccountDTO }