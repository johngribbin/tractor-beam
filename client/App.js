import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/configureStore";
import AppNavigator from "./navigation/AppNavigator";

const { persistor, store } = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {}

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/GiftBlack.png"),
        require("./assets/images/LinkSymbol.png"),
        require("./assets/images/SecuritySymbol.png"),
        require("./assets/images/DownArrow.png"),
        require("./assets/images/UpArrow.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,

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
            <PersistGate loading={null} persistor={persistor}>
              <AppNavigator />
            </PersistGate>
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
