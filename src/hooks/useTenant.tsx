import { useContext } from 'react';
import { TenantContext } from 'src/contexts/TenantContext';


export function useTenant() {
  const context = useContext(TenantContext);

  return context;
}