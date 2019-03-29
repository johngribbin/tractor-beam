import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import GiftIcon from "../components/GiftIcon";
import MainButton from "../components/MainButton";

class ClaimGift extends Component {
  _claimGift = () => {
    // if user is not logged in
    if (!this.props.isLoggedIn) {
      this.props.navigate("SignUp");
    }
    // if user is logged in
    else {
      console.log("you are logged in!");
    }
  };

  render() {
    return (
      <View>
        <GiftIcon giftMessage={"Someone sent you a gift!"} />
        <MainButton title={"CLAIM GIFT!"} onPress={this._claimGift} />
      </View>
    );
  }
}

// Add this function to every component
const mapStateToProps = state => {
  return {
    // key name should match name of key for the reducer in combineReducers function in /reducer/index
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch(logIn());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimGift);
