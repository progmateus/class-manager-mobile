import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";
import { EStripeCustomerType } from "src/enums/EStripeCustomerType";

export interface ISubscriptionPreviewDTO {
  id: string;
  userId: string;
  tenantId: string;
  type: EStripeCustomerType;
  user?: IUserPreviewDTO;
  tenant?: ITenantPreviewDTO;
  createdAt: Date;
  updatedAt: Date;
}