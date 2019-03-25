import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import {
  colors,
  headlineText,
  mediumText,
  mediumTextBold,
  smallTextItalic
} from "../constants";

import Header from "../components/Header";
import LinkExternalAccount from "../components/LinkExternalAccount";
import UpgradeSecurity from "../components/UpgradeSecurity";
//import { ExpoLinksView } from "@expo/samples";

import { connect } from "react-redux";

class AccountScreen extends React.Component {
  static navigationOptions = {
    header: props => <Header {...props} />
  };

  render() {
    const { emails, contractAccount } = this.props;

    return (
      <View style={styles.accountContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links 
        <ExpoLinksView />
        */}
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
            <Text style={mediumTextBold}>Account Address</Text>
            <Text style={mediumText}> {contractAccount.address}...</Text>
            <Text style={{ ...smallTextItalic, ...styles.changeText }}>
              reveal
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <LinkExternalAccount />
            <UpgradeSecurity />
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40
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

export default connect(
  mapStateToProps,
  null
)(AccountScreen);
