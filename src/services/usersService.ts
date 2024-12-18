import { ICreateUserDTO } from "@dtos/users/ICreateUserDTO";
import { api } from "./api";
import { IUpdateUserDTO } from "@dtos/users/IUpateUserDTO";

export function CreateUserService({ name, email, document, password, phone, username }: ICreateUserDTO) {
  return api({
    url: '/users/',
    method: 'post',
    data: {
      name, email, document, password, phone, username
    }
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

export function UploadUserAvatarService(form: FormData) {
  return api({
    url: '/users/avatar',
    method: 'patch',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}