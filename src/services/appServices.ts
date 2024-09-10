import { api } from "./api";

export function ListAppPlansService() {
  return api({
    url: 'plans',
    method: 'get'
  })
}