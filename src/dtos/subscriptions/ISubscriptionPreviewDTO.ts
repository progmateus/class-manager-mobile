import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { ITenantPlanDTO } from "../tenants/ITenantPlanDTO";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";

export interface ISubscriptionPreviewDTO {
  id: string;
  userId: string;
  tenantPlanId: string;
  tenantId: string;
  status: ESubscriptionStatus;
  user?: IUserPreviewDTO;
  tenantPlan?: ITenantPlanDTO;
  tenant?: any;
  expiresDate: Date;
  createdAt: Date;
  updatedAt: Date;
}