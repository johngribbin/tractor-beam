import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import { smallTextItalic, colors } from "../constants";

export default function RevealButton({ textStyle, revealed, onPress }) {
  return (
    <TouchableHighlight onPress={onPress}>
      {!revealed ? (
        <Text style={{ ...textStyle, ...smallTextItalic, ...styles.button }}>
          reveal
        </Text>
      ) : (
        <Text style={{ ...textStyle, ...smallTextItalic, ...styles.button }}>
          hide
        </Text>
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    color: colors.orange
  }
});
