import { api } from "./api";
import { IUpdateUserDTO } from "@dtos/users/IUpateUserDTO";

export function CreateUserService(data: any) {
  return api({
    url: '/users/',
    method: 'post',
    data
  })
}

export function GetUserProfileService() {
  return api({
    url: '/users/profile',
    method: 'get'
  })
}

export function GetUserByUsernameService(username: string) {
  return api({
    url: '/users/username',
    method: 'get',
    params: {
      username
    }
  })
}

export function UpdateUserService({ name, email, document, phone }: IUpdateUserDTO) {
  return api({
    url: '/users',
    method: 'put',
    data: {
      name,
      email,
      document,
      phone
    }
  })
}

export function ListUserBookingsService({ page, tenantId }: IUserAndTenantPaginationDTO) {
  return api({
    url: '/users/bookings',
    method: 'get',
    params: {
      tenantId,
      page
    }
  })
}