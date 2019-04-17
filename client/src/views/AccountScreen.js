import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import {
  colors,
  smallText,
  headlineText,
  mediumText,
  mediumTextBold
} from "../app/constants";

import LinkExternalAccount from "../externalAccounts/components/LinkExternalAccount";
import UpgradeSecurity from "../permissionedAccounts/components/UpgradeSecurity";

import { connect } from "react-redux";
import { revealContractAddress } from "../redux/actions";
import RevealButton from "../app/components/RevealButton";

class AccountScreen extends React.Component {
  _renderEmailInfo = () => (
    <View>
      <View style={styles.emailInfoContainer}>
        <Text style={mediumTextBold}>Email</Text>
        <Text>
          {this.props.emails.map(email => {
            if (email.default === true) {
              return email.address;
            }
          })}
        </Text>
        <Text style={{ ...smallText, ...styles.changeText }}>change</Text>
      </View>
      <View style={styles.passwordInfoContainer}>
        <Text style={mediumTextBold}>Password</Text>
        <Text>*************</Text>
        <Text style={{ ...smallText, ...styles.changeText }}>change</Text>
      </View>
    </View>
  );

  _renderContractAccountInfo = () => (
    <View style={styles.contractAccountInfoContainer}>
      <Text style={{ ...mediumTextBold, ...styles.accountAddressText }}>
        Account Address
      </Text>
      <Text style={{ ...mediumText, ...styles.contractAccountAddress }}>
        {this.props.contractAccount.revealedAddress
          ? this.props.contractAccount.address
          : `${this.props.contractAccount.address.substr(0, 5)}...`}
      </Text>
      <RevealButton
        onPress={() =>
          this.props.revealContractAddress(this.props.contractAccount.Address)
        }
        revealed={this.props.contractAccount.revealedAddress}
      />
    </View>
  );

  render() {
    const { contractAccount } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.componentContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => navigate("Home")}
          >
            <Text style={styles.linkText}>{`< `}BACK TO HOME</Text>
          </TouchableHighlight>
          <Text style={headlineText}>YOUR ACCOUNT</Text>
          <View style={styles.balanceContainer}>
            <Text style={headlineText}>TB {contractAccount.balance}</Text>
            <TouchableHighlight
              underlayColor="none"
              onPress={() => navigate("Transfers")}
            >
              <Text style={{ ...smallText, ...styles.transferText }}>
                transfer
              </Text>
            </TouchableHighlight>
          </View>

          {this._renderEmailInfo()}

          {this._renderContractAccountInfo()}

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
  componentContainer: {
    flex: 1,
    backgroundColor: colors.mainBackground
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    paddingTop: 110
  },
  linkText: {
    color: colors.orange,
    fontSize: 14,
    lineHeight: 15
  },
  balanceContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  transferText: { color: colors.orange },
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
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});

const mapStateToProps = state => {
  return {
    contractAccount: state.contractAccount,
    emails: state.user.emailAddresses
  };
};

const mapDispatchToProps = {
  revealContractAddress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
