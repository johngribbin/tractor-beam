import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import GiftIcon from "../components/GiftIcon";
import MainButton from "../components/MainButton";

import { logIn } from "../redux/actions";
import { ethers } from "ethers";

class ClaimGift extends Component {
  _claimGift = async () => {
    const { isLoggedIn, contractAccount } = this.props;

    // if user is not logged in
    if (!isLoggedIn) {
      this.props.navigate("SignUp");
    }
    // if user is logged in
    else {
      try {
        let response = await fetch("https://kenanoneal.com:8080/claimGift", {
          mode: "no-cors",
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: JSON.stringify({
            address: contractAccount.address
          })
        });
        const valueObj = JSON.parse(response._bodyText);
        console.log(ethers.utils.formatEther(valueObj.value._hex));
        //ethers.utils.formatEther
      } catch (error) {
        console.error(error);
      }
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
    isLoggedIn: state.isLoggedIn,
    contractAccount: state.contractAccount
  };
};

const mapDispatchToProps = {
  logIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimGift);
