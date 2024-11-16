import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { ITenantPlanDTO } from "@dtos/tenants/ITenantPlanDTO";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import { EInvoiceTargetType } from "src/enums/EInvoiceTargetType";
import { EInvoiceType } from "src/enums/EInvoiceType";

export type IInvoiceDTO = {
    id: string;
    userId: string;
    tenantPlanId?: string;
    tenantId: string;
    subscriptionId?: string;
    planId?: string;
    amount: number;
    status: EInvoiceStatus;
    targetType: EInvoiceTargetType;
    stripeInvoiceUrl: string;
    type: EInvoiceType;
    expiresAt: Date;
    user?: IUserPreviewDTO;
    tenantPlan?: ITenantPlanDTO;
    subscription?: ISubscriptionPreviewDTO;
    tenant?: ITenantPreviewDTO;
    createdAt: Date;
    updatedAt: Date;
}