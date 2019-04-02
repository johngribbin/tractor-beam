import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { colors, largeText, mediumText } from "../constants";
import ArrowIcon from "./ArrowIcon";
import RevealButton from "../components/RevealButton";
import MainButton from "../components/MainButton";

import { revealRecoveryPhrase, addPermissionedAccount } from "../redux/actions";

class RecoveryPhrasesDropdown extends Component {
  state = {
    isOpen: false
  };

  _toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
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
          <View style={styles.phraseContainer}>
            <Text style={styles.phrase}>
              {account.revealedRecoveryPhrase
                ? account.recoveryPhrase
                : account.recoveryPhrase.substr(0, 15)}
            </Text>
          </View>
          <View>
            <RevealButton
              textStyle={styles.revealText}
              onPress={() => revealRecoveryPhrase(account.recoveryPhrase)}
              revealed={account.revealedRecoveryPhrase}
            />
          </View>
        </View>
      );
    });
  };

  render() {
    const {
      permissionedAccounts,
      addPermissionedAccount,
      // a boolean used to conditionally render the button in dropdown
      generatingMnemonic
    } = this.props;

    return (
      <View style={styles.componentContainer}>
        <View style={styles.titleContainer}>
          <Text style={{ ...largeText, ...styles.title }}>
            Recovery Phrases{" "}
          </Text>
          <ArrowIcon
            arrowType={this.state.isOpen ? "up" : "down"}
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

        {this.state.isOpen && !generatingMnemonic ? (
          <MainButton
            style={styles.button}
            title={"+ ADD MORE"}
            onPress={addPermissionedAccount}
          />
        ) : null}
        {this.state.isOpen && generatingMnemonic ? (
          <MainButton style={styles.button} title={"...LOADING"} />
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
    alignItems: "center",
    marginTop: 10
  },
  title: {
    color: colors.orange
  },
  phraseContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  phrase: {
    backgroundColor: "white",
    marginRight: 5,
    padding: 5
  },
  revealText: {},
  button: {
    marginTop: 20
  }
});

const mapStateToProps = state => {
  return {
    generatingMnemonic: state.app.generatingMnemonic,
    permissionedAccounts: state.permissionedAccounts
  };
};

const mapDispatchToProps = {
  revealRecoveryPhrase,
  addPermissionedAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryPhrasesDropdown);
