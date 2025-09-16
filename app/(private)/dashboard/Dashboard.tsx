import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Roadmap = {
  id: string;
  title: string;
  theme: string;
  duration: number;
  created_at: string;
};

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRoadmaps = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data, error } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) setRoadmaps(data as Roadmap[]);
    } catch (error) {
      console.error("Erreur lors du chargement des roadmaps :", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoadmaps();
  }, [fetchRoadmaps]);

  if (loading) {
    return <Text style={styles.loading}>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Roadmaps</Text>

      <FlatList
        data={roadmaps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/roadmaps/${item.id}`)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>Thème : {item.theme}</Text>
            <Text>Durée : {item.duration} jours</Text>
            <Text style={styles.cardDate}>
              Créé le {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noRoadmaps}>
            Vous n'avez pas encore de roadmap. Créez-en une ci-dessous !
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/roadmaps/CreateRoadmap")}>
        <Text style={styles.createButtonText}>➕ Nouvelle Roadmap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loading: {
    padding: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardDate: {
    fontStyle: "italic",
    fontSize: 12,
    color: "#555",
  },
  noRoadmaps: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
    fontStyle: "italic",
  },
  createButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
