import { api } from "./api";

export function GetClassDayService(tenantId: string, classDayId: string) {
  return api({
    url: `${tenantId}/class-days/${classDayId}`,
    method: 'get'
  })
}