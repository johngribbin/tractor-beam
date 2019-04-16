import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Header from "./components/Header";
import HomeScreen from "../views/HomeScreen";
import SignupScreen from "../views/SignupScreen";
import AccountScreen from "../views/AccountScreen";
import ExternalAccountsScreen from "../views/ExternalAccountsScreen";
import UpgradeSecurityScreen from "../views/UpgradeSecurityScreen";
import TransfersScreen from "../views/TransfersScreen";

export default createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
      SignUp: SignupScreen,
      Account: AccountScreen,
      ExternalAccounts: ExternalAccountsScreen,
      UpgradeSecurity: UpgradeSecurityScreen,
      Transfers: TransfersScreen
    },
    {
      initialRouteName: "Home",
      /* The header config from HomeScreen is now here */
      defaultNavigationOptions: {
        header: props => <Header {...props} />
      }
    }
  )
);
