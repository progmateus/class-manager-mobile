import { EExternalBankAccountStatus } from "src/enums/EExternalBankAccountStatus";
import { ITenantDTO } from "./ITenantDTO";

interface IExternalBankAccountDTO {
  stripeExternalBankAccountId: string;
  name: string;
  country: string;
  currency: string;
  last4: string;
  routingNumber: string;
  status: EExternalBankAccountStatus
  tenant?: ITenantDTO;
  createdAt: Date
  updatedAt: Date
}

export { IExternalBankAccountDTO }