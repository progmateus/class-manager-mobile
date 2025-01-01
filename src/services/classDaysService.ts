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

export function CreateClassDayService(tenantId: string, name: string, hourStart: string, hourEnd: string, date: string, classId: string) {
  return api({
    url: `${tenantId}/class-days/`,
    method: 'post',
    data: {
      name,
      hourStart,
      hourEnd,
      date,
      classId
    }
  })
}

export function ListClassDaysService(date: Date, { tenantId, page }: IUserAndTenantPaginationDTO) {
  return api({
    url: `class-days`,
    method: 'get',
    params: {
      page,
      tenantId,
      date
    }
  })
}

export function ListClassDayBookingsService(classDayId: string, { tenantId, page }: IUserAndTenantPaginationDTO) {
  return api({
    url: `${tenantId}/class-days/${classDayId}/bookings`,
    method: 'get',
    params: {
      page,
      tenantId
    }
  })
}