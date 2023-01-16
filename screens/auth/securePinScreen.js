import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const keyboardItemsList = [
    {
        id: '1',
        data: 1,
    },
    {
        id: '2',
        data: 2,
    },
    {
        id: '3',
        data: 3,
    },
    {
        id: '4',
        data: 4,
    },
    {
        id: '5',
        data: 5,
    },
    {
        id: '4',
        data: 4,
    },
    {
        id: '7',
        data: 7,
    },
    {
        id: '8',
        data: 8,
    },
    {
        id: '9',
        data: 9,
    },
    {
        id: '10',
        data: '',
    },
    {
        id: '11',
        data: 0,
    },
    {
        id: '12',
        data: <Ionicons name="backspace" size={24} color="black" />,
    },
];

const SecurePinScreen = ({ navigation }) => {

    const [state, setState] = useState({
        pinCount: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { pinCount } = state;

    if (pinCount == 4) {
        setTimeout(() => {
            navigation.navigate('BottomTabScreen', { index: 1 });
        }, 2000)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {needHelpScreen()}
                {logo()}
                {enterPinInfo()}
                {pinBoxes()}
                {pinCount < 4 ?
                    forgotPINText() : < ActivityIndicator
                        color={Colors.primaryColor}
                        style={{ marginTop: Sizes.fixPadding * 3.0 }} />
                }
                {keyBoardDesign()}
            </View>
        </SafeAreaView>
    )

    function pinBoxes() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: Sizes.fixPadding * 7.0 }}>
                <View style={{
                    backgroundColor:
                        pinCount == 1 ||
                            pinCount == 2 ||
                            pinCount == 3 ||
                            pinCount == 4
                            && pinCount != 0 ? Colors.blackColor : Colors.whiteColor,
                    borderColor:
                        pinCount == 1 ||
                            pinCount == 2 ||
                            pinCount == 3 ||
                            pinCount == 4 ? Colors.blackColor : 'gray',
                    ...styles.pinBoxContainerStyle
                }}>
                </View>
                <View style={{
                    backgroundColor:
                        pinCount == 2 ||
                            pinCount == 3 ||
                            pinCount == 4
                            && pinCount != 0 ? Colors.blackColor : Colors.whiteColor,
                    borderColor:
                        pinCount == 2 ||
                            pinCount == 3 ||
                            pinCount == 4 ? Colors.blackColor : 'gray',
                    ...styles.pinBoxContainerStyle
                }}>
                </View>
                <View style={{
                    backgroundColor:
                        pinCount == 3 ||
                            pinCount == 4
                            && pinCount != 0 ? Colors.blackColor : Colors.whiteColor,
                    borderColor:
                        pinCount == 3 ||
                            pinCount == 4 ? Colors.blackColor : 'gray',
                    ...styles.pinBoxContainerStyle
                }}>
                </View>
                <View style={{
                    backgroundColor:
                        pinCount == 4
                            && pinCount != 0 ? Colors.blackColor : Colors.whiteColor,
                    borderColor: pinCount == 4 ? Colors.blackColor : 'gray',
                    ...styles.pinBoxContainerStyle,
                }}>
                </View>
            </View>
        )
    }

    function keyBoardDesign() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (item.id != 10) {
                        item.id == 12 ?
                            updateState({ pinCount: pinCount - 1 }) :
                            updateState({ pinCount: pinCount + 1 })
                    }
                }}
                style={styles.keyboardItemContainerStyle}>
                {item.id == 12 ?
                    item.data : <Text style={{ ...Fonts.black17SemiBold }}>{item.data}</Text>
                }
            </TouchableOpacity>
        )
        return (

            <View style={{ position: 'absolute', bottom: 0.0 }}>
                <FlatList
                    data={keyboardItemsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                />
            </View>
        )
    }

    function forgotPINText() {
        return (
            <Text style={{ ...Fonts.primaryColor15Medium, marginTop: Sizes.fixPadding * 2.0, alignSelf: 'center' }}>
                Forgot PIN?
            </Text>
        )
    }

    function enterPinInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.black17SemiBold }}>Enter your PIN</Text>
                <Text style={{ ...Fonts.gray15Medium, marginTop: Sizes.fixPadding - 3.0 }}>
                    Enter the secure PIN to access your account.
                </Text>
            </View>
        )
    }

    function logo() {
        return (
            <Image source={require('../../assets/images/auth-icon.png')}
                style={styles.logoImageStyle}
                resizeMode="contain"
            />
        )
    }

    function needHelpScreen() {
        return (
            <Text style={{
                ...Fonts.primaryColor15Medium,
                alignSelf: 'flex-end',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding * 2.0,
            }}>
                NEED HELP?
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    keyboardItemContainerStyle: {
        width: width / 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1.0,
        borderTopColor: '#E1E3E5',
        borderRightColor: '#E1E3E5',
        borderRightWidth: 1.0,
        paddingVertical: Sizes.fixPadding + 3.0,
    },
    pinBoxContainerStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    logoImageStyle: {
        alignSelf: 'center',
        width: 100.0,
        height: 100.0,
        marginVertical: Sizes.fixPadding * 2.0
    }
})

export default SecurePinScreen;