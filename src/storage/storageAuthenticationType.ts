import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATION_TYPE_STORAGE } from "./storageConfig";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";
import { EAuthType } from "src/enums/EAuthType";


export async function storageAuthenticationTypeSave(type: EAuthType) {
  await AsyncStorage.setItem(AUTHENTICATION_TYPE_STORAGE, String(type))
}

export async function storageAuthenticationTypeGet(): Promise<EAuthType> {
  const storage = await AsyncStorage.getItem(AUTHENTICATION_TYPE_STORAGE);

  const type: EAuthType = storage ? JSON.parse(storage) : {};

  return type
}

export async function storageAuthenticationTypeRemove() {
  await AsyncStorage.removeItem(AUTHENTICATION_TYPE_STORAGE);
}