import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";

import AppNavigator from "./navigation/AppNavigator";
import reducers from "./redux/reducers";
const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        //require("./assets/images/robot-dev.png"),
        //require("./assets/images/robot-prod.png")
        require("./assets/images/GiftBlack.png"),
        require("./assets/images/LinkSymbol.png"),
        require("./assets/images/SecuritySymbol.png"),
        require("./assets/images/DownArrow.png"),
        require("./assets/images/UpArrow.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "barlow-regular": require("./assets/fonts/Barlow-Regular.ttf"),
        "barlow-bold": require("./assets/fonts/Barlow-Bold.ttf"),
        "barlow-italic": require("./assets/fonts/Barlow-Italic.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
