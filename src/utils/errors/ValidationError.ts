import { IError } from "@dtos/IApiResponse";

export class ValidationError {
  errors: IError[];

  constructor(errors: IError[]) {
    this.errors = errors;
  }
}