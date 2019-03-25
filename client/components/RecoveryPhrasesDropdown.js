import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, largeText, smallTextItalic } from "../constants";
import ArrowIcon from "./ArrowIcon";

import { addPermissionedAccount } from "../redux/actions/index";
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
    const { permissionedAccounts } = this.props;

    return permissionedAccounts.map(account => {
      return (
        <View key={account.address} style={styles.addressContainer}>
          <Text style={styles.number}>
            {permissionedAccounts.indexOf(account) + 1}
            {". "}
          </Text>
          <Text style={styles.phrase}>
            {account.recoveryPhrase.substr(0, 15)}
          </Text>
          <Text style={{ ...smallTextItalic, ...styles.revealText }}>
            reveal
          </Text>
        </View>
      );
    });
  };

  _addRecoveryPhrase = () => {};

  render() {
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
    alignItems: "center"
  },
  title: {
    color: colors.orange
  },
  number: {},
  phrase: {
    backgroundColor: "white",
    padding: 5
  },
  revealText: {
    color: colors.orange
  }
});

const mapStateToProps = state => {
  return {
    permissionedAccounts: state.permissionedAccounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPermissionedAccount: account => {
      dispatch(addPermissionedAccount(account));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryPhrasesDropdown);
