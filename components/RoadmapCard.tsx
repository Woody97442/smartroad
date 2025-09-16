import { globalStyles } from "@/styles/global";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function RoadmapCard({ roadmap, onPress }: any) {
  return (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={onPress}>
      <Text style={globalStyles.title}>{roadmap.title}</Text>
      <Text>Thème : {roadmap.theme}</Text>
      <Text>Progression : {roadmap.progress}%</Text>
      <Text>
        Du {roadmap.startDate} au {roadmap.endDate}
      </Text>
      <Text>Status : {roadmap.status}</Text>
    </TouchableOpacity>
  );
}
