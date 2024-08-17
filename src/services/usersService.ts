import { api } from "./api";

export function CreateUserService(data: any) {
  return api({
    url: '/users/',
    method: 'post',
    data
  })
}