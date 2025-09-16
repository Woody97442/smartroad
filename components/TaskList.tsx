import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import TimelineItem from "./TimelineItem";

export default function TaskList({ tasks, toggleTaskStatus }: any) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item, index }) => {
        const isFirst = index === 0;
        const isLast = index === tasks.length - 1;

        const cardStyle = [
          styles.card,
          item.is_done && { backgroundColor: "#eee" },
        ];

        const titleStyle = [
          styles.taskTitle,
          item.is_done && {
            textDecorationLine: "line-through" as const,
            color: "#555",
          },
        ];

        const descriptionStyle = item.is_done ? { color: "#777" } : {};
        const dueDateStyle = [
          styles.dueDate,
          item.is_done && { color: "#777" },
        ];

        return (
          <TimelineItem isDone={item.is_done}>
            <View style={cardStyle}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={titleStyle}>{item.title}</Text>
                  <Text style={descriptionStyle}>{item.description}</Text>
                  <Text style={dueDateStyle}>
                    À faire pour le :{" "}
                    {new Date(item.due_date).toLocaleDateString()}
                  </Text>
                </View>

                <Checkbox
                  status={item.is_done ? "checked" : "unchecked"}
                  onPress={() => toggleTaskStatus(item.id, item.is_done)}
                />
              </View>
            </View>
          </TimelineItem>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#888",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
