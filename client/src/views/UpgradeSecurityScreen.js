import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import { colors, headlineText, mediumText } from "../app/constants";

import RecoveryPhrasesDropdown from "../permissionedAccounts/components/RecoveryPhrasesDropdown";

import { connect } from "react-redux";

class UpgradeSecurityScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.accountContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => navigate("Account")}
          >
            <Text style={styles.linkText}>{`< `}BACK TO YOUR ACCOUNT</Text>
          </TouchableHighlight>

          <Text style={headlineText}>UPGRADE SECURITY</Text>

          <View style={styles.messageContainer}>
            <Text style={mediumText}>
              You may upgrade your security settings at any point in your
              gift-claiming journey. The sooner you do so, the better chance you
              have of recovering your funds if you were to lose access to this
              app or your email account. Keep in mind, you choose how to secure
              your account based on the methods you feel most comfortable with.
              {"\n"}
              {"\n"}
              Please write down any additional recovery phrases you add and keep
              them somewhere safe.
            </Text>
          </View>
          <View style={styles.dropdownContainer}>
            <RecoveryPhrasesDropdown />
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
  },
  dropdownContainer: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: 20
  }
});

const mapStateToProps = state => {
  return {
    contractAccount: state.contractAccount
  };
};

export default connect(
  mapStateToProps,
  null
)(UpgradeSecurityScreen);
