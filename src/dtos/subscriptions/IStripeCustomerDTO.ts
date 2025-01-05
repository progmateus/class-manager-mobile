import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";
import { EStripeCustomerType } from "src/enums/EStripeCustomerType";
import { ETargetType } from "src/enums/ETargetType";

export interface ISubscriptionPreviewDTO {
  id: string;
  userId: string;
  tenantId: string;
  targetType: ETargetType;
  user?: IUserPreviewDTO;
  tenant?: ITenantPreviewDTO;
  createdAt: Date;
  updatedAt: Date;
}