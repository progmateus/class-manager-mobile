import { ICreatetenantDTO } from "@dtos/tenants/ICreateTenantDTO";
import { api } from "./api";
import { ITenantProfileDTO } from "@dtos/tenants/ITenantProfileDTO";

export function CreateTenantservice({ name, username, document, email, number, planId, description }: ICreatetenantDTO) {
  return api({
    url: 'tenants',
    method: 'post',
    data: {
      name,
      username,
      document,
      email,
      number,
      planId,
      description
    }
  })
}

export function ListTenantsService({ search = "", page = 1 }: IPaginationDTO) {
  return api({
    url: '/tenants/',
    method: 'get',
    params: {
      search,
      page
    }
  })
}

export function GetTenantProfileService(tenantId: string) {
  return api({
    url: `/tenants/${tenantId}/profile`,
    method: 'get'
  })
}

export function GetTenantService(tenantId: string) {
  return api({
    url: `/tenants/${tenantId}`,
    method: 'get'
  })
}

export function UpdateTenantSertvice({ name, description, email, document, links }: Pick<ITenantProfileDTO, "name" | "description" | "email" | "document" | "links">, tenantId: string) {
  return api({
    url: `/tenants/${tenantId}`,
    method: 'put',
    data: {
      name,
      description,
      email,
      document,
      links
    }
  })
}