import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, largeText, mediumText } from "../constants";
import ArrowIcon from "./ArrowIcon";
import RevealButton from "../components/RevealButton";

import { revealRecoveryPhrase } from "../redux/actions/index";
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryPhrasesDropdown);
