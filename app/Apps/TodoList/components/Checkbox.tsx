import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Checkbox({
  checked,
  size,
}: {
  checked: boolean;
  size?: number;
}) {
  size ??= 20;

  if (checked) return <MaterialCommunityIcons name="checkbox-outline" size={size} color="black" />;

  return <MaterialCommunityIcons name="checkbox-blank-outline" size={size} color="black" />;
}
