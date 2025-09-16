import { supabase } from "@/lib/supabase";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // stocké dans user.user_metadata
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.replace("/dashboard/Dashboard");
    }
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Inscription</Text>
      <TextInput
        placeholder="Nom complet"
        value={fullName}
        onChangeText={setFullName}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={globalStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={globalStyles.input}
        secureTextEntry
      />
      {errorMsg ? <Text style={globalStyles.error}>{errorMsg}</Text> : null}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSignup}>
        <Text style={globalStyles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/auth/Login")}>
        <Text style={globalStyles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}
