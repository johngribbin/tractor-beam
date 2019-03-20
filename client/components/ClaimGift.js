import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import GiftIcon from "../components/GiftIcon";
import MainButton from "../components/MainButton";
import SignUpForm from "../components/SignUpForm";

class ClaimGift extends Component {
  state = {
    showGiftIcon: true,
    showButton: true,
    showForm: false
  };

  _claimGift = () => {
    // if user is not logged in
    if (!this.props.isLoggedIn) {
      this._showForm();
    }
    // if user is logged in
    else {
      console.log("you are logged in!");
    }
  };

  _showForm = () => {
    this.setState({
      showGiftIcon: false,
      showButton: false,
      showForm: true
    });
  };

  _hideForm = () => {
    this.setState({
      showGiftIcon: true,
      showButton: true,
      showForm: false
    });
  };

  render() {
    return (
      <View style={styles.claimGiftContainer}>
        {this.state.showGiftIcon ? (
          <GiftIcon giftMessage={"Someone sent you a gift!"} />
        ) : null}

        {this.state.showButton ? (
          <MainButton title={"CLAIM GIFT!"} onPress={this._claimGift} />
        ) : null}
        {this.state.showForm ? <SignUpForm hideForm={this._hideForm} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  claimGiftContainer: {}
});

// Add this function to every component
const mapStateToProps = state => {
  console.log(state);

  return {
    // key name should match name of key for the reducer in combineReducers function in /reducer/index
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch(logIn());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimGift);
