import { api } from "./api";

export function ListTenantPlansService(tenantId: string) {
  return api({
    url: `${tenantId}/tenant-plans/`,
    method: 'get'
  })
}