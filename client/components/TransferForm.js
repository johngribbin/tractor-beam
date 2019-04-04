import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { mediumTextBold, colors } from "../constants";
import MainButton from "../components/MainButton";
import { connect } from "react-redux";

class TransferForm extends Component {
  state = {
    to: ""
  };

  _handleSend = () => {
    console.log("hello");
  };

  render() {
    const { to } = this.state;

    return (
      <View style={styles.componentContainer}>
        <View style={styles.formWrapper}>
          {/*
            <Text style={{ ...styles.header, ...largeTextBold }}>Transfer</Text>
            */}

          <Text style={{ ...styles.label, ...mediumTextBold }}>From</Text>
          <TextInput
            value={this.props.contractAccount.address}
            style={styles.textInput}
            placeholder="Example: Bob's Coinbase"
          />

          <Text style={{ ...styles.label, ...mediumTextBold }}>To</Text>
          <TextInput
            value={to}
            onChangeText={address => this.setState({ to: address })}
            style={styles.textInput}
            placeholder="Example: 0x1f7439..."
          />

          <MainButton
            style={styles.button}
            title={"SEND"}
            onPress={this._handleSend}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  componentContainer: {
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    display: "flex",
    flex: 1,
    padding: 20
  },
  formContainer: {
    flex: 1,
    paddingBottom: 30,
    paddingTop: 10,
    width: "90%"
  },
  header: {
    color: "white",
    marginBottom: 20
  },
  label: {
    color: "white"
  },
  textInput: {
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 7.5
  },
  button: {
    marginTop: 20
  }
};

const mapStateToProps = state => {
  return {
    contractAccount: state.contractAccount
  };
};

export default connect(
  mapStateToProps,
  null
)(TransferForm);
