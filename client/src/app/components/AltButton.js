import React from "react";
import { colors } from "../constants";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function MainButton(props) {
  return (
    <View>
      <TouchableHighlight
        underlayColor="none"
        style={
          props.style ? { ...styles.button, ...props.style } : styles.button
        }
        onPress={props.onPress}
      >
        <Text style={{ ...styles.buttonText }}>{props.title}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderColor: colors.orange,
    borderWidth: 5,
    padding: 10
  },
  buttonText: {
    fontFamily: "barlow-bold",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 15,
    color: colors.orange,
    textAlign: "center"
  }
});
