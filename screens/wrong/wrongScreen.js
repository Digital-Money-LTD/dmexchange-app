import React, { useCallback } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const WrongScreen = ({ navigation }) => {

    const backAction = () => {
        navigation.navigate('BottomTabScreen')
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    return (
        <SafeAreaView style={styles.pageStyle}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <Text style={{ ...Fonts.black19SemiBold, marginTop: Sizes.fixPadding + 5.0 }}>
                Oops.. Something Went Wrong!
            </Text>
            <View style={styles.wrongIconContainerStyle}>
                <Ionicons name="close-sharp" size={50} color="white" />
            </View>
            <View>
                <Text style={styles.wrongTextStyle}>
                    You order of buy 2.0658 Bitcoin (Btc) at price of $37,568 has cancelled unfortunately.Try again.
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.okButtonStyle}
                    onPress={() => navigation.navigate('BottomTabScreen')}
                >
                    <Text style={{ ...Fonts.white16Medium }}>Okay!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrongTextStyle: {
        ...Fonts.gray15Medium,
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    okButtonStyle: {
        backgroundColor: Colors.redColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    wrongIconContainerStyle: {
        height: 150.0,
        width: 150.0,
        borderRadius: 75.0,
        alignItems: 'center',
        backgroundColor: Colors.redColor,
        borderColor: '#F6AAAC',
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

export default WrongScreen;