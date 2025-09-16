import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddTasks() {
  const { roadmapId } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isDone, setIsDone] = useState(false);

  async function handleAddTask() {
    if (!roadmapId || typeof roadmapId !== "string") {
      Alert.alert("Erreur", "Roadmap non spécifiée.");
      return;
    }

    if (!title || !description || !dueDate) {
      Alert.alert("Champs requis", "Merci de remplir tous les champs");
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      title,
      description,
      due_date: dueDate,
      is_done: isDone,
      roadmap_id: roadmapId,
    });

    if (error) {
      Alert.alert("Erreur", error.message);
    } else {
      Alert.alert("Succès", "Tâche ajoutée !");
      setTitle("");
      setDescription("");
      setDueDate("");
      setIsDone(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez un titre"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Date limite (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-08-20"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <View style={styles.switchRow}>
        <Text>Déjà terminée ?</Text>
        <Switch
          value={isDone}
          onValueChange={setIsDone}
        />
      </View>

      <Button
        title="Ajouter la tâche"
        onPress={handleAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
