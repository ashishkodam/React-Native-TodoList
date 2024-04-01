import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { store } from "./store/store";
import Input from "./screens/Input";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <View style={styles.container}>
          <Input />
          <TodoListScreen />
        </View>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
