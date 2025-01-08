import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { EStripeCustomerType } from "src/enums/EStripeCustomerType";
import { ETargetType } from "src/enums/ETargetType";

export interface ISubscriptionPreviewDTO {
  id: string;
  userId: string;
  tenantId: string;
  targetType: ETargetType;
  user?: IUserPreviewDTO;
  tenant?: ITenantDTO;
  createdAt: Date;
  updatedAt: Date;
}