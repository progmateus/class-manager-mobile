import { api } from "./api";

export function ListTenantPlansService(tenantId: string) {
  return api({
    url: `${tenantId}/tenant-plans/`,
    method: 'get'
  })
}

export function CreateTenantPlanService(tenantId: string, name: string, description: string, timesOfweek: number, price: string) {
  console.log({
    tenantId, name, description, timesOfweek, price
  })
  return api({
    url: `${tenantId}/tenant-plans/`,
    method: 'post',
    data: {
      name,
      description,
      timesOfweek,
      price: price
    }
  })
}