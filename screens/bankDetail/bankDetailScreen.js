import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Ionicons, Feather } from '@expo/vector-icons';
import { OutlinedTextField } from 'rn-material-ui-textfield';

const { width } = Dimensions.get('screen');

const BankDetailScreen = ({ navigation }) => {

    const [state, setState] = useState({
        accountNumber: '1234567890',
        ifscCode: 'XYZIN0004569',
        accountTypeIndex: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        accountNumber,
        ifscCode,
        accountTypeIndex,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView>
                    {congratulationsInfo()}
                    {accountNumberTextField()}
                    {ifscCodeTextField()}
                    {selectAccountTypeTitle()}
                    <View style={styles.accountTypesContainerStyle}>
                        {accountTypes({ index: 1, title: 'Saving' })}
                        <View style={{ marginLeft: Sizes.fixPadding * 10.0 }}>
                            {accountTypes({ index: 2, title: 'Current' })}
                        </View>
                    </View>
                    {saveButton()}
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
                    Your Bank Details
                </Text>
            </View>
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

    function accountTypes({ index, title }) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ accountTypeIndex: index })}
                    style={{
                        borderColor: accountTypeIndex == index ? Colors.primaryColor : 'gray',
                        ...styles.radioButtonOuterContainerStyle
                    }}>
                    {accountTypeIndex == index ?
                        <View style={styles.radioButtonInnerContainerStyle}>
                        </View> : null
                    }
                </TouchableOpacity>
                <Text style={{ ...Fonts.black15Medium, marginLeft: Sizes.fixPadding }}>
                    {title}
                </Text>
            </View>

        )
    }

    function accountNumberTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.5 }}>
                <OutlinedTextField
                    label='Account Number'
                    keyboardType="numeric"
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black16SemiBold, }}
                    value={accountNumber}
                    onChangeText={(value) => updateState({ accountNumber: value })}
                />
            </View>
        )
    }

    function ifscCodeTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 1.5 }}>
                <OutlinedTextField
                    label='IFSC Code'
                    keyboardType="numeric"
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={ifscCode}
                    onChangeText={(value) => updateState({ ifscCode: value })}
                />
            </View>
        )
    }

    function selectAccountTypeTitle() {
        return (
            <Text style={{
                ...Fonts.black17SemiBold, marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}>Select Acccount Type</Text>
        )
    }

    function congratulationsInfo() {
        return (
            <View style={{ backgroundColor: '#D9DBDC' }}>
                <View style={styles.congratulationsInfoContainerStyle}>
                    <View style={styles.successIconContainerStyle}>
                        <Ionicons name="checkmark-sharp" size={25} color={Colors.whiteColor} />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                        <Text style={{ ...Fonts.black16Medium }}>
                            Congratulations! You have successfully added your bank account details.
                        </Text>

                    </View>
                </View>
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
    congratulationsInfoContainerStyle: {
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        width: width - 40.0,
        alignSelf: 'center',
    },
    successIconContainerStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.greenColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountTypesContainerStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 7.0
    },
    radioButtonOuterContainerStyle: {
        height: 20.0,
        width: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonInnerContainerStyle: {
        width: 11.0,
        height: 11.0,
        borderRadius: 6.5,
        backgroundColor: Colors.primaryColor,
    },
    saveButtonContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 15.0
    },
})

export default BankDetailScreen;