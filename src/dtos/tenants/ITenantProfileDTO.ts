import { EdocumentType } from "src/enums/EDocumentType";
import { ETenantStatus } from "src/enums/ETenantStatus";
import { ILinkDTO } from "./ILinkDTO";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";

interface ITenantProfileDTO {
  id: string;
  name: string;
  document: string;
  documentType: EdocumentType;
  status: ETenantStatus;
  subscriptionStatus: ESubscriptionStatus;
  email: string;
  username: string;
  avatar: string;
  links: ILinkDTO[];
  description?: string;
  stripeChargesEnabled: boolean;
  stripeOnboardUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export { ITenantProfileDTO }