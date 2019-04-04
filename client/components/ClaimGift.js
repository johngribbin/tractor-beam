import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import GiftIcon from "../components/GiftIcon";
import MainButton from "../components/MainButton";

import {
  logIn,
  updateContractBalance,
  updatingContractBalance,
  displayPseudoContractBalance,
  displayingPseudoContractBalance
} from "../redux/actions";
import "ethers/dist/shims.js";
import { ethers } from "ethers";

class ClaimGift extends Component {
  _claimGift = async () => {
    const {
      isLoggedIn,
      contractAccount,
      displayPseudoContractBalance,
      displayingPseudoContractBalance,
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
        const valueAdded = ethers.utils.formatEther(valueObj.value._hex);
        console.log(`${valueAdded} just added to contract balance!`);

        updatingContractBalance(true);

        const pseudoContractBalance =
          Number(contractAccount.balance) + Number(valueAdded);
        displayPseudoContractBalance(pseudoContractBalance);
        displayingPseudoContractBalance(true);

        // in 20 seconds, query the contrat address balance on rinkeby network
        setTimeout(() => {
          updateContractBalance();
          displayingPseudoContractBalance(false);
          updatingContractBalance(false);
        }, 20000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const { isUpdatingContractBalance, contractAccount } = this.props;
    return (
      <View>
        <GiftIcon
          giftMessage={
            contractAccount.balance === 0.1
              ? "You received your first gift!"
              : "Someone sent you a gift!"
          }
        />
        {isUpdatingContractBalance ? (
          <MainButton style={{ opacity: 0.5 }} title={"CLAIM ANOTHER SOON!"} />
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
    isUpdatingContractBalance: state.app.isUpdatingContractBalance
  };
};

const mapDispatchToProps = {
  logIn,
  displayPseudoContractBalance,
  displayingPseudoContractBalance,
  updatingContractBalance,
  updateContractBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimGift);
