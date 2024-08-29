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

export function ListStudentsByClassService(tenantId: string, classId: string,) {
  return api({
    url: `${tenantId}/classes/${classId}/students`,
    method: 'get'
  })
}

export function ListTeachersByClassService(tenantId: string, classId: string,) {
  return api({
    url: `${tenantId}/classes/${classId}/teachers`,
    method: 'get'
  })
}


export function ListUsersByRoleNameService(tenantId: string, roleName: "student" | "teacher") {
  return api({
    url: `${tenantId}/users-roles/users`,
    method: 'get',
    params: {
      roleName
    }
  })
}

export function AddStudentToClassService(tenantId: string, userId: string, classId: string) {
  return api({
    url: `${tenantId}/students`,
    method: 'post',
    data: {
      userId,
      classId
    }
  })
}


export function AddTeacherToClassService(tenantId: string, userId: string, classId: string) {
  return api({
    url: `${tenantId}/teachers`,
    method: 'post',
    data: {
      userId,
      classId
    }
  })
}


export function RemoveStudentFromClassService(tenantId: string, studentClassId: string, classId: string) {
  return api({
    url: `${tenantId}/students/${studentClassId}`,
    method: 'delete'
  })
}


export function RemoveTeacherFromClassService(tenantId: string, teacherClassId: string, classId: string) {
  return api({
    url: `${tenantId}/teachers/${teacherClassId}`,
    method: 'delete'
  })
}