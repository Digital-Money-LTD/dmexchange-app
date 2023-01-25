import React from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';

const SuccessScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.pageStyle} >
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <Text style={{ ...Fonts.black19SemiBold, marginTop: Sizes.fixPadding + 5.0 }}>
                Congratulations!
            </Text>
            <View style={styles.successIconContainerStyle}>
                <Ionicons name="checkmark-sharp" size={50} color="white" />
            </View>
            <View>
                <Text style={styles.successTextStyle}>
                    You have successfully buy 2.0658 Bitcoin (Btc) at price of $37,568.
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Wrong')}
                    style={styles.okButtonStyle}>
                    <Text style={{ ...Fonts.white16Medium }}>Okay!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    successTextStyle: {
        ...Fonts.gray15Medium,
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    okButtonStyle: {
        backgroundColor: Colors.greenColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    successIconContainerStyle: {
        height: 150.0,
        width: 150.0,
        borderRadius: 75.0,
        alignItems: 'center',
        backgroundColor: Colors.greenColor,
        borderColor: '#A9C8AC',
        borderWidth: 15.0,
        justifyContent: 'center'
    },
    pageStyle: {
        flex: 1,
        backgroundColor: Colors.backColor,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default SuccessScreen;