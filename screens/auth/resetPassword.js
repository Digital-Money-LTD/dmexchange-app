import React, { createRef, useState } from "react";
import { Feather } from '@expo/vector-icons';
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
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";


const { width } = Dimensions.get('screen');

const ResetPasswordScreen = ({ navigation }) => {
  const [state, setState] = useState({
        isLoading: false
    });
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');  
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // simulate request
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("ResetPassword");
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primaryColor}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
      <Feather
        name="arrow-left"
        size={25}
        color="black"
        style={{ position: 'absolute', left: 15.0, top: 20.0, zIndex: 1, }}
        onPress={() => navigation.pop()}
      />
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
              Set your new password and confirm it.
            </Text>
          </View>
          <View style={styles.textFieldContainerStyle}>
            <TextInput
                value={password}
                placeholder="Password"
                placeholderTextColor={Colors.blackColor}
                style={{ ...Fonts.black16Medium }}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
                {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
            </View>

            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    value={password_confirmation}
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }}
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                />
                {confirmPasswordError && <Text style={{ color: 'red' }}>{confirmPasswordError}</Text>}
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
      {/* <View
        style={{ alignSelf: "center", marginBottom: Sizes.fixPadding * 2.0 }}
      >
        <Text style={{ alignSelf: "center", marginTop: Sizes.fixPadding }}>
          Didn't receive code?{" "}
          
          <Text
            style={{ color: Colors.primaryColor }}
            onPress={() => navigation.goBack()}
          >
            Resend
          </Text>
        </Text>
      </View> */}
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
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5
    },
   
});

export default ResetPasswordScreen;
