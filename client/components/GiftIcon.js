import React from "react";
import { mediumTextBold } from "../constants/";
import { StyleSheet, View, Text, Image } from "react-native";

import { connect } from "react-redux";

function GiftIcon(props) {
  const { contractAccount } = props;
  return (
    <View style={styles.giftContainer}>
      <Image
        source={
          contractAccount.balance === 0
            ? require("../assets/images/GiftBlack.png")
            : require("../assets/images/GiftPink.png")
        }
        style={styles.giftImage}
      />
      <Text style={{ ...mediumTextBold, ...styles.giftMessage }}>
        {props.giftMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  giftContainer: {
    alignItems: "center",
    display: "flex",
    marginBottom: 20
  },
  giftMessage: {
    marginTop: 5,
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  return {
    contractAccount: state.contractAccount
  };
};

export default connect(mapStateToProps)(GiftIcon);
