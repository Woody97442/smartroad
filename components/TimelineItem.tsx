import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children: React.ReactNode;
  isDone?: boolean;
};

export default function TimelineItem({ children, isDone }: Props) {
  return (
    <View style={styles.container}>
      {/* Timeline Column */}
      <View style={styles.timeline}>
        {/* Ligne du haut */}
        {<View style={[styles.line, { top: -10, bottom: "50%" }]} />}
        {/* Le point */}
        <View
          style={[
            styles.circle,
            { backgroundColor: isDone ? "#4caf50" : "#007bff" }, // Vert si done, bleu sinon
          ]}
        />
        {/* Ligne du bas */}
        {<View style={[styles.line, { top: "50%", bottom: -10 }]} />}
      </View>

      {/* Contenu de la carte */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 20,
  },
  timeline: {
    width: 20,
    alignItems: "center",
    position: "relative",
  },
  line: {
    position: "absolute",
    width: 2,
    backgroundColor: "#ccc",
    left: "50%",
    transform: [{ translateX: -1 }],
    zIndex: 0,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -5 }],
    left: "50%",
    marginLeft: -5,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingLeft: 8,
  },
});
