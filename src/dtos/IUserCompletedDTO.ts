interface IUserCompletedDTO {
  id: string;
  name: {
    firstName: string;
    lastName?: string;
  };
  email: {
    address: string;
  };
  avatar: string;
}
export { IUserCompletedDTO }