import { api } from "./api";

export function ListUsersRolesService(tenantId: string, rolesNames: string[]) {
  return api({
    url: `${tenantId}/users-roles`,
    method: 'get',
    params: {
      rolesNames
    },
    paramsSerializer: {
      indexes: true
    }
  })
}

export function DeleteUserRoleService(tenantId: string, userRoleId: string) {
  return api({
    url: `${tenantId}/users-roles/${userRoleId}`,
    method: 'delete'
  })
}

export function CreateUserRoleService(tenantId: string, userId: string, roleName: string) {
  return api({
    url: `${tenantId}/users-roles/`,
    method: 'post',
    data: {
      userId,
      roleName
    }
  })
}