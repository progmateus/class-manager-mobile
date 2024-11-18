import { api } from "./api";

export function ListClassesService(tenantId: string, { page = 1, search = "" }: IPaginationDTO) {
  return api({
    url: `${tenantId}/classes/`,
    method: 'get',
    params: {
      page,
      search
    }
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

export function ListStudentsByClassService(tenantId: string, classId: string, { page }: IPaginationDTO) {
  return api({
    url: `${tenantId}/classes/${classId}/students`,
    method: 'get',
    params: {
      page
    }
  })
}

export function ListTeachersByClassService(tenantId: string, classId: string, { page }: IPaginationDTO) {
  return api({
    url: `${tenantId}/classes/${classId}/teachers`,
    method: 'get',
    params: {
      page
    }
  })
}


export function ListUsersByRoleNameService(tenantId: string, roleName: "student" | "teacher") {
  return api({
    url: `${tenantId}/users-roles`,
    method: 'get',
    params: {
      roleName
    }
  })
}

export function UpdateStudentClassService(tenantId: string, userId: string, classId: string) {
  return api({
    url: `${tenantId}/students`,
    method: 'put',
    data: {
      userId,
      classId
    }
  })
}


export function UpdateTeacherClassService(tenantId: string, userId: string, classId: string) {
  return api({
    url: `${tenantId}/teachers`,
    method: 'put',
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

export function UpdateClasstimeTableService(tenantId: string, classId: string, timeTableId: string) {
  return api({
    url: `${tenantId}/classes/${classId}/time-table`,
    method: 'put',
    data: {
      timeTableId
    }
  })
}