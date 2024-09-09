import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { api } from "./api";
import { ICreatetenantDTO } from "@dtos/tenants/ICreateTenantDTO";

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