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

export function ListStudentsByClassService(tenantId: string, classId: string, { page, search }: IPaginationDTO) {
  return api({
    url: `${tenantId}/classes/${classId}/students`,
    method: 'get',
    params: {
      page,
      search
    }
  })
}

export function ListStudentClassesService(tenantId: string, userId: string) {
  return api({
    url: `${tenantId}/students`,
    method: 'get',
    params: {
      userId
    }
  })
}

export function ListTeachersByClassService(tenantId: string, classId: string, { page, search }: IPaginationDTO) {
  return api({
    url: `${tenantId}/classes/${classId}/teachers`,
    method: 'get',
    params: {
      page,
      search
    }
  })
}

export function ListTeacherClassesService(tenantId: string, userId: string) {
  return api({
    url: `${tenantId}/teachers`,
    method: 'get',
    params: {
      userId
    }
  })
}

export function UpdateManyStudentsClassesService(tenantId: string, usersIds: string[], classId: string) {
  return api({
    url: `${tenantId}/students/many`,
    method: 'put',
    data: {
      usersIds,
      classId
    },
    paramsSerializer: {
      indexes: true
    }
  })
}

export function UpdateOneStudentClassService(tenantId: string, userId: string, classId: string) {
  return api({
    url: `${tenantId}/students/one`,
    method: 'put',
    data: {
      userId,
      classId
    }
  })
}


export function UpdateTeacherClassService(tenantId: string, usersIds: string[], classId: string) {
  return api({
    url: `${tenantId}/teachers`,
    method: 'put',
    data: {
      usersIds,
      classId
    },
    paramsSerializer: {
      indexes: true
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

export function TransferStudentsClassService(tenantId: string, currentClassId: string, newclassId: string) {
  return api({
    url: `${tenantId}/classes/${currentClassId}/students/transfer`,
    method: 'patch',
    data: {
      toId: newclassId
    }
  })
}