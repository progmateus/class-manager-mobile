import { api } from "./api";

export function VerifyUsernameService(username: string) {
  return api({
    url: 'usernames',
    method: 'get',
    params: {
      username
    }
  })
}