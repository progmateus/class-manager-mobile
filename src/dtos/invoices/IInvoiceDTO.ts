import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { ITenantPlanDTO } from "@dtos/tenants/ITenantPlanDTO";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import { ETargetType } from "src/enums/ETargetType";
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
    targetType: ETargetType;
    stripeInvoiceUrl: string;
    type: EInvoiceType;
    expiresAt: Date;
    user?: IUserPreviewDTO;
    tenantPlan?: ITenantPlanDTO;
    subscription?: ISubscriptionPreviewDTO;
    tenant?: ITenantDTO;
    createdAt: Date;
    updatedAt: Date;
}