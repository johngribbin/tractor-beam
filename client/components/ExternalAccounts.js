import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import RevealButton from "../components/RevealButton";

import { colors, smallTextItalic, mediumText, largeText } from "../constants";

import { revealExternalAccountAddress } from "../redux/actions";
import { connect } from "react-redux";

class ExternalAccounts extends Component {
  _renderExternalAccounts = () => {
    const { externalAccounts, revealExternalAccountAddress } = this.props;

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
            <Text>
              {externalAccount.revealedAddress
                ? externalAccount.address
                : `${externalAccount.address.substr(0, 5)}...`}
            </Text>
          </View>
          <RevealButton
            onPress={() => revealExternalAccountAddress(externalAccount.name)}
            revealed={externalAccount.revealedAddress}
            textStyle={styles.revealText}
          />
        </View>
      </View>
    ));
  };

  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={{ ...mediumText, ...styles.message }}>
          Currently linked external accounts:
        </Text>
        {this._renderExternalAccounts()}
      </View>
    );
  }
}

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
    marginLeft: 5
  }
});

const mapStateToProps = state => {
  return {
    externalAccounts: state.externalAccounts
  };
};

const mapDispatchToProps = {
  revealExternalAccountAddress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalAccounts);
