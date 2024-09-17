import AsyncStorage from "@react-native-async-storage/async-storage";
import { TENANT_STORAGE } from "./storageConfig";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";


export async function storageTenantSave(tenant: ITenantDTO) {
  await AsyncStorage.setItem(TENANT_STORAGE, JSON.stringify(tenant))
}

export async function storageTenantGet() {
  const storage = await AsyncStorage.getItem(TENANT_STORAGE);

  const tenant: ITenantDTO = storage ? JSON.parse(storage) : {};

  return tenant
}

export async function storageTenantRemove() {
  await AsyncStorage.removeItem(TENANT_STORAGE);
}