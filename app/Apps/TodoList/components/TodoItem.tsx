import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Spacer from "./Spacer";
import Checkbox from "./Checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import todoStyles from "../todoStyles";

const TodoItem = ({
  id,
  item,
  onDelete,
  onCheck,
}: {
  id: string;
  item: string;
  onDelete: (id: string) => void;
  onCheck: (checked: boolean) => void;
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onCheck(checked);
  }, [checked]);

  const handleOnPress = () => {
    setChecked(!checked);
  };

  return (
    <View style={todoStyles.container}>
      <TouchableOpacity onPress={handleOnPress} style={styles.touchableContent}>
        <Checkbox checked={checked} size={30} />
        <Spacer x={10} />
        <Text>{item}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => onDelete(id)}
      >
        <Ionicons name="trash-bin-sharp" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginVertical: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "15%",
    backgroundColor: "#d62a1e",
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
});

export default TodoItem;
