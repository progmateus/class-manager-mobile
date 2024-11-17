import { api } from "./api";

export function ListTenantPlansService(tenantId: string, { search = "", page = 1 }: IPaginationDTO) {
  return api({
    url: `${tenantId}/tenant-plans/`,
    method: 'get',
    params: {
      search,
      page
    }
  })
}

export function CreateTenantPlanService(tenantId: string, name: string, description: string, timesOfweek: number, price: string) {
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