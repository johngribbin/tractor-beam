import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import AltButton from "../components/AltButton";

import { colors, smallText } from "../constants";
import { connect } from "react-redux";

function UpgradeSecurity(props) {
  const { permissionedAccounts, onPress } = props;

  return (
    <View style={styles.componentContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/SecuritySymbol.png")}
      />
      <AltButton title={"UPGRADE SECURITY"} onPress={onPress} />
      {permissionedAccounts.length === 1 ? (
        <Text style={{ ...smallText, ...styles.message }}>
          you haven't upgraded security yet
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
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
    permissionedAccounts: state.permissionedAccounts
  };
};

export default connect(
  mapStateToProps,
  null
)(UpgradeSecurity);
