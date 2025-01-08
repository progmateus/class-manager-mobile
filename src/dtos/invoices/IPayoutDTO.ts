import { ITenantDTO } from "@dtos/tenants/ITenantDTO";

export type IPayoutDTO = {
  id: string;
  stripePayoutId: string
  amount: number;
  currency: string;
  tenantId: string;
  status: number;
  tenant?: ITenantDTO;
  createdAt: Date;
  updatedAt: Date;
}