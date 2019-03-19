import React from "react";
import { colors } from "../constants";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from "react-native";

export default function MainButton(props) {
  return (
    <View>
      <TouchableHighlight
        style={
          props.style ? { ...styles.button, ...props.style } : styles.button
        }
        onPress={props.onPress}
      >
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: colors.orange,
    padding: 10
  },
  buttonText: {
    color: "white",
    //fontFamily: "Barlow"
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 15,
    textAlign: "center"
  }
});
