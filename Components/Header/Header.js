import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  View,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ListItem from "./ListItem/ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
const COLORS = { primary: "#1f145c", white: "#fff" };
const Header = () => {
  const [textInput, setTextInput] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, task: "first task", completed: true },
    { id: 2, task: "second task", completed: false },
  ]);
  useEffect(() => {
    const getTodoFromUserDevice = async () => {
      try {
        const todos1 = await AsyncStorage.getItem("todos");
        if (todos1 != null) {
          setTodos(JSON.parse(todos1));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodoFromUserDevice();
  }, [todos]);

  useEffect(() => {
    const saveTodoUserDevice = async (todos) => {
      try {
        const stringifyTodos = JSON.stringify(todos);
        await AsyncStorage.setItem("@storage_Key", stringifyTodos);
      } catch (e) {
        console.log(e);
      }
    };

    saveTodoUserDevice();
  }, [todos]);

  const AddTodo = () => {
    if (textInput == "") {
      Alert.alert("Error", "please input");
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput(" ");
    }
  };
  const markTodoComplete = (todoid) => {
    const newTodos = todos.map((item) => {
      if (item.id == todoid) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (todoid) => {
    const newTodos = todos.filter((item) => item.id != todoid);
    setTodos(newTodos);
  };
  const clearTodo = () => {
    Alert.alert("Confirm", "clear todos", [
      {
        text: "Yes",
        onPress: () => setTodos([]),
      },
      { text: "No" },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "orange" }}>
      <View style={styles.hearder}>
        <Text style={styles.hearderText}>TODO APP</Text>
        <MaterialCommunityIcons
          name="delete"
          size={28}
          color="red"
          onPress={clearTodo}
        />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => (
          <ListItem
            todo={item}
            markTodoComplete={markTodoComplete}
            deleteTodo={deleteTodo}
          />
        )}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add todo"
            onChangeText={(text) => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={AddTodo}>
          <View style={styles.containerIcon}>
            <Ionicons
              name="add"
              value={textInput}
              color={COLORS.white}
              size={30}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  hearder: {
    padding: 20,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hearderText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    color: COLORS.white,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    marginHorizontal: 20,
    height: 50,
    marginRight: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  containerIcon: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
