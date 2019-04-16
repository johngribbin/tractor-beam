import React, { Component } from "react";
import { connect } from "react-redux";
import { colors, smallText, mediumTextBold } from "../../app/constants";
import { View, Text, TextInput, StyleSheet } from "react-native";
import MainButton from "../../app/components/MainButton";
import { addEmail, setDefaultEmail, logIn } from "../../redux/actions";
import { Formik } from "formik";
import * as yup from "yup";
//import AesCrypto from "react-native-aes-kit";
//const AesCrypto = require("react-native-aes-kit");

class SignUpForm extends Component {
  render() {
    const { permissionedAccounts } = this.props;
    console.log(
      `permissioned accounts from sign up form ${permissionedAccounts}`
    );

    return (
      <Formik
        initialValues={{
          email: "bobthecryptonoob@gmail.com",
          password: "123456789"
        }}
        onSubmit={async (values, formikHelpers) => {
          try {
            let response = await fetch("https://kenanoneal.com:8080/email", {
              mode: "no-cors",
              method: "POST",
              headers: {
                Accept: "application/json"
              },
              body: JSON.stringify({
                email: values.email,
                payload: permissionedAccounts[0].recoveryPhrase,
                key: values.password
              })
            });

            console.log(response);
          } catch (error) {
            console.error(error);
          }

          // add the email to state object
          this.props.addEmail([
            {
              address: values.email,
              default: false
            }
          ]);

          // set email address to deafult
          this.props.setDefaultEmail(values.email);

          // switch isLoggedIn state property to true
          this.props.logIn();

          // reset form to inital values
          formikHelpers.resetForm();

          // navigate user back to home
          this.props.navigate("Home");
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required(),
          password: yup
            .string()
            .min(6)
            .required()
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          resetForm
        }) => (
          <View style={styles.formContainer}>
            <Text style={{ ...mediumTextBold, ...styles.label }}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <Text style={{ ...smallText, ...styles.error }}>
                {errors.email}
              </Text>
            )}
            <Text style={{ ...mediumTextBold, ...styles.label }}>Password</Text>
            <TextInput
              style={styles.textInput}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="Password"
              onBlur={() => setFieldTouched("password")}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={{ ...smallText, ...styles.error }}>
                {errors.password}
              </Text>
            )}
            <MainButton
              style={styles.button}
              title="SIGN UP"
              disabled={!isValid}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: "center",
    flex: 1,
    marginTop: 10,
    width: "90%"
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
  button: {
    marginTop: 10
  }
});

const mapStateToProps = state => {
  return {
    permissionedAccounts: state.permissionedAccounts
  };
};

const mapDispatchToProps = {
  addEmail,
  setDefaultEmail,
  logIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
