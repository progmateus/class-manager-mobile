import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { IUserDTO } from "./IUserDTO";
import { ITenantPlanDTO } from "./ITenantPlanDTO";
import { IUserCompletedDTO } from "./IUserCompletedDTO";

export interface ISubscriptionDTO {
  id: string;
  userId: string;
  tenantPlanId: string;
  tenantId: string;
  status: ESubscriptionStatus;
  user: IUserCompletedDTO;
  tenantPlan: ITenantPlanDTO;
  tenant: any;
  expiresDate: Date;
  createdAt: Date;
  updatedAt: Date;
}