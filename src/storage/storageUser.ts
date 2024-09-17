import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storageConfig";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";


export async function storageUserSave(user: IUserProfileDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: IUserProfileDTO = storage ? JSON.parse(storage) : {};

  return user
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}