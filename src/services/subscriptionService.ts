import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { api } from "./api";

export function CreateSubscriptionService(tenantId: string, tenantPlanId: string, classId: string) {
  return api({
    url: `${tenantId}/subscriptions/`,
    method: 'post',
    data: {
      tenantId,
      tenantPlanId,
      classId
    }
  })
}

export function DeleteSubscriptionService(tenantId: string, subscriptionId: string) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}`,
    method: 'delete'
  })
}

export function ListSubscriptionsService(tenantId: string) {
  return api({
    url: `${tenantId}/subscriptions/`,
    method: 'get'
  })
}


export function GetSubscriptionProfileService(tenantId: string, subscriptionId: string) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}`,
    method: 'get'
  })
}

export function UpdateSubscriptionService(tenantId: string, subscriptionId: string, status: ESubscriptionStatus) {
  return api({
    url: `${tenantId}/subscriptions/${subscriptionId}`,
    method: 'put',
    data: {
      status
    }
  })
}