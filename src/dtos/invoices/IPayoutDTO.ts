import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { EPayoutStatus } from "src/enums/EPayoutStatus";

export type IPayoutDTO = {
  id: string;
  stripePayoutId: string
  amount: number;
  currency: string;
  tenantId: string;
  status: EPayoutStatus;
  tenant?: ITenantDTO;
  createdAt: Date;
  updatedAt: Date;
}