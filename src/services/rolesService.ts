import { api } from "./api";

export function ListUsersRolesService() {
  return api({
    url: '/users/profile',
    method: 'get'
  })
}