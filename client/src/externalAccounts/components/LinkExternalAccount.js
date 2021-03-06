import React from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import AltButton from "../../app/components/AltButton";

import { colors, smallText } from "../../app/constants";

import { connect } from "react-redux";

function LinkExternalAccount(props) {
  const { externalAccounts, onPress } = props;

  return (
    <View style={styles.linkExternalAccountContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          style={styles.image}
          source={require("../../app/assets/images/LinkSymbol.png")}
        />
        <AltButton onPress={onPress} title={"LINK EXTERNAL ACCOUNT"} />
        {externalAccounts.length === 0 ? (
          <Text style={{ ...smallText, ...styles.message }}>
            you haven't linked an external account yet
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  linkExternalAccountContainer: {
    flex: 0.5
  },
  contentContainer: {
    alignItems: "center",
    display: "flex",
    padding: 5
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
