interface IUserDTO {
  id: string;
  name?: string;
  firstname?: string;
  lastName?: string;
  document?: string;
  email?: string
  password?: string;
  roles?: []
}
export { IUserDTO }