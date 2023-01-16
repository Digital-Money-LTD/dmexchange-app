import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import { BottomSheet } from "@rneui/themed";

const EditProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: 'Peter Jones',
        email: 'peter@test.com',
        phoneNumber: '123456789',
        password: '1234567',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        phoneNumber,
        password,
        showBottomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profileImageChangeInfo()}
                    {nameTextField()}
                    {emailTextField()}
                    {phoneNumberTextField()}
                    {passwordTextField()}
                    {saveButton()}
                </ScrollView>
            </View>
            {viewBottomSheet()}
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
                    Edit Profile
                </Text>
            </View>
        )
    }

    function viewBottomSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { updateState({ showBottomSheet: false }) } }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={styles.bottomSheetStyle}
                >
                    <Text style={{ ...Fonts.black19Bold, textAlign: 'center', }}>
                        Choose Option
                    </Text>
                    <View style={{ height: 0.80, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-camera" size={22} color="#4C4C4C" />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={22} color="#4C4C4C" />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
                style={styles.saveButtonContainerStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Save</Text>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        return (
            <View style={styles.textFieldsCommonStyle}>
                <OutlinedTextField
                    label='Password'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={password}
                    onChangeText={(value) => updateState({ password: value })}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    function phoneNumberTextField() {
        return (
            <View style={styles.textFieldsCommonStyle}>
                <OutlinedTextField
                    label='PhoneNumber'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={phoneNumber}
                    onChangeText={(value) => updateState({ phoneNumber: value })}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={styles.textFieldsCommonStyle}>
                <OutlinedTextField
                    label='Email'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function nameTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0 }}>
                <OutlinedTextField
                    label='Name'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={name}
                    onChangeText={(value) => updateState({ name: value })}
                />
            </View>
        )
    }

    function profileImageChangeInfo() {
        return (
            <View style={{ alignItems: 'center', marginTop: Sizes.fixPadding * 2.5 }}>
                <Image
                    source={require('../../assets/images/user/user_14.jpg')}
                    style={{ height: 130.0, width: 130.0, borderRadius: 65.0, }}
                    resizeMode="contain"
                />
                <View style={{ position: 'absolute', bottom: -9.0, }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showBottomSheet: true })}
                        style={styles.changeProfileContainerStyle}>
                        <MaterialIcons name="photo-camera" size={15} color="white" />
                        <Text style={{ ...Fonts.white13Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
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

export default EditProfileScreen;