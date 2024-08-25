import { api } from "./api";

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