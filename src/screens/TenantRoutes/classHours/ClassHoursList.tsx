import { ClassDayHourItem } from "@components/Class/HoursItem/ClassDayHourItem";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { HStack, PresenceTransition, Text, View, VStack } from "native-base";
import { ArrowDown, CaretDown, Trash, TrashSimple } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { THEME } from "src/theme";

export function ClassHoursList() {

  return (
    <View flex={1}>
      <PageHeader title="Jornadas" />
      <ScrollContainer>
        <ClassDayHourItem />
      </ScrollContainer>
    </View >
  )
}