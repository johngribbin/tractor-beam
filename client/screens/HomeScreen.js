import React, { Component } from "react";

import { colors } from "../constants/";

import Header from "../components/Header";
import ClaimGift from "../components/ClaimGift";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

import "ethers/dist/shims.js";
import { Wallet } from "ethers";

import { connect } from "react-redux";
import {
  logIn,
  logOut,
  addEmail,
  setDefaultEmail,
  deleteEmail,
  addPermissionedAccount,
  setContractAccount,
  addExternalAccount,
  setDefaultExternalAccount,
  deleteExternalAccount
} from "../redux/actions";

class HomeScreen extends Component {
  static navigationOptions = {
    header: props => <Header {...props} />,
    title: "Home"
  };

  _createAccount = async () => {
    let mnemonic = "";

    try {
      let response = await fetch("http://3.17.65.140:8080/generateMnemonic", {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      });
      const mnemonicObj = JSON.parse(response._bodyText);
      mnemonic = mnemonicObj.mnemonic;
    } catch (error) {
      console.error(error);
    }

    const account = await Wallet.fromMnemonic(mnemonic);
    return account;
  };

  async componentDidMount() {
    // only ran when home page mounts for first time
    if (this.props.permissionedAccounts.length === 0) {
      const permissionedAccount = await this._createAccount();
      const contractAccount = await this._createAccount();

      // permissionedAccountsReducer tests
      this.props.addPermissionedAccount([
        {
          recoveryPhrase: permissionedAccount.mnemonic,
          address: permissionedAccount.address,
          balance: 0,
          linkedContract: contractAccount.address,
          default: true,
          revealedRecoveryPhrase: false
        }
      ]);

      // contractAccountReducer tests - need to addPermissionedAddress action creator!!
      this.props.setContractAccount({
        address: contractAccount.address,
        balance: 0,
        permissionedAddresses: [permissionedAccount.address],
        revealedAddress: false
      });

      // emailReducer tests
      this.props.addEmail([
        {
          address: "bob@cryptonoob.com",
          default: true
        }
      ]);

      //isLoggedInReducer tests
      this.props.logIn();
    }

    /*
    // externalAccountsReducer
    this.props.addExternalAccount([
      {
        name: "Coinbase",
        address: "0x111",
        default: false,
        revealedAddress: false
      },
      {
        name: "Kraken",
        address: "0x222",
        default: false,
        revealedAddress: false
      }
    ]);


    //isLoggedInReducer tests
    this.props.logIn();
    

    // emailReducer tests
    this.props.addEmail([
      {
        address: "bob@cryptonoob.com",
        default: false
      },
      {
        address: "bob@cryptoexpert.com",
        default: false
      },
      {
        address: "bob@gmail.com",
        default: false
      }
    ]);

    this.props.setDefaultEmail("bob@cryptoexpert.com");
    this.props.deleteEmail("bob@gmail.com");
    
    
    
    // externalAccountsReducer tests
    this.props.addExternalAccount([
      {
        name: "Coinbase",
        address: "0x111",
        default: false
      },
      {
        name: "Kraken",
        address: "0x222",
        default: false
      }
    ]);

    this.props.setDefaultExternalAccount("Coinbase");
    this.props.deleteExternalAccount("Balance");
    */
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.homeContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ClaimGift navigate={navigate} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colors.mainBackground
  },
  contentContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingTop: 200
  }
});

const mapStateToProps = state => {
  console.log(state);

  return {
    permissionedAccounts: state.permissionedAccounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch(logIn());
    },
    logOut: () => {
      dispatch(logOut());
    },
    addEmail: email => {
      dispatch(addEmail(email));
    },
    setDefaultEmail: emailAddress => {
      dispatch(setDefaultEmail(emailAddress));
    },
    deleteEmail: emailAddress => {
      dispatch(deleteEmail(emailAddress));
    },
    addPermissionedAccount: account => {
      dispatch(addPermissionedAccount(account));
    },
    setContractAccount: account => {
      dispatch(setContractAccount(account));
    },
    addExternalAccount: account => {
      dispatch(addExternalAccount(account));
    },
    setDefaultExternalAccount: accountName => {
      dispatch(setDefaultExternalAccount(accountName));
    },
    deleteExternalAccount: accountName => {
      dispatch(deleteExternalAccount(accountName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
