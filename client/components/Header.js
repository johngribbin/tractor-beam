import React, { Component } from "react";
import { colors } from "../constants/";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { connect } from "react-redux";

function Header(props) {
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.appTitle}>TRACTOR BEAM</Text>
      <Text style={styles.balance}>
        {props.emails.length === 0
          ? `YOUR ACCOUNT $${props.nativeAccount.balance}`
          : props.emails.map(email => {
              if (email.default === true) {
                return `${email.address} $${props.nativeAccount.balance}`;
              }
            })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute"
  },
  appTitle: {
    backgroundColor: colors.darkGrey,
    color: "white",
    flex: 3,
    padding: 10,
    paddingTop: 40
  },
  balance: {
    backgroundColor: colors.orange,
    color: "white",
    flex: 2,
    padding: 10,
    paddingTop: 40
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
