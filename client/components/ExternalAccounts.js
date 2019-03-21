import React from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

function ExternalAccounts(props) {
  _renderExternalAccounts = () => {
    const { externalAccounts } = props;

    return externalAccounts.map(externalAccount => (
      <View key={externalAccount.address}>
        <Text>{externalAccount.name}</Text>
        <Text>{externalAccount.address}</Text>
      </View>
    ));
  };

  return <View>{this._renderExternalAccounts()}</View>;
}

const mapStateToProps = state => {
  return {
    externalAccounts: state.externalAccounts
  };
};

export default connect(
  mapStateToProps,
  null
)(ExternalAccounts);
