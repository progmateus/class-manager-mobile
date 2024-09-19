import { EClassDayStatus } from "src/enums/EClassDayStatus"
import { IClassDTO } from "./IClass"
import { IBookingDTO } from "@dtos/bookings/IBookingDTO"

export type ICLassDayDTO = {
  id: string,
  date: Date,
  hourStart: string,
  hourEnd: string,
  status: EClassDayStatus,
  observation: string,
  classId: string,
  class: IClassDTO
  bookings: IBookingDTO[],
  createdAt: Date,
  updatedAt: Date,

}