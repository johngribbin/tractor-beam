import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { colors, largeText } from "../constants";

import { connect } from "react-redux";

function ExternalAccounts(props) {
  _renderExternalAccounts = () => {
    const { externalAccounts } = props;

    return externalAccounts.map(externalAccount => (
      <View style={styles.accountContainer} key={externalAccount.address}>
        <Text style={{ ...largeText, ...styles.text }}>
          {externalAccount.name}
        </Text>
        {externalAccount.default ? (
          <Text style={styles.text}>default account</Text>
        ) : null}
        <View style={styles.textContainer}>
          <Text>{externalAccount.address}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.componentContainer}>
      {this._renderExternalAccounts()}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    externalAccounts: state.externalAccounts
  };
};

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 10,
    display: "flex",
    flex: 1
  },
  accountContainer: {
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    display: "flex",
    marginBottom: 10,
    padding: 5,
    width: "100%"
  },
  textContainer: {
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    borderRadius: 4,
    borderWidth: 1,
    padding: 5,
    width: "95%"
  },
  text: {
    color: "white",
    display: "flex"
  }
});

export default connect(
  mapStateToProps,
  null
)(ExternalAccounts);
