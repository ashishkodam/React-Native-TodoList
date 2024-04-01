import { Pressable, StyleSheet, View } from "react-native";

const TodoItem = ({ id, text, onDeleteItem }) => {
  return (
    <View style={style.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={onDeleteItem.bind(this, id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
