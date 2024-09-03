import { Toast } from "native-base";

export function fireSuccesToast(message: string) {
  return Toast.show({
    title: message,
    placement: "top",
    color: "coolGray.100",
    bg: "success.600"
  })
}

export function fireErrorToast(message: string) {
  return Toast.show({
    title: message,
    placement: "top",
    color: "coolGray.100",
    bg: "red.500"
  })
}

export function fireWarningToast(message: string) {
  return Toast.show({
    title: message,
    placement: "top",
    color: "coolGray.100",
    bg: "yellow.500"
  })
}

export function fireInfoToast(message: string) {
  return Toast.show({
    title: message,
    placement: "top",
    color: "coolGray.100",
    bg: "blue.500"
  })
}