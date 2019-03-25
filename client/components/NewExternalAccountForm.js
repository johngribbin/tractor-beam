import React, { Component } from "react";
import { CheckBox } from "react-native-elements";

import { connect } from "react-redux";

import { colors, largeText } from "../constants";
import { View, Text, TextInput } from "react-native";

import MainButton from "../components/MainButton";

import {
  addExternalAccount,
  setDefaultExternalAccount
} from "../redux/actions";

class NewExternalAccountForm extends Component {
  state = {
    accountNickname: "",
    accountAddress: "",
    checked: false
  };

  _submitForm = () => {
    // when user has provided nicname and address, add to store
    if (this.state.accountNickname && this.state.accountAddress) {
      // add email to app state and set to default email
      this.props.addExternalAccount([
        {
          name: this.state.accountNickname,
          address: this.state.accountAddress,
          default: false
        }
      ]);
    }

    if (this.state.checked) {
      this.props.setDefaultExternalAccount(this.state.accountNickname);
    }
  };

  render() {
    return (
      <View style={styles.componentWrapper}>
        <View style={styles.formWrapper}>
          <Text style={{ ...styles.header, ...largeText }}>
            New External Account
          </Text>

          <Text style={styles.label}>New Account Nickname</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Example: Bob's Coinbase"
            onChangeText={accountNickname => this.setState({ accountNickname })}
          />

          <Text style={styles.label}>Account Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Example: 0x1f7439..."
            onChangeText={accountAddress => this.setState({ accountAddress })}
          />

          <CheckBox
            title="Make default external account"
            containerStyle={styles.checkbox}
            checked={this.state.checked}
            fontFamily={"barlow-regular"}
            textStyle={{ color: "white" }}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />

          <MainButton
            style={
              this.state.accountNickname && this.state.accountAddress
                ? {}
                : styles.button
            }
            title={"LINK ACCOUNT"}
            onPress={this._submitForm}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  componentWrapper: {
    alignItems: "center",
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    display: "flex",
    flex: 1,
    padding: 5
  },
  formWrapper: {
    flex: 1,
    paddingBottom: 30,
    paddingTop: 10,
    width: "90%"
  },
  header: {
    color: "white",
    paddingBottom: 10
  },
  label: {
    color: "white"
  },
  textInput: {
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 7.5
  },
  checkbox: {
    backgroundColor: colors.darkGrey,
    borderColor: colors.darkGrey,
    marginBottom: 10
  },
  button: {
    opacity: 0.5
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addExternalAccount: externalAccount => {
      dispatch(addExternalAccount(externalAccount));
    },
    setDefaultExternalAccount: accountName => {
      dispatch(setDefaultExternalAccount(accountName));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewExternalAccountForm);
