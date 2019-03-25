import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
//import SettingsScreen from "../screens/SettingsScreen";
import ExternalAccountsScreen from "../screens/ExternalAccountsScreen";
import UpgradeSecurityScreen from "../screens/UpgradeSecurity";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

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

const AccountStack = createStackNavigator({
  Account: AccountScreen
});

AccountStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

/*
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};
*/
const ExternalAccountsStack = createStackNavigator({
  ExternalAccounts: ExternalAccountsScreen
});

ExternalAccountsStack.navigationOptions = {
  tabBarLabel: "External Accounts",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const UpgradeSecurityStack = createStackNavigator({
  UpgradeSecurity: UpgradeSecurityScreen
});

UpgradeSecurityStack.navigationOptions = {
  tabBarLabel: "Upgrade Security",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  AccountStack,
  ExternalAccountsStack,
  UpgradeSecurityStack
});
