import { api } from "./api";

export function ListClassesService(tenantId: string) {
  return api({
    url: `${tenantId}/classes/`,
    method: 'get'
  })
}

export function CreateClassService(tenantId: string, name: string, description: string, businessHour: string,) {
  return api({
    url: `${tenantId}/classes/`,
    method: 'post',
    data: {
      name,
      description,
      businessHour
    }
  })
}