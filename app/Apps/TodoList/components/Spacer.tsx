import { View } from "react-native";

const Spacer = ({ x, y }: { x?: number; y?: number }) => {
  x ??= 1;
  y ??= 1;
  
  return <View style={{ height: y, width: x }} />;
};

export default Spacer;
