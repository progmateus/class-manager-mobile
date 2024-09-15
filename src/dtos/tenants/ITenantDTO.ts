import { EdocumentType } from "src/enums/EDocumentType";
import { ETenantStatus } from "src/enums/ETenantStatus";

interface ITenantDTO {
  id: string;
  name: string;
  document: string;
  documentType: EdocumentType;
  status: ETenantStatus;
  email: string;
  username: string;
  avatar: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export { ITenantDTO }