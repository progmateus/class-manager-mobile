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

export function GetUserByUsernameService(username: string) {
  return api({
    url: '/users/username',
    method: 'get',
    params: {
      username
    }
  })
}