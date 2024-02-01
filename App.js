import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from "react-native";
import Task from "./components/Task";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItem, setTaskItem] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItem([...taskItem, task]);
    setTask("");
  };

  const completeTask = (index) => {
    let itemCopy = [...taskItem];
    itemCopy.splice(index, 1);
    setTaskItem(itemCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {taskItem.length > 0 ? (
            taskItem.map((item, index) => {
              return (
                <Pressable key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </Pressable>
              );
            })
          ) : (
            <Text>Welcome to my fist app!</Text>
          )}
        </View>
      </View>

      {/* Write a task section  */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          onChangeText={(text) => setTask(text)}
          value={task}
          style={styles.input}
          placeholder={"Write a task"}
        ></TextInput>

        <Pressable onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
