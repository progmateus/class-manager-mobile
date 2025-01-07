import { ScrollView, View } from "native-base";
import { ReactNode } from "react";
import { RefreshControl } from "react-native";

interface IProps {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

export function ScrollContainer({ children, isRefreshing = false, onRefresh }: IProps) {
  return (
    <ScrollView
      flex={1}
      px={4}
      py={8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ ScrollView>
  );
}