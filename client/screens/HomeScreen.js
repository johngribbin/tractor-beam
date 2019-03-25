import React, { Component } from "react";
import axios from "axios";

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
//const bip39 = require("react-native-bip39");
//const hdKey = require("ethereumjs-wallet/hdkey");

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

  async componentDidMount() {
    let mnemonic =
      "river question load middle follow pen mix walnut coin powder supply service";

    /*
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
    */

    // permissionedAccountsReducer tests
    this.props.addPermissionedAccount([
      {
        recoveryPhrase: mnemonic,
        address: "0x555",
        balance: 0,
        linkedContract: "0x321",
        default: true
      }
    ]);

    // contractAccountReducer tests
    this.props.setContractAccount({
      address: "0x321",
      balance: 0,
      permissionedAddresses: ["0x123"]
    });

    /*
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
    
    // mnemonic creatior tests
    const mnemonicWallet = Wallet.fromMnemonic(mnemonic);
    console.log(`mnemonic is ${mnemonicWallet.mnemonic}`);
    console.log(`private key is ${mnemonicWallet.privateKey}`);
    console.log(`address is ${mnemonicWallet.address}`);
    
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

  /*
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync("https://google.com");
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
  */

  render() {
    const { isLoggedIn } = this.props;

    return (
      <View style={styles.homeContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ClaimGift />

          {/*
            <View style={styles.getStartedContainer}>
              {this._maybeRenderDevelopmentModeWarning()}
  
              <Text style={styles.getStartedText}>Get started by opening</Text>
  
              <View
                style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
              >
                <MonoText style={styles.codeHighlightText}>
                  screens/HomeScreen.js
                </MonoText>
              </View>
  
              <Text style={styles.getStartedText}>Hello World!</Text>
            </View>
  
            <View style={styles.helpContainer}>
              <TouchableOpacity
                onPress={this._handleHelpPress}
                style={styles.helpLink}
              >
                <Text style={styles.helpLinkText}>
                  Help, it didn’t automatically reload!
                </Text>
              </TouchableOpacity>
            </View>
            */}
        </ScrollView>

        {/*}
          <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>
              This is a tab bar. You can edit it in:
            </Text>
  
            <View
              style={[styles.codeHighlightContainer, styles.navigationFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                navigation/MainTabNavigator.js
              </MonoText>
            </View>
            
          </View>  
          */}
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
    /*
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1
    */
  }
  /*
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
  */
});

// Add this function to every component
const mapStateToProps = state => {
  //console.log(state);

  return {
    // key name should match name of key for the reducer in combineReducers function in /reducer/index
    isLoggedIn: state.isLoggedIn,
    nativeAccount: state.nativeAccount
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
