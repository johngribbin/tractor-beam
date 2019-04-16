import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  View,
  Text
} from "react-native";
import { mediumText, colors, headlineText } from "../app/constants";

import TransferForm from "../externalAccounts/components/TransferForm";

class TransfersScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.componentContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => navigate("Account")}
          >
            <Text style={styles.linkText}>{`< `}BACK TO YOUR ACCOUNT</Text>
          </TouchableHighlight>
          <Text style={headlineText}>TRANSFERS</Text>
          <View style={styles.messageContainer}>
            <Text style={mediumText}>Be aware - All transfers are final!</Text>
          </View>
          <TransferForm />
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
  messageContainer: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flex: 1,
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20
  }
});

export default TransfersScreen;
