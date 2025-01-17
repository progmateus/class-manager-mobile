import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { api } from "./api";
import { IPaginationDTO } from "@dtos/shared/IPaginationDTO";

export function CreateUserSubscriptionService(tenantId: string, tenantPlanId: string, classId: string, userId?: string) {
  return api({
    url: `${tenantId}/subscriptions/`,
    method: 'post',
    data: {
      tenantId,
      tenantPlanId,
      classId,
      userId
    }
  })
}

export function CreateTenantsubscriptionService(tenantId: string, planId: string, classId: string, userId?: string) {
  return api({
    url: `tenants/${tenantId}/subscriptions`,
    method: 'post',
    data: {
      tenantId,
      planId
    }
  })
}

export function DeleteSubscriptionService(tenantId: string, subscriptionId: string) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}`,
    method: 'delete'
  })
}

export function UpdateSubscriptionPlanService(tenantId: string, subscriptionId: string, tenantPlanId?: string, planId?: string) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}/plan`,
    method: 'patch',
    data: {
      tenantPlanId,
      planId
    }
  })
}

export function UpdateSubscriptionStatusService(tenantId: string, subscriptionId: string, status: ESubscriptionStatus) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}/status`,
    method: 'patch',
    data: {
      status
    }
  })
}

export function ListSubscriptionsService(tenantId: string, { page = 1, search = "", limit }: IPaginationDTO) {
  return api({
    url: `${tenantId}/subscriptions/`,
    method: 'get',
    params: {
      page,
      search,
      limit
    }
  })
}


export function GetSubscriptionProfileService(tenantId: string, subscriptionId: string) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}`,
    method: 'get'
  })
}

export function RefreshUserSubscriptionService(tenantId: string, subscriptionId: string) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}/refresh`,
    method: 'post'
  })
}