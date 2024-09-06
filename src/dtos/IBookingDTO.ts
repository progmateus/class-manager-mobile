import { IUserCompletedDTO } from "./IUserCompletedDTO";

export type IBookingDTO = {
  id: string;
  userId: string;
  classDayId: string;
  user: IUserCompletedDTO;
  classDay: any;
}