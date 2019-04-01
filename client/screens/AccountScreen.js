import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import {
  colors,
  smallText,
  headlineText,
  mediumText,
  mediumTextBold
} from "../constants";

import LinkExternalAccount from "../components/LinkExternalAccount";
import UpgradeSecurity from "../components/UpgradeSecurity";

import { connect } from "react-redux";
import { revealContractAddress } from "../redux/actions";
import RevealButton from "../components/RevealButton";

class AccountScreen extends React.Component {
  render() {
    const { emails, contractAccount } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.accountContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={headlineText}>YOUR ACCOUNT</Text>
          <Text style={headlineText}>
            {`$ `}
            {contractAccount.balance}
          </Text>

          {emails.length ? (
            <View>
              <View style={styles.emailInfoContainer}>
                <Text style={mediumTextBold}>Email</Text>
                <Text>
                  {emails.map(email => {
                    if (email.default === true) {
                      return email.address;
                    }
                  })}
                </Text>
                <Text style={{ ...smallText, ...styles.changeText }}>
                  change
                </Text>
              </View>
              <View style={styles.passwordInfoContainer}>
                <Text style={mediumTextBold}>Password</Text>
                <Text>*************</Text>
                <Text style={{ ...smallText, ...styles.changeText }}>
                  change
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.contractAccountInfoContainer}>
            <Text style={{ ...mediumTextBold, ...styles.accountAddressText }}>
              Account Address
            </Text>
            <Text style={{ ...mediumText, ...styles.contractAccountAddress }}>
              {contractAccount.revealedAddress
                ? contractAccount.address
                : `${contractAccount.address.substr(0, 5)}...`}
            </Text>
            <RevealButton
              onPress={() =>
                this.props.revealContractAddress(contractAccount.Address)
              }
              revealed={contractAccount.revealedAddress}
            />
          </View>

          <View style={styles.buttonContainer}>
            <LinkExternalAccount onPress={() => navigate("ExternalAccounts")} />
            <UpgradeSecurity onPress={() => navigate("UpgradeSecurity")} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    backgroundColor: colors.mainBackground
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    paddingTop: 110
  },
  emailInfoContainer: {
    alignItems: "center",
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 20
  },
  passwordInfoContainer: {
    alignItems: "center",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    marginBottom: 20
  },
  changeText: {
    color: colors.orange
  },
  contractAccountInfoContainer: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    width: "100%"
  },
  contractAddressText: {
    flex: 1
  },
  contractAccountAddress: {
    flex: 1,
    padding: 5
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});

const mapStateToProps = state => {
  return {
    contractAccount: state.contractAccount,
    emails: state.emails
  };
};

const mapDispatchToProps = {
  revealContractAddress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
