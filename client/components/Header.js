import React from "react";
import { colors, largeText, largeTextBold } from "../constants/";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";

function Header(props) {
  const { navigate } = props.navigation;

  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.titleWrapper}>
        <TouchableHighlight onPress={() => navigate("Home")}>
          <Text style={{ ...largeTextBold, ...styles.appTitle }}>
            TRACTOR BEAM
          </Text>
        </TouchableHighlight>
      </View>

      {props.isLoggedIn ? (
        <View style={styles.balanceWrapper}>
          <TouchableHighlight onPress={() => navigate("Account")}>
            <View>
              {/*
              <Text style={{ ...largeText, ...styles.balanceText }}>
              {props.emails.length === 0
                ? `YOUR ACCOUNT `
                : props.emails.map(email => {
                    if (email.default === true) {
                      return `${email.address.substr(0, 11)}... `;
                    }
                  })}
            </Text>
            */}
              <Text style={{ ...largeTextBold, ...styles.balanceValue }}>
                ${props.contractAccount.balance}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.darkGrey,
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 0
  },
  titleWrapper: {
    display: "flex",
    flex: 5
  },
  appTitle: {
    alignSelf: "center",
    color: "white",
    flex: 1,
    padding: 10,
    paddingTop: 40
  },
  balanceWrapper: {
    backgroundColor: colors.orange,
    flex: 2,
    //display: "flex",
    //flexDirection: "row",
    //flexWrap: "wrap",
    //justifyContent: "space-between",
    padding: 10,
    paddingTop: 40
  },
  balanceText: {
    color: "white"
  },
  balanceValue: {
    alignSelf: "center",
    color: "white"
  }
});

// Add this function to every component
const mapStateToProps = state => {
  return {
    // key name should match name of key for the reducer in combineReducers function in /reducer/index
    contractAccount: state.contractAccount,
    emails: state.emails,
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(mapStateToProps)(Header);
