import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";

const FloatingAddButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <AntDesign name="plus" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,

    padding: 20,
    backgroundColor: "#ebc934",

    borderRadius: 50,
  },
});

export default FloatingAddButton;
