import { api } from "./api";

export function CreateTimeTableService(name: string, tenantId: string) {
  return api({
    url: `${tenantId}/times-tables`,
    method: 'post',
    data: {
      name
    }
  })
}

export function UpdateTimeTableService(data: any, tenantId: string, timeTableId: string) {
  return api({
    url: `${tenantId}/times-tables/${timeTableId}`,
    method: 'put',
    data
  })
}

export function GetTimeTableService(timeTableId: string, tenantId: string) {
  return api({
    url: `${tenantId}/times-tables/${timeTableId}`,
    method: 'get',
  })
}

export function ListTimesTablesService(tenantId: string, { page }: IPaginationDTO) {
  return api({
    url: `${tenantId}/times-tables`,
    method: 'get',
    params: {
      page
    }
  })
}