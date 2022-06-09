// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header/Header";
export default function App() {
  return (
    <View style={styles.container} screenOptions={{ HeaderShown: false }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
