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
  _onPressButton = () => {
    Alert.alert("you pressed a button!");
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.button} onPress={_onPressButton}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
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
    lineHeight: 15
  }
});
