import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  
  const handleResetPassword = () => {
    // Handle reset password functionality here
    // ...
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizes.fixPadding,
            flexGrow: 1,
            justifyContent: 'center'
          }}
        >
          <Image source={require('../../assets/images/auth-icon.png')}
            style={{ alignSelf: 'center', width: 150.0, height: 150.0, marginBottom: Sizes.fixPadding }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ alignSelf: 'center', marginBottom: Sizes.fixPadding }}>
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
              onChangeText={text => setEmail(text)}
            />
            {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleResetPassword}
            style={styles.continueButtonStyle}
          >
            <Text style={{ ...Fonts.white16SemiBold }}>Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.push('SignIn')}>
          <Text style={{ alignSelf: 'center', marginTop: Sizes.fixPadding }}>
            Already have an account? <Text style={{ color: Colors.primaryColor }}>Login</Text>
          </Text>
        </TouchableOpacity>
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
