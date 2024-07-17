import { ScrollView, View } from "native-base";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode
}

export function ScrollContainer({ children }: IProps) {
  return (
    <ScrollView flex={1} px={4} py={8}>
      {children}
    </ScrollView>
  );
}