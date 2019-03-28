import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  HomeStack,
  AccountStack,
  ExternalAccountsStack,
  SignupStack,
  UpgradeSecurityStack
} from "./MainTabNavigator";

//import MainTabNavigator from "./MainTabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Home: HomeStack,
    Account: AccountStack,
    //Main: MainTabNavigator,
    Signup: SignupStack,
    ExternalAccounts: ExternalAccountsStack,
    UpgradeSecurity: UpgradeSecurityStack
  })
);
