import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, largeText, mediumText } from "../constants";
import ArrowIcon from "./ArrowIcon";
import RevealButton from "../components/RevealButton";
import MainButton from "../components/MainButton";

import { Wallet } from "ethers";

import {
  revealRecoveryPhrase,
  addPermissionedAccount
} from "../redux/actions/index";
import { connect } from "react-redux";

class RecoveryPhrasesDropdown extends Component {
  state = {
    isOpen: false
  };

  _toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  _addRecoveryPhrase = async () => {
    let mnemonic = "";

    try {
      let response = await fetch(
        "https://kenanoneal.com:8080/generateMnemonic",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            Accept: "application/json"
          }
        }
      );
      const mnemonicObj = JSON.parse(response._bodyText);
      mnemonic = mnemonicObj.mnemonic;
    } catch (error) {
      console.log(error);
    }

    const permissionedAccount = await Wallet.fromMnemonic(mnemonic);

    this.props.addPermissionedAccount([
      {
        recoveryPhrase: permissionedAccount.mnemonic,
        address: permissionedAccount.address,
        balance: 0,
        linkedContract: this.props.contractAccount.address,
        default: false,
        revealedRecoveryPhrase: false
      }
    ]);
  };

  _renderRecoveryPhrases = () => {
    const { permissionedAccounts, revealRecoveryPhrase } = this.props;

    return permissionedAccounts.map(account => {
      return (
        <View key={account.address} style={styles.addressContainer}>
          <Text style={styles.number}>
            {permissionedAccounts.indexOf(account) + 1}
            {". "}
          </Text>
          <Text style={styles.phrase}>
            {account.revealedRecoveryPhrase
              ? account.recoveryPhrase
              : account.recoveryPhrase.substr(0, 15)}
          </Text>
          <RevealButton
            textStyle={styles.revealText}
            onPress={() => revealRecoveryPhrase(account.recoveryPhrase)}
            revealed={account.revealedRecoveryPhrase}
          />
        </View>
      );
    });
  };

  render() {
    const { permissionedAccounts } = this.props;
    console.log(permissionedAccounts);

    return (
      <View style={styles.componentContainer}>
        <View style={styles.titleContainer}>
          <Text style={{ ...largeText, ...styles.title }}>
            Recovery Phrases{" "}
          </Text>
          <ArrowIcon
            arrowType={this.state.isOpen ? "down" : "up"}
            onPress={this._toggleDropdown}
          />
        </View>
        {permissionedAccounts.length === 1 ? (
          <Text style={mediumText}>
            You currently have one recovery phrase. You should have at least
            two.
          </Text>
        ) : null}
        {this.state.isOpen ? this._renderRecoveryPhrases() : null}
        {this.state.isOpen ? (
          <MainButton
            style={styles.button}
            title={"+ ADD MORE"}
            onPress={this._addRecoveryPhrase}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  componentContainer: {},
  titleContainer: {
    display: "flex",
    flexDirection: "row"
  },
  addressContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 10
  },
  title: {
    color: colors.orange
  },
  number: {},
  phrase: {
    backgroundColor: "white",
    marginRight: 5,
    padding: 5
  },
  revealText: {
    marginTop: 5
  },
  button: {
    marginTop: 20
  }
});

const mapStateToProps = state => {
  return {
    permissionedAccounts: state.permissionedAccounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    revealRecoveryPhrase: recoveryPhrase => {
      dispatch(revealRecoveryPhrase(recoveryPhrase));
    },
    addPermissionedAccount: account => {
      dispatch(addPermissionedAccount(account));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryPhrasesDropdown);
