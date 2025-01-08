import { ICreatetenantDTO } from "@dtos/tenants/ICreateTenantDTO";
import { api } from "./api";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";

export function CreateTenantservice({ name, username, document, email, phone, planId, description }: ICreatetenantDTO) {
  return api({
    url: 'tenants',
    method: 'post',
    data: {
      name,
      username,
      document,
      email,
      phone,
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

export function UpdateTenantSertvice({ name, description, email, document, links }: Pick<ITenantDTO, "name" | "description" | "email" | "document" | "links">, tenantId: string) {
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

export function RefreshTenantSubscriptionService(tenantId: string) {
  return api({
    url: `/tenants/${tenantId}/subscriptions/refresh`,
    method: 'patch',
  })
}

export function UploadtenantAvatarService(tenantId: string, form: FormData) {
  return api({
    url: `/tenants/${tenantId}/avatar`,
    method: 'patch',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

export function CreateTenantImageService(tenantId: string, form: FormData) {
  return api({
    url: `/tenants/${tenantId}/images`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

export function DeleteTenantImageService(tenantId: string, imageId: string) {
  return api({
    url: `/tenants/${tenantId}/images/${imageId}`,
    method: 'delete'
  })
}

