import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
//import { postRequest } from "../../Api/request";
import { AuthUser } from "../../Api/AuthUser";


const RegisterScreen = ({ navigation }) => {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');

<<<<<<< HEAD
    

=======
 
>>>>>>> 6fbfdcc32c160f01eeeb8c8242853b087a084d5f

    let register_data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    };

    const handleRegister = (e) => {
      e.preventDefault();
        postRequest('register', register_data)
        .then(response => {
          if (response.status === 400){
            console.log(response.data);
            Alert.alert("Input Errors");
          } else if (response.status === 200) {
            console.log(response.data);
            Alert.alert("Registration successful!");
            navigate('/login')
          }
        })
        .catch(error => console.log(error));
    };

    const submitForm = () =>{
      http.post('/register',{register_data})
      .then((res)=>{
          navigate('/login')
      })
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Feather
          name="arrow-left"
          size={25}
          color="black"
          style={{
            position: "absolute", 
            left: 15.0,
            top: 20.0,
            zIndex: 1
          }}
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
                    <View style={styles.textFieldContainerStyle}>
                        <TextInput
                            value={name}
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
                            value={password_confirmation}
                            placeholder="Confirm Password"
                            placeholderTextColor={Colors.blackColor}
                            style={{ ...Fonts.black16Medium }}
                            secureTextEntry={true}
                            onChangeText={text => setConfirmPassword(text)}
                        />
                       
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
     
              <TouchableOpacity onPress={() => navigation.push('signin')}>
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

export default RegisterScreen;