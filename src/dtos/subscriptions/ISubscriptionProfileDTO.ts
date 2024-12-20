import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { ITenantPlanDTO } from "../tenants/ITenantPlanDTO";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";
import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";

export interface ISubscriptionProfileDTO {
  id: string;
  userId: string;
  tenantPlanId: string;
  latestInvoiceId?: string;
  tenantId: string;
  status: ESubscriptionStatus;
  user: Omit<IUserProfileDTO, "password">;
  tenantPlan: ITenantPlanDTO;
  latestInvoice?: IInvoiceDTO;
  invoices: IInvoiceDTO[];
  tenant: any;
  expiresDate: Date;
  createdAt: Date;
  updatedAt: Date;
}