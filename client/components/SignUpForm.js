import React, { Component } from "react";
import { connect } from "react-redux";

import { colors, largeText, mediumTextBold, mediumText } from "../constants";
import { View, Text, TextInput } from "react-native";

import MainButton from "../components/MainButton";

import { addEmail, logIn } from "../redux/actions";

class SignUpForm extends Component {
  state = {
    email: "",
    password: ""
  };

  _submitForm = () => {
    // when user has provided email and password, log them in and hide the form
    if (this.state.email && this.state.password) {
      // add email to app state and set to default email
      this.props.addEmail([
        {
          address: this.state.email,
          default: true
        }
      ]);
      // switch isLoggedIn state property to true
      this.props.logIn();
      // hide the form component from ClaimGift component
      this.props.hideForm();
    }
  };

  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={{ ...largeText, ...styles.header }}>Sign Up</Text>
        <Text style={{ ...mediumText, ...styles.subHeader }}>
          Submit an email and password to sign up and claim your gifts
        </Text>
        <View style={styles.formContainer}>
          <Text style={{ ...mediumTextBold, ...styles.label }}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="example@example.com"
            onChangeText={email => this.setState({ email })}
          />

          <Text style={{ ...mediumTextBold, ...styles.label }}>Password</Text>
          <TextInput
            type="password"
            style={styles.textInput}
            placeholder="password"
            onChangeText={password => this.setState({ password })}
          />

          <MainButton
            style={this.state.email && this.state.password ? {} : styles.button}
            title={"SIGN UP"}
            onPress={this._submitForm}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  componentContainer: {
    display: "flex"
  },
  formContainer: {
    alignSelf: "center",
    marginTop: 10,
    width: "90%"
  },
  header: {
    marginBottom: 10
  },
  subHeader: {
    marginBottom: 10
  },
  label: {},
  textInput: {
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 7.5
  },
  button: {
    marginTop: 10,
    opacity: 0.5
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addEmail: email => {
      dispatch(addEmail(email));
    },
    logIn: () => {
      dispatch(logIn());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);
