import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { ITenantPlanDTO } from "@dtos/tenants/ITenantPlanDTO";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import { EInvoiceTargetType } from "src/enums/EInvoiceTargetType";
import { EInvoiceType } from "src/enums/EInvoiceType";

export type IInvoiceDTO = {
    userId: string;
    tenantPlanId?: string;
    subscriptionId?: string;
    planId?: string;
    amount: number;
    status: EInvoiceStatus;
    targetType: EInvoiceTargetType;
    type: EInvoiceType;
    expiresAt: Date;
    user?: IUserPreviewDTO;
    tenantPlan?: ITenantPlanDTO;
    subscription?: ISubscriptionPreviewDTO;
    createdAt: Date;
    updatedAt: Date;
}