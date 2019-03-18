import React from "react";
import { colors } from "../constants/";
import { StyleSheet, View, Text, Image } from "react-native";

import { connect } from "react-redux";

function GiftIcon(props) {
  return (
    <View style={styles.giftContainer}>
      <Image
        source={require("../assets/images/GiftBlack.png")}
        style={styles.giftImage}
      />
      <Text style={styles.giftMessage}>{props.giftMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  giftContainer: {
    alignItems: "center",
    display: "flex",
    marginTop: 50
  },
  giftMessage: {
    marginTop: 5
  }
});

const mapStateToProps = state => {
  return { nativeAccount: state.nativeAccount };
};

export default connect(mapStateToProps)(GiftIcon);
