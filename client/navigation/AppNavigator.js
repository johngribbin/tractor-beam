import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Header from "../components/Header";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import AccountScreen from "../screens/AccountScreen";
import ExternalAccountsScreen from "../screens/ExternalAccountsScreen";
import UpgradeSecurityScreen from "../screens/UpgradeSecurityScreen";
import TransfersScreen from "../screens/TransfersScreen";

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
      initialRouteName: "Transfers",
      /* The header config from HomeScreen is now here */
      defaultNavigationOptions: {
        header: props => <Header {...props} />
      }
    }
  )
);
