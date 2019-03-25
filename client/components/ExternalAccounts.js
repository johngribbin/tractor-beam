import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { colors, smallTextItalic, mediumText, largeText } from "../constants";

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
          <Text style={{ ...smallTextItalic, ...styles.text }}>
            default account
          </Text>
        ) : null}

        <View
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <View style={styles.addressContainer}>
            <Text>{externalAccount.address.substr(0, 5)}...</Text>
          </View>
          <Text style={{ ...smallTextItalic, ...styles.revealText }}>
            reveal
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.componentContainer}>
      <Text style={{ ...mediumText, ...styles.message }}>
        Currently linked external accounts:
      </Text>
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
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 10,
    display: "flex",
    flex: 1
  },
  message: {
    paddingBottom: 10
  },
  accountContainer: {
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    display: "flex",
    marginBottom: 10,
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: 30,
    paddingTop: 10,
    width: "100%"
  },
  addressContainer: {
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 5,
    padding: 5
    //width: "50%"
  },
  text: {
    color: "white",
    display: "flex"
  },
  revealText: {
    color: colors.orange,
    marginLeft: 5
  }
});

export default connect(
  mapStateToProps,
  null
)(ExternalAccounts);
