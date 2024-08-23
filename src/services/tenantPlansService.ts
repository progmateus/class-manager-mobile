import { api } from "./api";

export function ListTenantPlansService(tenantId: string) {
  return api({
    url: `${tenantId}/tenant-plans/`,
    method: 'get'
  })
}


export function CreateTenantPlanService(tenantId: string, name: string, description: string, timesOfweek: number, price: string) {
  return api({
    url: `${tenantId}/tenant-plans/`,
    method: 'get'
  })
}