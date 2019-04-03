import React from "react";
import { colors } from "../constants";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function MainButton(props) {
  return (
    <View style={styles.componentWrapper}>
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
  componentWrapper: {
    flex: 1
  },
  button: {
    borderRadius: 5,
    backgroundColor: colors.orange,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: colors.lightGrey,
    shadowOffset: { height: 0, width: 0 },
    padding: 10
  },
  buttonText: {
    fontFamily: "barlow-bold",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 15,
    color: "white",
    textAlign: "center"
  }
});
