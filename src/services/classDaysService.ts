import { EClassDayStatus } from "src/enums/EClassDayStatus";
import { api } from "./api";

export function GetClassDayService(tenantId: string, classDayId: string) {
  return api({
    url: `${tenantId}/class-days/${classDayId}`,
    method: 'get'
  })
}

export function UpdateClassDayStatusService(tenantId: string, classDayId: string, status: EClassDayStatus, observation?: string) {
  return api({
    url: `${tenantId}/class-days/${classDayId}`,
    method: 'put',
    data: {
      status,
      observation
    }
  })
}

export function CreateClassDayService(tenantId: string, hourStart: string, hourEnd: string, date: string, classId: string) {
  return api({
    url: `${tenantId}/class-days/`,
    method: 'post',
    data: {
      hourStart,
      hourEnd,
      date,
      classId
    }
  })
}