import { supabase } from "@/lib/supabase";
import { headerStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  const router = useRouter();
  const [userFullName, setUserFullName] = useState("Utilisateur");

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.user_metadata?.full_name) {
        setUserFullName(data.user.user_metadata.full_name);
      }
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/auth/Login");
  }

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView
      edges={["top"]}
      style={headerStyles.safeArea}>
      <View style={headerStyles.header}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <View style={headerStyles.logoContainer}>
            <Image
              source={require("@/assets/images/logo_nav.png")}
              style={headerStyles.logo}
            />
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text style={headerStyles.title_logo}>SmartRoad</Text>
              <Text style={headerStyles.sb_title_logo}>
                votre chemin, votre rythme
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={headerStyles.userInfo}>
          <Text style={headerStyles.userName}>{userFullName}</Text>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }} // avatar utilisateur
              style={headerStyles.avatar}
            />
          </TouchableOpacity>
          {menuVisible && (
            <View style={headerStyles.menu}>
              <TouchableOpacity
                onPress={handleLogout}
                style={headerStyles.menuItem}>
                <Text style={{ color: "red" }}>Déconnexion</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
