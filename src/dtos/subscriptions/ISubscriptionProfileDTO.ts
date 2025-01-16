import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { ITenantPlanDTO } from "../tenants/ITenantPlanDTO";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";
import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { ETargetType } from "src/enums/ETargetType";

export interface ISubscriptionProfileDTO {
  id: string;
  userId: string;
  tenantPlanId: string;
  planId: string;
  nextPlanId: string;
  nextTenantPlanId: string;
  latestInvoiceId?: string;
  tenantId: string;
  status: ESubscriptionStatus;
  targetType: ETargetType;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  user: Omit<IUserProfileDTO, "password">;
  tenantPlan: ITenantPlanDTO;
  plan: any;
  nextPlan: any;
  nextTenantPlan: ITenantPlanDTO;
  latestInvoice?: IInvoiceDTO;
  invoices: IInvoiceDTO[];
  tenant: ITenantDTO;
  expiresDate: Date;
  createdAt: Date;
  updatedAt: Date;
}