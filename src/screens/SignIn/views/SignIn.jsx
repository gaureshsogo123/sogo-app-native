import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { signIn, signUp } from "../helpers/signinHelper";
import { loginUser } from "../../../services/authService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 25,
  },
  textInput: {
    height: 50,
    width: 300,
    marginBottom: 30,
    padding: 0,
    fontSize: 20,
  },
  button: {
    width: 300,
    borderRadius: 5,
  },
});

function SignIn() {
  const [mobileNumber, setMobileNumber] = useState();
  const [otp, setOtp] = useState();
  const [errors, setErrors] = useState({});
  const [otpGenerated, setOtpGenerated] = useState(false);

  const validateMobile = () => {
    const regex = new RegExp(/^\d{10}$/);
    return regex.test(mobileNumber);
  };

  const handleMobileNumber = (e) => {
    setErrors({});
    if (validateMobile()) {
      // call for signUp call
      signUp({ mobile_no: mobileNumber }).then((res) => {
        if (!res.error) setOtpGenerated(true);
      });
    } else {
      setErrors({ ...errors, mobile: "Please enter a valid mobile no." });
    }
  };

  const handleOtp = () => {
    setErrors({});
    if (!otp.length || otp.length > 4)
      setErrors({ ...errors, otp: "Please enter a valid OTP" });
    else {
      //code for signin
      signIn({ mobile_no: mobileNumber }).then((res) => {
        if (!res.error) {
          loginUser(res.data);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {!otpGenerated ? (
        <>
          <Text style={styles.title} variant="displayMedium">
            Sign in
          </Text>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label={"Phone number"}
            value={mobileNumber}
            onChangeText={(e) => {
              if (/^\d*$/.test(e)) {
                setMobileNumber(e);
              }
            }}
          ></TextInput>
          <Button
            style={styles.button}
            mode="contained"
            onPress={(e) => handleMobileNumber(e)}
          >
            Continue
          </Button>
        </>
      ) : (
        <>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label={"Enter OTP"}
            value={otp}
            onChangeText={(e) => setOtp(e)}
          ></TextInput>
          <Button style={styles.button} mode="contained" onPress={handleOtp}>
            Submit OTP
          </Button>
        </>
      )}
    </View>
  );
}

export default SignIn;
