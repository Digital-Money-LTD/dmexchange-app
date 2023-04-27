import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import  AuthUser from "../../Api/AuthUser";
import { useRoute } from '@react-navigation/native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { postRequest} = AuthUser();
  const route = useRoute();

  let _data = {
    email: email,
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    // simulate request
    postRequest('send-email-code', _data)
    .then(response => {
      setIsLoading(false); // Set isLoading back to false
      if (response.data.status === 401 ){
        console.log(response.data);
        Alert.alert(response.data.message);
      } else if (response.data.status === 400) {
          Alert.alert("Input Errors" + response.data.message);
      } else if (response.data.status === 200) {
        console.log(response.data);
        navigation.navigate('EnterEmailCode', {
          email: email
        });
      }
    })
    
    //.
    .catch(error => {
      // Handle network error
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    // setTimeout(() => {
    //   setIsLoading(false);
    //   navigation.navigate("ResetPassword");
    // }, 2000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = text => {
    setEmail(text);
    if (validateEmail(text)) {
        setEmailError('');
    } else {
        setEmailError('Invalid email');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primaryColor}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizes.fixPadding,
            flexGrow: 1,
            justifyContent: "center"
          }}
        >
          <Image
            source={require("../../assets/images/auth-icon.png")}
            style={{
              alignSelf: "center",
              width: 150.0,
              height: 150.0,
              marginBottom: Sizes.fixPadding
            }}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{
                alignSelf: "center",
                marginBottom: Sizes.fixPadding
              }}
            >
              Enter your email for password reset instructions.
            </Text>
          </View>
          <View style={styles.textFieldContainerStyle}>
            <TextInput
              value={email}
              placeholder="Email"
              placeholderTextColor={Colors.blackColor}
              style={{ ...Fonts.black16Medium }}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
              // onChangeText={(text) => setEmail(text)}
            />
            {emailError && (
              <Text style={{ color: "red" }}>{emailError}</Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleResetPassword}
            style={styles.continueButtonStyle}
            disabled={isLoading}
          >
            {!isLoading ? (
              <Text style={{ ...Fonts.white16SemiBold }}>
                Reset Password
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View
        style={{ alignSelf: "center", marginBottom: Sizes.fixPadding * 2.0 }}
      >
        <Text style={{ alignSelf: "center", marginTop: Sizes.fixPadding }}>
          Already have an account?{" "}
          <Text
            style={{ color: Colors.primaryColor }}
            onPress={() => navigation.goBack()}
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textFieldContainerStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
    elevation: 1.0,
    marginTop: Sizes.fixPadding * 2.0
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 4.0
  },
});

export default ForgotPasswordScreen;
