interface IApiResponse {
  data: []
  errors: IError[],
  isSucces: boolean,
  status: number
}

interface IError {
  property: string;
  message: string;
}

export { IApiResponse, IError }