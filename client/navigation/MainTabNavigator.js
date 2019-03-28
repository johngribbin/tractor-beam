import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import AccountScreen from "../screens/AccountScreen";
import ExternalAccountsScreen from "../screens/ExternalAccountsScreen";
import UpgradeSecurityScreen from "../screens/UpgradeSecurityScreen";

export const HomeStack = createStackNavigator({
  Home: HomeScreen
});

/*
HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};
*/

export const SignupStack = createStackNavigator({
  SignUp: SignupScreen
});

export const AccountStack = createStackNavigator({
  Account: AccountScreen
});

/*
AccountStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};
*/

export const ExternalAccountsStack = createStackNavigator({
  ExternalAccounts: ExternalAccountsScreen
});

export const UpgradeSecurityStack = createStackNavigator({
  UpgradeSecurity: UpgradeSecurityScreen
});

/*
export default createBottomTabNavigator({
  HomeStack,
  AccountStack
});
*/
