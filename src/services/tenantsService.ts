import { api } from "./api";

export function ListTenantsService(search: string) {
  return api({
    url: '/tenants/',
    method: 'get',
    params: {
      search
    }
  })
}