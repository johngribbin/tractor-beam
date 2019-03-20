import React from "react";
import { colors, largeText, largeTextBold } from "../constants/";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { connect } from "react-redux";

function Header(props) {
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="light-content" />
      <Text style={{ ...largeTextBold, ...styles.appTitle }}>TRACTOR BEAM</Text>
      <View style={styles.balanceWrapper}>
        <Text style={{ ...largeText, ...styles.balanceText }}>
          {props.emails.length === 0
            ? `YOUR ACCOUNT `
            : props.emails.map(email => {
                if (email.default === true) {
                  return `${email.address.substr(0, 11)}... `;
                }
              })}
        </Text>
        <Text style={{ ...largeTextBold, ...styles.balanceValue }}>
          ${props.nativeAccount.balance}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.darkGrey,
    flex: 1,
    flexDirection: "row",
    position: "absolute"
  },
  appTitle: {
    color: "white",
    flex: 2,
    padding: 10,
    paddingTop: 40
  },
  balanceWrapper: {
    backgroundColor: colors.orange,
    flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 40
  },
  balanceText: {
    color: "white"
  },
  balanceValue: {
    color: "white"
  }
});

// Add this function to every component
const mapStateToProps = state => {
  return {
    // key name should match name of key for the reducer in combineReducers function in /reducer/index
    nativeAccount: state.nativeAccount,
    emails: state.emails
  };
};

export default connect(mapStateToProps)(Header);
