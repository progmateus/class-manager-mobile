interface ICreatetenantDTO {
  name: string;
  username: string;
  email: string;
  number: string;
  description?: string;
  document: string;
  planId: string;
}

export { ICreatetenantDTO }