import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATION_TYPE_STORAGE } from "./storageConfig";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";


export async function storageAuthenticationTypeSave(type: "user" | "tenant") {
  await AsyncStorage.setItem(AUTHENTICATION_TYPE_STORAGE, JSON.stringify(type))
}

export async function storageAuthenticationTypeGet(): Promise<"tenant" | "user"> {
  const storage = await AsyncStorage.getItem(AUTHENTICATION_TYPE_STORAGE);

  const type: "tenant" | "user" = storage ? JSON.parse(storage) : {};

  return type
}

export async function storageAuthenticationTypeRemove() {
  await AsyncStorage.removeItem(AUTHENTICATION_TYPE_STORAGE);
}