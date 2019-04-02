import React, { Component } from "react";
import { colors } from "../constants/";
import ClaimGift from "../components/ClaimGift";
import MainButton from "../components/MainButton";

import { ScrollView, StyleSheet, View } from "react-native";

import configureStore from "../redux/configureStore";

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
  deleteExternalAccount,
  updateContractBalance
} from "../redux/actions";

import AesCrypto from "react-native-aes-kit";

class HomeScreen extends Component {
  componentDidMount() {
    const {
      permissionedAccounts,
      addPermissionedAccount,
      setContractAccount,
      updateContractBalance
    } = this.props;

    // called these function first time app is loaded
    if (permissionedAccounts.length === 0) {
      addPermissionedAccount();
      setContractAccount();
      updateContractBalance();
    }

    //this.props.logIn();

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

  _clearLocalStorage = () => {
    const { persistor } = configureStore();

    try {
      persistor.purge();
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  };

  _testEncrypt = () => {
    const plaintxt = "test";
    const secretKey = "0102030405060708";
    const iv = "1112131415161718";

    const { encrypt } = AesCrypto;
    console.log(encrypt);

    encrypt(plaintxt, secretKey, iv)
      .then(cipher => {
        console.log(cipher); // return a string type cipher
        //this.setState({ cipher });
      })
      .catch(err => {
        console.log(err);
      });

    console.log("hello from end of encrypt function");
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.homeContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ClaimGift navigate={navigate} />
        </ScrollView>
        <MainButton
          style={styles.clearLocalStorageButton}
          title={"CLEAR LOCAL STORAGE!"}
          onPress={this._clearLocalStorage}
        />
        <MainButton
          style={styles.testEncryptButton}
          title={"TEST ENCRYPT!"}
          onPress={this._testEncrypt}
        />
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
  },
  clearLocalStorageButton: {
    bottom: 10,
    left: 10,
    position: "absolute"
  },
  testEncryptButton: {
    bottom: 10,
    right: 10,
    position: "absolute"
  }
});

const mapStateToProps = state => {
  console.log(state);

  return {
    permissionedAccounts: state.permissionedAccounts
  };
};

const mapDispatchToProps = {
  logIn,
  logOut,
  addEmail,
  setDefaultEmail,
  deleteEmail,
  addPermissionedAccount,
  setContractAccount,
  addExternalAccount,
  setDefaultExternalAccount,
  deleteExternalAccount,
  updateContractBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
