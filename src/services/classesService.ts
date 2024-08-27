import { api } from "./api";

export function ListClassesService(tenantId: string) {
  return api({
    url: `${tenantId}/classes/`,
    method: 'get'
  })
}

export function CreateClassService(tenantId: string, name: string, description: string, businessHour: string,) {
  return api({
    url: `${tenantId}/classes/`,
    method: 'post',
    data: {
      name,
      description,
      businessHour
    }
  })
}

export function GetClassService(tenantId: string, classId: string,) {
  return api({
    url: `${tenantId}/classes/${classId}`,
    method: 'get'
  })
}

export function GetClassProfileService(tenantId: string, classId: string,) {
  return api({
    url: `${tenantId}/classes/${classId}/profile`,
    method: 'get'
  })
}

export function ListStudentsByClassHandler(tenantId: string, classId: string,) {
  return api({
    url: `${tenantId}/classes/${classId}/students`,
    method: 'get'
  })
}

export function ListTeachersByClassHandler(tenantId: string, classId: string,) {
  return api({
    url: `${tenantId}/classes/${classId}/teachers`,
    method: 'get'
  })
}