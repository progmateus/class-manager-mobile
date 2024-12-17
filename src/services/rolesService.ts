import { api } from "./api";

export function ListUsersRolesService(rolesNames: string[], { tenantId, page, search }: IUserAndTenantPaginationDTO) {
  return api({
    url: `${tenantId}/users-roles`,
    method: 'get',
    params: {
      rolesNames,
      page,
      search
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