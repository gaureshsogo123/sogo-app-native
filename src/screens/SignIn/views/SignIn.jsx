import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  TextInput,
  Text,
  useTheme,
  HelperText,
} from "react-native-paper";
import { signIn, signUp } from "../helpers/signinHelper";
import { useAuthContext } from "../../../contexts/authContext";

const styles = StyleSheet.create({
  sogoBg: {
    height: "25%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    width: 300,
    padding: 0,
    fontSize: 20,
  },
  resend: {
    textAlign: "left",
  },
  button: {
    width: 300,
    borderRadius: 5,
  },
});

function SignIn() {
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState();
  const [otp, setOtp] = useState();
  const [errors, setErrors] = useState({});
  const [otpGenerated, setOtpGenerated] = useState(false);

  const { loginUser } = useAuthContext();

  const validateMobile = () => {
    const regex = new RegExp(/^\d{10}$/);
    return regex.test(mobileNumber);
  };

  const handleMobileNumber = () => {
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

  const resetInputs = () => {
    setMobileNumber();
    setOtp();
    setErrors({});
    setOtpGenerated(false);
  };

  const handleOtp = () => {
    setErrors({});
    if (!otp.length || otp.length > 4)
      setErrors({ ...errors, otp: "Please enter a valid OTP" });
    else {
      //code for signin
      signIn({ mobile_no: mobileNumber })
        .then((res) => {
          if (!res.error) {
            loginUser(res.data);
            resetInputs();
          }
        })
        .catch((err) => setErrors({ ...errors, otp: err.message }));
    }
  };

  return (
    <>
      <View style={styles.sogoBg}>
        <Text variant="displayMedium"> SOGO</Text>
      </View>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
        {!otpGenerated ? (
          <>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label={"Phone number"}
              keyboardType={"numeric"}
              value={mobileNumber}
              onChangeText={(e) => {
                if (/^\d[0-9]*$/.test(e) || e === "") {
                  setMobileNumber(e);
                  setErrors({ ...errors, mobile: "" });
                } else {
                  setErrors({ ...errors, mobile: "Only numbers allowed" });
                }
              }}
            ></TextInput>
            <HelperText type="error" visible={errors.mobile}>
              {errors.mobile}{" "}
            </HelperText>
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
            <View
              style={{
                marginBottom: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button icon={"arrow-left"} onPress={resetInputs} />
              <Text> OTP has been sent to +91 {mobileNumber}</Text>
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                mode="outlined"
                label={"Enter OTP"}
                value={otp}
                secureTextEntry={true}
                onChangeText={(e) => {
                  setErrors({ ...errors, otp: "" });
                  setOtp(e);
                }}
              ></TextInput>
              <Button
                mode="text"
                onPress={handleMobileNumber}
                style={styles.resend}
              >
                Resend
              </Button>
              <HelperText
                style={{ textAlign: "center" }}
                type="error"
                visible={errors.otp}
              >
                {errors.otp}{" "}
              </HelperText>
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleOtp}
              >
                Submit OTP
              </Button>
            </View>
          </>
        )}
      </View>
      <View
        style={{ backgroundColor: theme.colors.background, height: "100%" }}
      ></View>
    </>
  );
}

export default SignIn;
