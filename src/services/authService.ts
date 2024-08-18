import { api } from "./api";

export function SignInService(email: string, password: string) {
  return api({
    url: '/auth/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}