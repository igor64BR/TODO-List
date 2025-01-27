import { Ionicons } from "@expo/vector-icons";
import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import todoStyles from "../todoStyles";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const NewTodo = ({
  onSave,
  onCancel,
}: {
  onSave: (text: string) => void;
  onCancel: () => void;
}) => {
  const [text, setText] = useState("");

  return (
    <View style={[todoStyles.container, { paddingLeft: 0 }]}>
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      <TextInput placeholder={'i.e.: "Bake a Cake! 🎂"'} style={styles.input} value={text} onChangeText={setText} />

      <TouchableOpacity style={styles.saveBtn} onPress={() => onSave(text)}>
        <Ionicons name="save-sharp" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#009900",
    padding: 10,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
  cancelBtn: {
    backgroundColor: "#d62a1e",
    padding: 10,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  input: {
    flex: 1,
    padding: 10,
  },
});

export default NewTodo;
