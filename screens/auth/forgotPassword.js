import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import  AuthUser from "../../Api/AuthUser";




const ForgotPasswordScreen = ({ navigation }) => {
    const navigater = useNavigation();
    const { postRequest } = AuthUser();
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);



    let register_data = {
      email: email,
    };

   const handleRegister = (e) => {
  e.preventDefault();

  let errors = {};

  if (!name) {
    errors.name = "Please enter your Username";
  }

  if (!email) {
    errors.email = "Please enter your email";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!password) {
    errors.password = "Please enter a password";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!password_confirmation) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password_confirmation !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  setNameError(errors.name || null);
  setEmailError(errors.email || null);
  setPasswordError(errors.password || null);
  setConfirmPasswordError(errors.confirmPassword || null);

  if (Object.keys(errors).length === 0) {
    const register_data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    };

    postRequest('register', register_data)
      .then(response => {
        if (response.data.status === 400){
          setEmailError(response.data.message.email || null);
          setPasswordError(response.data.message.password || null);
          setConfirmPasswordError(response.data.message.password_confirmation || null);
        } else if (response.data.status === 200) {
          Alert.alert(response.data.message);
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigater.navigate('SignIn');
        }
      })
      .catch(error => console.log(error));
  }
};

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
                        onPress={handleRegister}
                        style={styles.continueButtonStyle}>
                        <Text style={{ ...Fonts.white16SemiBold }}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View>
     
              <TouchableOpacity onPress={() => navigation.push('SignIn')}>
                      <Text style={{ position:'absolute', bottom:80, alignSelf: 'center', marginBottom: 0 }}>
                      Already have an account? <Text style={{ color: Colors.primaryColor}}>Login</Text>
                      </Text>
                  </TouchableOpacity>
          </View>
        </SafeAreaView>
    )

}


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
})

export default ForgotPasswordScreen;