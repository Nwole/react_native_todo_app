import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
const COLORS = { primary: "#1f145c", white: "#fff" };
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const ListItem = ({ todo, markTodoComplete, deleteTodo }) => {
  return (
    <View style={styles.listItems}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: COLORS.primary,
            textDecorationLine: todo.completed ? "line-through" : "none",
          }}
        >
          {todo?.task}
        </Text>
      </View>

      {!todo.completed && (
        <TouchableOpacity
          style={[styles.actionIcon]}
          onPress={() => markTodoComplete(todo.id)}
        >
          <MaterialIcons name="done" color={COLORS.white} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.actionIcon, { backgroundColor: "red" }]}
        onPress={() => deleteTodo(todo.id)}
      >
        <MaterialIcons name="delete" color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItems: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 17,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
