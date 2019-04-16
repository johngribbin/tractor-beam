import React, { Component } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { mediumTextBold, colors } from "../../app/constants";
import MainButton from "../../app/components/MainButton";
import { connect } from "react-redux";

import {
  updateContractBalance,
  updatingContractBalance,
  displayPseudoContractBalance,
  displayingPseudoContractBalance
} from "../../redux/actions";

import { ethers } from "ethers";

class TransferForm extends Component {
  state = {
    value: "",
    toAddress: "",
    toName: ""
  };

  componentDidMount() {
    const { externalAccounts } = this.props;

    // load in default external account if they have added one
    if (externalAccounts.length !== 0) {
      externalAccounts.map(account => {
        if (account.default) {
          this.setState({ toAddress: account.address });
          this.setState({ toName: account.name });
        }
      });
    }
  }

  _handleSend = () => {
    const { value, toAddress } = this.state;
    const {
      contractAccount,
      updatingContractBalance,
      updateContractBalance,
      displayPseudoContractBalance,
      displayingPseudoContractBalance
    } = this.props;

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
    updatingContractBalance(true);

    let provider = ethers.getDefaultProvider("rinkeby");
    let { privateKey } = contractAccount;
    let wallet = new ethers.Wallet(privateKey, provider);
    let sendPromise = wallet.sendTransaction({
      to: toAddress,
      value: ethers.utils.parseEther(value)
    });

    let gasPrice = "";

    sendPromise.then(tx => {
      console.log(tx);
      gasPrice = ethers.utils.formatEther(tx.gasPrice);
    });

    const valueAndGas = value + gasPrice;
    const pseudoContractBalance = contractAccount.balance - valueAndGas;

    displayPseudoContractBalance(pseudoContractBalance);
    displayingPseudoContractBalance(true);

    this.setState({
      value: "",
      toAddress: ""
    });

    // in 20 seconds, query the contract address balance on rinkeby network
    setTimeout(() => {
      updateContractBalance();
      displayingPseudoContractBalance(false);
      updatingContractBalance(false);
    }, 20000);
  };

  render() {
    const { value, toName, toAddress } = this.state;
    const { isUpdatingContractBalance } = this.props;

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
            value={toName ? toName : toAddress}
            onChangeText={address => this.setState({ toAddress: address })}
            style={styles.textInput}
            placeholder="Enter recipients ethereum address"
          />

          {isUpdatingContractBalance ? (
            <MainButton
              style={{ ...styles.button, ...{ opacity: 0.5 } }}
              title={"...PLEASE WAIT"}
            />
          ) : (
            <MainButton
              style={styles.button}
              title={"SEND"}
              onPress={this._handleSend}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

const mapStateToProps = state => {
  return {
    contractAccount: state.contractAccount,
    externalAccounts: state.externalAccounts,
    isUpdatingContractBalance: state.app.isUpdatingContractBalance
  };
};

const mapDispatchToProps = {
  displayPseudoContractBalance,
  displayingPseudoContractBalance,
  updatingContractBalance,
  updateContractBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferForm);
