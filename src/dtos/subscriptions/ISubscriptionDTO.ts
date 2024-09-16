import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { IUserDTO } from "../users/IUserDTO";
import { ITenantPlanDTO } from "../tenants/ITenantPlanDTO";
import { IUserCompletedDTO } from "../users/IUserCompletedDTO";

export interface ISubscriptionDTO {
  id: string;
  userId: string;
  tenantPlanId: string;
  tenantId: string;
  status: ESubscriptionStatus;
  user: IUserDTO;
  tenantPlan: ITenantPlanDTO;
  tenant: any;
  expiresDate: Date;
  createdAt: Date;
  updatedAt: Date;
}