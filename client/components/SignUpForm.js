import React, { Component } from "react";
import { connect } from "react-redux";
import { colors, mediumTextBold } from "../constants";
import { View, Text, TextInput } from "react-native";
import MainButton from "../components/MainButton";
import { addEmail, logIn } from "../redux/actions";
import { Formik } from "formik";
import * as yup from "yup";

class SignUpForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => {
          // add the email to state object
          this.props.addEmail([
            {
              address: values.email,
              default: true
            }
          ]);
          // switch isLoggedIn state property to true
          this.props.logIn();
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
          handleSubmit
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
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
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
              <Text style={{ fontSize: 10, color: "red" }}>
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

const styles = {
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
  button: {
    marginTop: 10
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addEmail: email => {
      dispatch(addEmail(email));
    },
    logIn: () => {
      dispatch(logIn());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);
