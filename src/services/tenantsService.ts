import { ICreatetenantDTO } from "@dtos/tenants/ICreateTenantDTO";
import { api } from "./api";

export function CreateTenantservice({ name, username, document }: ICreatetenantDTO) {
  return api({
    url: 'tenants',
    method: 'post',
    data: {
      name, username, document
    }
  })
}

export function ListTenantsService(search: string) {
  return api({
    url: '/tenants/',
    method: 'get',
    params: {
      search
    }
  })
}

export function GetTenantProfileService(tenantId: string) {
  return api({
    url: `/tenants/${tenantId}`,
    method: 'get'
  })
}