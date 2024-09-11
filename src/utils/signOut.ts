import { storageAuthTokenRemove } from "@storage/storageAuthToken";
import { storageUserRemove } from "@storage/storageUser";

export const signOut = async () => {
  await Promise.all([
    await storageUserRemove(),
    await storageAuthTokenRemove()
  ])
}