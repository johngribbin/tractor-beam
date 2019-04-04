import React, { Component } from "react";
import { View, Alert } from "react-native";
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
  _securityAlert = () => {
    Alert.alert(
      "Bump up your security",
      "Would you like to add more security to your account?",
      [
        {
          text: "Ask me later"
        },
        {
          text: "Ok!",
          onPress: () => this.props.navigate("UpgradeSecurity"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  _fetchGift = () => {};

  _claimGift = async () => {
    const {
      isLoggedIn,
      contractAccount,
      displayPseudoContractBalance,
      displayingPseudoContractBalance,
      updatingContractBalance,
      updateContractBalance,
      permissionedAccounts
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

        const valueAdded = Number(
          ethers.utils.formatEther(valueObj.value._hex)
        );

        updatingContractBalance(true);

        const pseudoContractBalance =
          Number(contractAccount.balance) + Number(valueAdded);

        displayPseudoContractBalance(pseudoContractBalance);

        displayingPseudoContractBalance(true);

        if (pseudoContractBalance >= 0.2 && permissionedAccounts.length === 1) {
          this._securityAlert();
        }

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
    permissionedAccounts: state.permissionedAccounts,
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
