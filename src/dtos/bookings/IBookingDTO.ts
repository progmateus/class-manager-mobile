import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";

export type IBookingDTO = {
  id: string;
  userId: string;
  classDayId: string;
  user: IUserPreviewDTO;
  classDay: any;
}