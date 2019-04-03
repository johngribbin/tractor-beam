import React from "react";
import { colors, largeTextBold } from "../constants/";
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
  const { isLoggedIn, contractAccount } = props;

  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.titleWrapper}>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => navigate("Home")}
        >
          <Text style={{ ...largeTextBold, ...styles.appTitle }}>
            TRACTOR BEAM
          </Text>
        </TouchableHighlight>
      </View>

      {isLoggedIn === true ? (
        <View style={styles.balanceWrapper}>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => navigate("Account")}
          >
            <View>
              <Text style={{ ...largeTextBold, ...styles.balanceValue }}>
                ${contractAccount.balance}
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
    contractAccount: state.contractAccount,
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps)(Header);
