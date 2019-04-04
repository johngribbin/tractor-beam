import React, { Component } from "react";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { colors, smallText, largeTextBold, mediumTextBold } from "../constants";
import { View, Text, TextInput } from "react-native";
import MainButton from "../components/MainButton";
import {
  addExternalAccount,
  setDefaultExternalAccount
} from "../redux/actions";
import { Formik } from "formik";
import * as yup from "yup";

class NewExternalAccountForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          accountNickname: "",
          accountAddress: "",
          checked: false
        }}
        onSubmit={(values, formikHelpers) => {
          this.props.addExternalAccount([
            {
              name: values.accountNickname,
              address: values.accountAddress,
              default: false,
              revealedAddress: false
            }
          ]);

          if (values.checked) {
            this.props.setDefaultExternalAccount(values.accountNickname);
          }

          formikHelpers.resetForm();
        }}
        validationSchema={yup.object().shape({
          accountNickname: yup.string().required(),
          accountAddress: yup.string().required()
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          setFieldValue,
          handleSubmit,
          resetForm
        }) => (
          <View style={styles.componentContainer}>
            <View style={styles.formContainer}>
              <Text style={{ ...styles.header, ...largeTextBold }}>
                New External Account
              </Text>

              <Text style={{ ...styles.label, ...mediumTextBold }}>
                Account Nickname
              </Text>
              <TextInput
                value={values.accountNickname}
                onChangeText={handleChange("accountNickname")}
                onBlur={() => setFieldTouched("accountNickname")}
                style={styles.textInput}
                placeholder="Example: Bob's Coinbase"
              />
              {touched.accountNickname && errors.accountNickname && (
                <Text style={{ ...smallText, ...styles.error }}>
                  {errors.accountNickname}
                </Text>
              )}

              <Text style={{ ...styles.label, ...mediumTextBold }}>
                Account Address
              </Text>
              <TextInput
                value={values.accountAddress}
                onChangeText={handleChange("accountAddress")}
                onBlur={() => setFieldTouched("accountAddress")}
                style={styles.textInput}
                placeholder="Example: 0x1f7439..."
              />
              {touched.accountAddress && errors.accountAddress && (
                <Text style={{ ...smallText, ...styles.error }}>
                  {errors.accountAddress}
                </Text>
              )}

              <CheckBox
                title="Make default external account"
                containerStyle={styles.checkbox}
                checked={values.checked}
                fontFamily={"barlow-regular"}
                textStyle={{ color: "white" }}
                onPress={() => {
                  if (!values.checked) {
                    setFieldValue("checked", true);
                  } else setFieldValue("checked", false);
                }}
              />

              <MainButton
                style={
                  values.accountNickname && values.accountAddress
                    ? {}
                    : styles.button
                }
                title={"LINK ACCOUNT"}
                disabled={!isValid}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

const styles = {
  componentContainer: {
    alignItems: "center",
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    display: "flex",
    flex: 1,
    padding: 5
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
  error: {
    color: "red",
    marginBottom: 5
  },
  checkbox: {
    backgroundColor: colors.darkGrey,
    borderColor: colors.darkGrey,
    marginBottom: 10
  },
  button: {}
};

const mapDispatchToProps = {
  addExternalAccount,
  setDefaultExternalAccount
};

export default connect(
  null,
  mapDispatchToProps
)(NewExternalAccountForm);
