import TaskList from "@/components/TaskList";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  is_done: boolean;
};

export default function RoadmapDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [roadmapTitle, setRoadmapTitle] = useState("");

  useEffect(() => {
    if (id) fetchTasks(id);
  }, [id]);

  async function fetchTasks(roadmapId: string) {
    setLoading(true);

    const { data: roadmap, error: roadmapError } = await supabase
      .from("roadmaps")
      .select("title")
      .eq("id", roadmapId)
      .single();

    if (roadmapError || !roadmap) return;

    setRoadmapTitle(roadmap.title);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("roadmap_id", roadmapId)
      .order("due_date", { ascending: true });

    if (!error && data) setTasks(data);
    setLoading(false);
  }

  async function toggleTaskStatus(taskId: string, currentStatus: boolean) {
    const { error } = await supabase
      .from("tasks")
      .update({ is_done: !currentStatus })
      .eq("id", taskId);

    if (!error) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, is_done: !currentStatus } : task
        )
      );
    }
  }

  if (loading) {
    return <Text style={{ padding: 20 }}>Chargement des tâches...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tâches pour : {roadmapTitle}</Text>
      {tasks.length === 0 ? (
        <Text>Aucune tâche encore définie.</Text>
      ) : (
        <TaskList
          tasks={tasks}
          toggleTaskStatus={toggleTaskStatus}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          router.push(`/roadmaps/AddTasks?roadmapId=${id}`);
        }}>
        <Text style={styles.addButtonText}>➕ Ajouter une tâche</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    padding: 20,
    gap: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  dueDate: {
    marginTop: 4,
    fontSize: 12,
    fontStyle: "italic",
    color: "#555",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
