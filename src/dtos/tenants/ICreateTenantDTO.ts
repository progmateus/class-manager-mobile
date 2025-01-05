interface ICreatetenantDTO {
  name: string;
  username: string;
  email: string;
  phone: string;
  description?: string;
  document: string;
  planId: string;
}

export { ICreatetenantDTO }