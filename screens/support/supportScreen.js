import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: '',
        nameFieldColor: '#CBCBCC',
        email: '',
        emailFieldColor: '#CBCBCC',
        description: '',
        descriptionFieldColor: '#CBCBCC',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        nameFieldColor,
        email,
        emailFieldColor,
        description,
        descriptionFieldColor,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {nameTextField()}
                    {emailTextField()}
                    {descriptionTextField()}
                    {submitButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
                style={styles.submitButtonContainerStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Submit</Text>
            </TouchableOpacity>
        )
    }

    function descriptionTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <TextInput
                    style={{
                        borderColor: descriptionFieldColor,
                        ...styles.textFieldContainerStyle,
                    }}
                    value={description}
                    onChangeText={(text) => updateState({ description: text })}
                    placeholder="Write here"
                    onFocus={() => updateState({ descriptionFieldColor: Colors.primaryColor })}
                    onBlur={() => updateState({ descriptionFieldColor: '#CBCBCC' })}
                    multiline
                    numberOfLines={5}
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <TextInput
                    style={{
                        borderColor: emailFieldColor,
                        ...styles.textFieldContainerStyle,
                    }}
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    placeholder="Email address"
                    onFocus={() => updateState({ emailFieldColor: Colors.primaryColor })}
                    onBlur={() => updateState({ emailFieldColor: '#CBCBCC' })}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function nameTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <TextInput
                    style={{
                        borderColor: nameFieldColor,
                        ...styles.textFieldContainerStyle,
                    }}
                    value={name}
                    onChangeText={(text) => updateState({ name: text })}
                    placeholder="Name"
                    onFocus={() => updateState({ nameFieldColor: Colors.primaryColor })}
                    onBlur={() => updateState({ nameFieldColor: '#CBCBCC' })}
                />
            </View>
        )
    }

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
                    Support
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
    textFieldContainerStyle: {
        borderWidth: 1.8,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingLeft: Sizes.fixPadding + 5.0,
        ...Fonts.black16Medium
    },
    submitButtonContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 3.0
    }
})

export default SupportScreen;