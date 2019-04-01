import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import { colors, headlineText, mediumText } from "../constants";

import Header from "../components/Header";
import RecoveryPhrasesDropdown from "../components/RecoveryPhrasesDropdown";

import { connect } from "react-redux";

class UpgradeSecurityScreen extends React.Component {
  /*
  static navigationOptions = {
    header: props => <Header {...props} />
  };
  */

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.accountContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableHighlight onPress={() => navigate("Account")}>
            <Text style={styles.linkText}>{`< `}BACK TO YOUR ACCOUNT</Text>
          </TouchableHighlight>

          <Text style={headlineText}>UPGRADE SECURITY</Text>

          <View style={styles.messageContainer}>
            <Text style={mediumText}>
              You may upgrade your security settings at any point in your
              gift-claiming journet, but the sooner you do it, the more
              protected from hacks your account will be.
              {"\n"}
              {"\n"}
              We recommend adding more recovery phrases.
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
