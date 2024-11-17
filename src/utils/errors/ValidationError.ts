import { IError } from "@dtos/shared/IApiResponse";

export class ValidationError {
  message: string;
  errors: IError[];

  constructor(message: string, errors: IError[]) {
    this.message = message;
    this.errors = errors;
  }
}