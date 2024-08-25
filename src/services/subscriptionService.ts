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