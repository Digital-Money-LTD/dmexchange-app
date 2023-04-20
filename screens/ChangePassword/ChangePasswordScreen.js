import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, SafeAreaView, StatusBar, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import  AuthUser from "../../Api/AuthUser";

const ChangePasswordScreen = ({ navigation }) => {
    const navigater = useNavigation();
    const { postRequest } = AuthUser();
    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const password_data = {
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
    };
    const handleChangePassword = (e) => {
    e.preventDefault();

    postRequest('change-password', password_data)
      .then(response => {
        if (response.data.status === 400){
          setErrors(response.data.message);
        } else if (response.data.status === 200) {
          Alert.alert(response.data.message);
          setOldPassword('');
          setPassword('');
          setConfirmPassword('');
          setErrors('');
          //navigater.navigate('SignIn');
        }
      })
    //.catch(error => console.log(error));
    .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
        }
    });

};
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='Old Password'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={old_password}
                            onChangeText={text => setOldPassword(text)}
                            secureTextEntry={true}
                        />
                        {errors.old_password && <Text style={{ color: 'red' }}>{errors.old_password[0]}</Text>}
                    </View>
                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='New Password'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password[0]}</Text>}
                    </View>
                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='Confirm Password'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={password_confirmation}
                            onChangeText={text => setConfirmPassword(text)}
                            secureTextEntry={true}
                        />
                        {errors.password_confirmation && <Text style={{ color: 'red' }}>{errors.password_confirmation[0]}</Text>}
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleChangePassword}
                        style={styles.saveButtonContainerStyle}>
                        <Text style={{ ...Fonts.white16SemiBold }}>Update Password</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Feather
                    name="arrow-left"
                    size={25}
                    color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.white17SemiBold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Change Password
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    changeProfileContainerStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.orangeColor,
        paddingVertical: Sizes.fixPadding - 5.0,
        width: 130.0,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButtonContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    textFieldsCommonStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 1.5
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
}
)

export default ChangePasswordScreen;