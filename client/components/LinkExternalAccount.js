import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import AltButton from "../components/AltButton";

import { colors, smallText } from "../constants";

import { connect } from "react-redux";

function LinkExternalAccount(props) {
  const { externalAccounts } = props;

  return (
    <View style={styles.linkExternalAccountContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/LinkSymbol.png")}
      />
      <AltButton title={"LINK EXTERNAL ACCOUNT"} />
      {externalAccounts.length === 0 ? (
        <Text style={{ ...smallText, ...styles.message }}>
          you haven't linked an external account yet
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  linkExternalAccountContainer: {
    alignItems: "center",
    display: "flex",
    marginBottom: 20
  },
  image: {
    marginBottom: 10
  },
  message: {
    color: colors.orange,
    marginTop: 10
  }
});

const mapStateToProps = state => {
  return {
    externalAccounts: state.externalAccounts
  };
};

export default connect(
  mapStateToProps,
  null
)(LinkExternalAccount);
