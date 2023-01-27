import React, { useState, useCallback } from "react";
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
    TextInput
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
//import IntlPhoneInput from 'react-native-intl-phone-input';
import { useFocusEffect } from '@react-navigation/native';

const SignInScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount } = state;

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
                    {emailLogin()}
                    {passwordTextField()}
                    {forGotPassword()}
                    {continueButton()}
                    {sendOTPInfo()}
                    {loginWithFacebookButton()}
                    {loginWithGoogleButton()}
                    
                   
                </ScrollView>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.white13Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

   function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


   function emailLogin() {
    const [email, setEmail] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const handleChange = (text) => {
        setEmail(text);
        setCheckValidEmail(!validateEmail(text));
    }

    return (
        <View style={styles.textFieldContainerStyle}>
            <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.blackColor}
                style={Fonts.black16Medium}
                keyboardType="email-address"
                value={email}
                onChangeText={handleChange}
            />
            {checkValidEmail && <Text style={styles.errorTextStyle}>Invalid email</Text>}
        </View>
    )
}

    function validatePassword(password) {
    if (password.length > 5) {
        return false;
    } else {
        return true;
    }
}


    function passwordTextField() {
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [checkValidPassword, setCheckValidPassword] = useState(false);

    const handleChange = (text) => {
        setPassword(text);
        setCheckValidPassword(validatePassword(text));
    }

    return (
        <View style={styles.textFieldContainerStyle}>
            <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.blackColor}
                style={Fonts.black16Medium}
                secureTextEntry={!seePassword}
                value={password}
                onChangeText={handleChange}
            />
            <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
                <View style={{position: 'absolute', bottom:'80%', left: '95%'}}>
                    { seePassword ? 
                        <Image source={require('../../assets/images/icon/form/hide-icon.png')}/> 
                        : <Image source={require('../../assets/images/icon/form/show-icon.png')}/>
                    }
                </View>
            </TouchableOpacity>
            {checkValidPassword && <Text style={styles.errorTextStyle}>Invalid password</Text>}
        </View>
    )
}
    



    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Register')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Login</Text>
            </TouchableOpacity>
        )
    }

    function loginWithFacebookButton() {
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
    }

    function loginWithGoogleButton() {
        return (
            <View>
                <View style={styles.loginWithGoogleButtonStyle}>
                    <Image source={require('../../assets/images/google.png')}
                        style={{ height: 20.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.black15Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Login with Google
                    </Text>
                </View>
            </View>
        )
    }

    function sendOTPInfo() {
        return (
            <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', marginTop: Sizes.fixPadding }}>
               {/* We'll send otp for verification*/} 
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
                <Text style={{ position: 'absolute', right: 10, padding: 10 }}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
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
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
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