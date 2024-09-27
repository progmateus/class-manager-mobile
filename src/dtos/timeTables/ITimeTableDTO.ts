import { ISCheduleDayDTO } from "./IScheduleDayDTO";

interface ITimeTableDTO {
  id: string;
  name: string;
  schedulesDays: ISCheduleDayDTO[];
}

export { ITimeTableDTO }