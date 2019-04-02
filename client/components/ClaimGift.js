import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { colors } from "../constants";

import GiftIcon from "../components/GiftIcon";
import MainButton from "../components/MainButton";

import {
  logIn,
  updateContractBalance,
  updatingContractBalance
} from "../redux/actions";
import "ethers/dist/shims.js";
import { ethers } from "ethers";

class ClaimGift extends Component {
  _claimGift = async () => {
    const {
      isLoggedIn,
      contractAccount,
      updatingContractBalance,
      updateContractBalance
    } = this.props;

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
        console.log(
          `${ethers.utils.formatEther(
            valueObj.value._hex
          )} just added to contract balance!`
        );
        updatingContractBalance();

        setTimeout(() => {
          updateContractBalance();
        }, 5000);
        updatingContractBalance(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const { updatedContractBalance } = this.props;
    return (
      <View>
        <GiftIcon giftMessage={"Someone sent you a gift!"} />
        {!updatedContractBalance ? (
          <ActivityIndicator size="large" color={colors.orange} />
        ) : (
          <MainButton title={"CLAIM GIFT!"} onPress={this._claimGift} />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    contractAccount: state.contractAccount,
    updatedContractBalance: state.app.updatedContractBalance
  };
};

const mapDispatchToProps = {
  logIn,
  updatingContractBalance,
  updateContractBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimGift);
