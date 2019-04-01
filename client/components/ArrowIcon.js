import React from "react";
import { TouchableHighlight, Image } from "react-native";

export default function ArrowIcon(props) {
  const { arrowType, onPress } = props;

  return (
    <TouchableHighlight onPress={onPress}>
      <Image
        source={
          arrowType === "up"
            ? require("../assets/images/UpArrow.png")
            : require("../assets/images/DownArrow.png")
        }
      />
    </TouchableHighlight>
  );
}
