import { IUserCompletedDTO } from "@dtos/users/IUserCompletedDTO";

export type IBookingDTO = {
  id: string;
  userId: string;
  classDayId: string;
  user: IUserCompletedDTO;
  classDay: any;
}