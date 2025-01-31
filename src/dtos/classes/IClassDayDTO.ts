import { EClassDayStatus } from "src/enums/EClassDayStatus"
import { IClassDTO } from "./IClassDTO"
import { IBookingDTO } from "@dtos/bookings/IBookingDTO"

export type ICLassDayDTO = {
  id: string,
  date: Date,
  name: string,
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