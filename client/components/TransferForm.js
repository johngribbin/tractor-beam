import React, { Component } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { mediumTextBold, colors } from "../constants";
import MainButton from "../components/MainButton";
import { connect } from "react-redux";

import { ethers } from "ethers";

class TransferForm extends Component {
  state = {
    value: "",
    to: ""
  };

  componentDidMount() {
    const { externalAccounts } = this.props;

    // load in default external account if they have added one
    if (externalAccounts.length !== 0) {
      externalAccounts.map(account => {
        if (account.default) {
          this.setState({ to: account.address });
        }
      });
    }
  }

  _handleSend = () => {
    const { value, to } = this.state;
    const { contractAccount } = this.props;

    // insufficient funds error
    if (value > contractAccount.balance) {
      Alert.alert(
        "Error!",
        "Insufficient funds. Please examine your account balance before attempting to complete this transfer",
        [
          {
            text: "close",
            onPress: () => this.setState({ value: "" })
          }
        ],
        { cancelable: false }
      );
    }

    let provider = ethers.getDefaultProvider("rinkeby");
    let { privateKey } = contractAccount;
    let wallet = new ethers.Wallet(privateKey, provider);
    let sendPromise = wallet.sendTransaction({
      to: to,
      value: ethers.utils.parseEther(value)
    });

    sendPromise.then(tx => {
      console.log(tx);
    });
  };

  render() {
    const { value, to } = this.state;

    return (
      <View style={styles.componentContainer}>
        <View style={styles.formWrapper}>
          <Text style={{ ...styles.label, ...mediumTextBold }}>Value</Text>
          <TextInput
            value={value}
            onChangeText={value => this.setState({ value })}
            style={styles.textInput}
            placeholder=""
          />

          <Text style={{ ...styles.label, ...mediumTextBold }}>To</Text>
          <TextInput
            value={to}
            onChangeText={address => this.setState({ to: address })}
            style={styles.textInput}
            placeholder="Enter recipients ethereum address"
          />

          <MainButton
            style={styles.button}
            title={"SEND"}
            onPress={this._handleSend}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  componentContainer: {
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    display: "flex",
    flex: 1,
    padding: 20
  },
  formContainer: {
    flex: 1,
    paddingBottom: 30,
    paddingTop: 10,
    width: "90%"
  },
  header: {
    color: "white",
    marginBottom: 20
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
  button: {
    marginTop: 20
  }
};

const mapStateToProps = state => {
  return {
    contractAccount: state.contractAccount,
    externalAccounts: state.externalAccounts
  };
};

export default connect(
  mapStateToProps,
  null
)(TransferForm);
