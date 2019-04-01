import React, { Component } from "react";
import { colors } from "../constants/";
import Header from "../components/Header";
import ClaimGift from "../components/ClaimGift";

import { ScrollView, StyleSheet, View, AsyncStorage } from "react-native";

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
  /*
  static navigationOptions = {
    header: props => <Header {...props} />,
    title: "Home"
  };
  */
  /*
  _createAccount = async () => {
    let mnemonic = "";

    try {
      let response = await fetch(
        "https://kenanoneal.com:8080/generateMnemonic",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            Accept: "application/json"
          }
        }
      );
      const mnemonicObj = JSON.parse(response._bodyText);
      mnemonic = mnemonicObj.mnemonic;
    } catch (error) {
      console.error(error);
    }

    const account = await Wallet.fromMnemonic(mnemonic);
    return account;
  };
  */

  async componentDidMount() {
    //isLoggedInReducer tests
    this.props.logIn();

    /*
    const testAccount = await this._createAccount();
    console.log(`mnemonic is ${testAccount.mnemonic}`);
    console.log(`private key is ${testAccount.privateKey}`);
    console.log(`address is ${testAccount.address}`);
    */

    // if no permissionedAccount is found in local storage and in local app state
    if ((await AsyncStorage.getItem("permissionedAccount")) === null) {
      const permissionedAccount = await this._createAccount();
      const contractAccount = await this._createAccount();

      const permissionedAccountObj = {
        recoveryPhrase: permissionedAccount.mnemonic,
        address: permissionedAccount.address,
        balance: 0,
        linkedContract: contractAccount.address,
        default: true,
        revealedRecoveryPhrase: false
      };

      const contractAccountObj = {
        address: contractAccount.address,
        balance: 0,
        permissionedAddresses: [permissionedAccount.address],
        revealedAddress: false
      };

      // permissionedAccountsReducer tests
      this.props.addPermissionedAccount([permissionedAccountObj]);

      // contractAccountReducer tests - need to addPermissionedAddress action creator!!
      this.props.setContractAccount(contractAccountObj);

      // set em
      try {
        await AsyncStorage.setItem(
          "permissionedAccount",
          JSON.stringify(permissionedAccountObj)
        );
        await AsyncStorage.setItem(
          "contractAccount",
          JSON.stringify(contractAccountObj)
        );
      } catch (error) {
        console.log(error);
      }

      console.log(
        "permissionedAccount and contractAccount added to local storage"
      );
      // this block is only ran in event that user doesnt have permissionedAccount found in local storage or in the app state
    } else if (this.props.permissionedAccounts.length === 0) {
      let permissionedAccountString = await AsyncStorage.getItem(
        "permissionedAccount"
      );
      let contractAccountString = await AsyncStorage.getItem("contractAccount");

      const permissionedAccount = JSON.parse(permissionedAccountString);
      const contractAccount = JSON.parse(contractAccountString);

      // permissionedAccountsReducer tests
      this.props.addPermissionedAccount([permissionedAccount]);

      // contractAccountReducer tests - need to addPermissionedAddress action creator!!
      this.props.setContractAccount(contractAccount);

      console.log(
        "permissionedAccount and contractAccount taken from local storage and added to app state"
      );
    }

    /*
      //emailReducer tests
      this.props.addEmail([
        {
          address: "bob@cryptonoob.com",
          default: true
        }
      ]);
      
      //isLoggedInReducer tests
      this.props.logIn();
      */

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
    display: "flex",
    justifyContent: "center",
    padding: 10,
    paddingTop: 200
  }
});

const mapStateToProps = state => {
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
