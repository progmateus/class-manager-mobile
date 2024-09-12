interface ITenantPlanDTO {
  id: string;
  name: string;
  description: string;
  timesOfweek: number;
  price: number;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export { ITenantPlanDTO }