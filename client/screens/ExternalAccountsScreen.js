import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import {
  colors,
  headlineText,
  mediumText,
  mediumTextBold,
  smallText
} from "../constants";

import Header from "../components/Header";
import ExternalAccounts from "../components/ExternalAccounts";
import NewExternalAccountForm from "../components/NewExternalAccountForm";

import { connect } from "react-redux";

class ExternalAccountsScreen extends Component {
  static navigationOptions = {
    header: props => <Header {...props} />
  };

  render() {
    const { externalAccounts } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.accountContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableHighlight onPress={() => navigate("Account")}>
            <Text style={styles.linkText}>{`< `}BACK TO YOUR ACCOUNT</Text>
          </TouchableHighlight>

          <Text style={headlineText}>LINK EXTERNAL ACCOUNT</Text>

          <View style={styles.messageContainer}>
            <Text style={mediumText}>
              You must link an external account to transfer funds outside of
              Tractor Beam.
              {"\n"}
              {"\n"}
              You will need this when you want to:
              {"\n"}
              {"\n"}* Exchange your funds to other cryptocurrencies.
              {"\n"}
              {"\n"}* Send funds to people you know
              {externalAccounts.length === 0 ? (
                <Text>
                  {"\n"}
                  {"\n"}
                  You currently have zero linked external accounts.
                </Text>
              ) : null}
            </Text>
          </View>
          {externalAccounts.length === 0 ? null : <ExternalAccounts />}
          <NewExternalAccountForm />
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
  linkText: {
    color: colors.orange,
    fontSize: 14,
    lineHeight: 15
  },
  messageContainer: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flex: 1,
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20
  }
});

const mapStateToProps = state => {
  console.log(state);

  return {
    externalAccounts: state.externalAccounts
  };
};

export default connect(
  mapStateToProps,
  null
)(ExternalAccountsScreen);
