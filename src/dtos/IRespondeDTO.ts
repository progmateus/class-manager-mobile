interface IResponseDTO {
  isSuccess?: boolean;
  message?: string;
  data?: any;
  errors?: any[];
  status: number;
}