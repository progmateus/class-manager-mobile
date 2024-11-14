import { ILinkDTO } from "./ILinkDTO";

interface ITenantPreviewDTO {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  links: ILinkDTO[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export { ITenantPreviewDTO }