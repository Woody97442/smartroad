import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();
  return (
    <View style={globalStyles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={globalStyles.logo}
      />
      <Text style={globalStyles.title}>Bienvenue sur SmartRoad</Text>
      <Text style={globalStyles.subtitle}>
        Votre planificateur intelligent de vie.
      </Text>
      {/* Optionnel : carrousel explicatif */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.push("/auth/Login")}>
        <Text style={globalStyles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}
