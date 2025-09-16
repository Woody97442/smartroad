import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

export default function PrivateLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Slot />
    </SafeAreaView>
  );
}
