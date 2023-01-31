import axios from "axios";
import React, { useState, useCallback } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import {postRequest} from "../../Api/request";
//import request from "./request";


const RegisterScreen = ({ navigation }) => {

    //
    const [loader, setLoader] = useState({ isLoading: false });

    const [usesrname, setUsernasme] = useState('');
    const [emasil, setEmasil] = useState('');
    const [passsword, setPsassword] = useState('');
    const [passswordConfirm, setPassswordConfirm] = useState('');
    //{loader && ( <ActivityIndicator  color="#ffffff" /> )}

    const handleSubmits = () => {
        //setLoader({ isLoading: true });
        
        if (!username || !email || !password || !passwordConfirm) {
            Alert.alert('All fields are required');
            //setTimeout(() => { setLoader({ isLoading: false }); }, 1000);
            return;
        }

        if (password !== passwordConfirm) {
            Alert.alert('Passwords do not match');
            return;
        }

        const registerdata = {
            name: username,
            email: email,
            referal_code: '',
            password: password
        };

        postRequest('register_user', registerdata)
        .then(response => {
            console.log(response);
            Alert.alert('Registration successful!');

            //if (response.status === 201) {
              //  console.error("Error: Request failed with status code 422");
              //  console.error(error.response.data);
                // Add your own error handling code here, such as displaying a message to the user
             // } else {
             //   console.error("Error:", error.response.data);
             // }
        })
        .catch(error => {
            console.log(error);
            Alert.alert('Error registering user. Please try again.');
        });
      }


      //const [loading, setLoading] = useState(false);
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = useCallback(async () => {
    //setLoading(true);

    if (!username || !email || !password || !passwordConfirm) {
      Alert.alert('All fields are required');
      //setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert('Passwords do not match');
      //setLoading(false);
      return;
    }

    const registerdata = {
      name: username,
      email: email,
      referal_code: '',
      password: password
    };

    try {
      const response = await postRequest('register_user', registerdata);
      console.log(response);
      Alert.alert('Registration successful!');
    } catch (error) {
      console.log(error);
      Alert.alert('Error registering user. Please try again.');
    } finally {
      //setLoading(false);
    }
  }, [username, email, password, passwordConfirm]);








    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Feather
                    name="arrow-left"
                    size={25}
                    color="black"
                    style={{ position: 'absolute', left: 15.0, top: 20.0, zIndex: 1 }}
                    onPress={() => navigation.pop()}
                />
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
                    <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginTop: Sizes.fixPadding + 5.0 }}>
                        Register your account
                    </Text>
                    <View style={styles.textFieldContainerStyle}>
                        <TextInput
                            value={username}
                            placeholder="Username"
                            placeholderTextColor={Colors.blackColor}
                            style={{ ...Fonts.black16Medium }}
                            onChangeText={text => setUsername(text)}
                        />
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
                    <View style={styles.textFieldContainerStyle}>
                        <TextInput
                            value={passwordConfirm}
                            placeholder="Confirm Password"
                            placeholderTextColor={Colors.blackColor}
                            style={{ ...Fonts.black16Medium }}
                            secureTextEntry={true}
                            onChangeText={text => setPasswordConfirm(text)}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleSubmit}
                        style={styles.continueButtonStyle}>
                        <Text style={{ ...Fonts.white16SemiBold }}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>
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
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0
    },
})

export default RegisterScreen;