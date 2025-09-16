import { supabase } from "@/lib/supabase";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMsg(error.message);
    } else if (data.user) {
      router.replace("/dashboard/Dashboard");
    }
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Connexion</Text>
      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        style={globalStyles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMsg ? <Text style={globalStyles.error}>{errorMsg}</Text> : null}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/Signup")}>
        <Text style={globalStyles.link}>
          Pas encore de compte ? Créez-en un
        </Text>
      </TouchableOpacity>
    </View>
  );
}
