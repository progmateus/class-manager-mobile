interface IUserCompletedDTO {
  id: string;
  name: {
    firstName: string;
    lastName?: string;
  };
  username: string;
  email: {
    address: string;
  };
  avatar: string;
}
export { IUserCompletedDTO }