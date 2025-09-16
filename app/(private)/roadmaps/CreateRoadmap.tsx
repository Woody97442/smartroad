import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function CreateRoadmap() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [duration, setDuration] = useState("");

  async function handleCreateRoadmap() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      Alert.alert("Erreur", "Utilisateur non connecté");
      return;
    }

    if (!title || !theme || !duration) {
      Alert.alert("Champs requis", "Merci de remplir tous les champs");
      return;
    }

    const { error } = await supabase.from("roadmaps").insert({
      title,
      theme,
      duration: parseInt(duration),
      user_id: userData.user.id,
    });

    if (error) {
      Alert.alert("Erreur", error.message);
    } else {
      Alert.alert("Succès", "Roadmap créée avec succès !");
      router.replace("/");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez un titre"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Thème</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Voyage, Sport, Études..."
        value={theme}
        onChangeText={setTheme}
      />

      <Text style={styles.label}>Durée (en jours)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 30"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <Button
        title="Créer la Roadmap"
        onPress={handleCreateRoadmap}
      />
    </ScrollView>
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
});
