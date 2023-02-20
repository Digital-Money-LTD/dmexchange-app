import React, { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    BackHandler,
    Alert,
    TextInput
} from "react-native";
import  AuthUser from "../../Api/AuthUser";

// Import the constants for styles such as fonts, colors, and sizes
import { Fonts, Colors, Sizes } from "../../constants/styles";

const errorstyles= StyleSheet.create({
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
    },
    inputError: {
      borderColor: "red",
    },
    error: {
      color: 'red',
      marginTop: 2,
      marginLeft: 30,
    },
  });
  



// Define the SignInScreen component
const SignInScreen = ({ navigation }) => {

    const navigater = useNavigation();
    const {http, postRequest, setToken} = AuthUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState([]);
    const [isError, setIsError] = useState(false);

    




    let login_data = {
        email: email,
        password: password
    };

    const handleLogin = (e) => {
        e.preventDefault();
          postRequest('login', login_data)
          .then(response => {
            if (response.data.status === 401 ){
              console.log(response.data);
              Alert.alert(response.data.message);
            } else if (response.data.status === 400) {
                Alert.alert("Input Errors" + response.data.message);
            } else if (response.data.status === 200) {
              console.log(response.data);
              AsyncStorage.setItem('api_token', response.data.token);
              setIsLoggedIn(true);
              Alert.alert(response.data.message);
              setEmail('');
              setPassword('');
              navigater.navigate('BottomTabScreen');
            }
          })
          //.
          .catch(error => {
            // Handle network error
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });

      };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding,
                        flexGrow: 1,
                        justifyContent: 'center'
                    }}
                >
                    {logo()}
                    {signInText()}
                    
                    <View style={styles.textFieldContainerStyle}>
                        <TextInput
                            value={email}
                            placeholder="Email"
                            placeholderTextColor={Colors.blackColor}
                            style={{ ...Fonts.black16Medium } }
                            keyboardType="email-address"
                            onChangeText={text => setEmail(text)}
                            
                        />
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
                    </View>
                    
                    {forGotPassword()}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleLogin}
                        style={styles.continueButtonStyle}>
                        <Text style={{ ...Fonts.white16SemiBold }}>Login</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={() => navigation.push('Register')}>
                                <Text style={{ ...Fonts.blackRegular, alignSelf: 'center', marginTop: 20 }}>
                                Don't have an account? <Text style={{ color: Colors.orangeColor}}>Get Started</Text>
                                </Text>
                        </TouchableOpacity>
                    </View>
                    {sendOTPInfo()}
                    {loginWithGoogleButton()}
                    
                </ScrollView>
            </View>
            
        </SafeAreaView>
    )

   
    



function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Register')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.blackRegular}}>Login</Text>
            </TouchableOpacity>
        )
    }
//function that puts the login with facebook button back on or off

   {/*} function loginWithFacebookButton() {
        return (
            <View>
                <View style={styles.loginWithFacebookButtonStyle}>
                    <Image source={require('../../assets/images/facebook.png')}
                        style={{ height: 20.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.white15Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Login with Facebook
                    </Text>
                </View>
            </View>
        )
    }*/}

    function loginWithGoogleButton() {
        return (
            <View>
                <View style={styles.loginWithGoogleButtonStyle}>
                    <Image source={require('../../assets/images/google.png')}
                        style={{ height: 20.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Login with Google
                    </Text>
                </View>
            </View>
        )
    }
    
    function sendOTPInfo() {
        return (
            <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', marginTop: Sizes.fixPadding }}>
              
            </Text>
        )
    }

    function logo() {
        return (
            <Image source={require('../../assets/images/auth-icon.png')}
                style={{ alignSelf: 'center', width: 150.0, height: 150.0, marginBottom: Sizes.fixPadding }}
                resizeMode="contain"
            />
        )
    }

    function signInText() {
        return (
            <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginVertical: Sizes.fixPadding + 5.0 }}>
                {/*Digital Money Login*/}
            </Text>
        )
    }
}

{/*Forgot password*/}

const forGotPassword = () => {
    return (
        <View>
            {/* Other form fields */}
            <TouchableOpacity onPress={() => navigate('ResetPassword')}>
                <Text style={{ ...Fonts.blackRegular,position: 'absolute', right: 10, padding: 10, color: Colors.orangeColor}}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
}
const registerButton = () => {
    return (
        <View>
       
        <TouchableOpacity onPress={() => navigation.push('registerScreen')}>
                <Text style={{ ...Fonts.blackRegular, alignSelf: 'center', marginTop: 20 }}>
                Don't have an account? <Text style={{ color: Colors.orangeColor}}>Get Started</Text>
                </Text>
            </TouchableOpacity>
    </View>
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

    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        backgroundColor: '#3B5998',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 3.5
    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * -0.9
    },
    registerButtonStyle: {
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingVertical: Sizes.fixPadding + 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * -0.9
    },
    continueButtonStyle: {
        backgroundColor: Colors.orangeColor,
        paddingVertical: Sizes.fixPadding + 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 4.0
    },
    phoneNumberContainerStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        height: 55.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default SignInScreen;