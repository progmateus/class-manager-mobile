import { api } from "./api";

export function ListUsersRolesService(tenantId: string, roleName: string) {
  return api({
    url: `${tenantId}/users-roles`,
    method: 'get',
    params: {
      roleName
    }
  })
}

export function DeleteUserRoleService(tenantId: string, userRoleId: string) {
  return api({
    url: `${tenantId}/users-roles/${userRoleId}`,
    method: 'delete'
  })
}