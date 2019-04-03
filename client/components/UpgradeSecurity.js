import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import AltButton from "../components/AltButton";

import { colors, smallText } from "../constants";
import { connect } from "react-redux";

function UpgradeSecurity(props) {
  const { permissionedAccounts, onPress } = props;

  return (
    <View style={styles.componentContainer}>
      <View style={styles.contentContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
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
    permissionedAccounts: state.permissionedAccounts
  };
};

export default connect(
  mapStateToProps,
  null
)(UpgradeSecurity);
