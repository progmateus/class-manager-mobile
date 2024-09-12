import { EClassDayStatus } from "src/enums/EClassDayStatus"
import { IClassDTO } from "./IClass"

export type ICLassDayDTO = {
  id: string,
  date: string,
  hourStart: string,
  hourEnd: string,
  status: EClassDayStatus,
  observation: string,
  classId: string,
  createdAt: Date,
  updatedAt: Date,
  class: IClassDTO
}