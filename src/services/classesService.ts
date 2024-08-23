import { api } from "./api";

export function ListClassesService(tenantId: string) {
  return api({
    url: `${tenantId}/classes/`,
    method: 'get'
  })
}