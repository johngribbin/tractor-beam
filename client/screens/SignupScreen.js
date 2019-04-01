import React, { Component } from "react";
import { View, Text, Input, StyleSheet } from "react-native";
import { mediumText, largeTextBold, colors } from "../constants/";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";

export default class SignupScreen extends Component {
  /*
  static navigationOptions = {
    header: props => <Header {...props} />,
    title: "SignupScreen"
  };
  */

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.componentContainer}>
        <Text style={{ ...largeTextBold, ...styles.header }}>Sign Up</Text>
        <Text style={{ ...mediumText, ...styles.subHeader }}>
          Submit an email and password to sign up and claim your gift
        </Text>
        <SignUpForm navigate={navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  componentContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.mainBackground,
    padding: 10,
    paddingTop: 110
  },
  header: {
    marginBottom: 10
  },
  subHeader: {
    marginBottom: 10
  }
});
