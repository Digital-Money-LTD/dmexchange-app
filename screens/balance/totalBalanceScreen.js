import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('screen');

const transactionList = [
    {
        id: '1',
        isSuccess: true,
        isDeposite: true,
        title: 'USD Deposit',
        dateAndTime: 'May 10,2021 9:02:21 PM',
        amount: '5,000',
    },
    {
        id: '2',
        isSuccess: true,
        isDeposite: false,
        title: 'USD Deposit',
        dateAndTime: 'May 2,2021 2:25:25 PM',
        amount: '1,000',
    },
    {
        id: '3',
        isSuccess: false,
        title: 'USD Deposit',
        dateAndTime: 'April 6,2021 10:35:23 AM',
        amount: '10,000',
    },
    {
        id: '4',
        isSuccess: false,
        title: 'USD Deposit',
        dateAndTime: 'April 6,2021 10:29:59 AM',
        amount: '10,000',
    },
];

const TotalBalanceScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showModal: false,
        isSuccess: null,
        dateAndTime: '',
        amount: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showModal,
        isSuccess,
        dateAndTime,
        amount
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <View style={{ elevation: 3.0, borderBottomColor: 'gray' }}>
                    {totalBalanceInfo()}
                    {depositeAndWithdrawnInfo()}
                </View>
                {transactions()}
            </View>
            {depositeAndWithdrawnButton()}

        </SafeAreaView>
    )

    function depositeAndWithdrawnButton() {
        return (
            <View>
                <View style={styles.depositeAndWithdrawnButtonContainerStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Deposit')}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            DEPOSIT
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 30.0, width: 2.0, backgroundColor: "rgba(255,255,255,0.22)" }}>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Withdraw')}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            WITHDRAW
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function totalBalanceInfo() {
        return (
            <View style={{ alignItems: 'center', backgroundColor: 'white', paddingVertical: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.black17SemiBold }}>USD</Text>
                <Text style={{ ...Fonts.gray13Medium, marginVertical: Sizes.fixPadding }}>Available Balance</Text>
                <Text style={{ ...Fonts.black19Bold }}>$152</Text>
                <MaterialIcons
                    name="close"
                    size={24}
                    color="black"
                    style={{ position: 'absolute', top: 15.0, left: 20.0 }}
                    onPress={() => navigation.goBack()}
                />
            </View>
        )
    }

    function transactions() {
        const renderItem = ({ item }) => (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        updateState({ showModal: true })
                        updateState({ isSuccess: item.isSuccess })
                        updateState({ dateAndTime: item.dateAndTime })
                        updateState({ amount: item.amount })
                    }}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            ...styles.transactionIconContainerStyle,
                            backgroundColor: item.isSuccess == true ? Colors.greenColor : Colors.redColor,
                        }}>
                            {item.isSuccess == true ?
                                item.isDeposite ?
                                    <MaterialCommunityIcons name="arrow-bottom-left" size={24} color={Colors.whiteColor} /> :
                                    <MaterialCommunityIcons name="arrow-top-right" size={24} color={Colors.whiteColor} />
                                :
                                <MaterialCommunityIcons name="close" size={24} color={Colors.whiteColor} />
                            }
                        </View>
                        <View style={{ marginHorizontal: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.black16Medium }}>
                                {item.title}
                            </Text>
                            <Text style={{ ...Fonts.gray13Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                                {item.dateAndTime}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ ...Fonts.black16Bold }}>${item.amount}</Text>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: 'gray', marginVertical: Sizes.fixPadding * 2.0,
                    height: 0.60,
                }}></View>
                {showDialog()}
            </View>
        )

        return (
            <FlatList
                data={transactionList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    function showDialog() {
        return (
            <Dialog.Container visible={showModal} contentStyle={styles.dialogContainerStyle}>
                <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="close" size={24} color="black"
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => {
                            updateState({ showModal: false })
                        }}
                    />
                    <View style={{
                        ...styles.transactionIconContainerStyle,
                        marginBottom: Sizes.fixPadding * 2.0,
                        backgroundColor: isSuccess ? Colors.greenColor : Colors.redColor,
                    }}>
                        {
                            isSuccess == true ?
                                <MaterialCommunityIcons name="check" size={24} color={Colors.whiteColor} /> :
                                <MaterialCommunityIcons name="close" size={24} color={Colors.whiteColor} />
                        }
                    </View>
                    <Text style={{ ...Fonts.black16SemiBold }}>${amount}</Text>
                    <Text style={{
                        ...Fonts.primaryColor16Medium,
                        marginVertical: Sizes.fixPadding - 5.0,
                    }}>{isSuccess ? 'SUCCESS' : 'FAIL'}</Text>
                    <Text style={{ ...Fonts.gray13Medium }}>
                        {dateAndTime}
                    </Text>

                    <View style={styles.dialogUniqueIdContainerStyle}>
                        <Text style={{ ...Fonts.gray15Medium }}>
                            ufx3fghty89jhd
                        </Text>
                    </View>

                    <Text style={{ ...Fonts.gray13Medium }}>
                        Tap to copy Reference ID
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    function depositeAndWithdrawnInfo() {
        return (
            <View style={{ ...styles.depositeAndWithdrawnInfoWrapStyle }}>
                <View style={styles.depositeAndWithdrawnInfoStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.gray13Medium }}>Total Deposit</Text>
                        <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                            $3,12,125
                        </Text>
                    </View>
                    <View style={{ height: 35.0, width: 0.60, backgroundColor: 'gray' }}></View>
                    <View>
                        <Text style={{ ...Fonts.gray13Medium }}>Total Deposit</Text>
                        <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                            $3,12,125
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    depositeAndWithdrawnInfoWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: 'white',
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    depositeAndWithdrawnInfoStyle: {
        backgroundColor: '#F3F5FF',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center'
    },
    depositeAndWithdrawnButtonContainerStyle: {
        backgroundColor: Colors.primaryColor, flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0.0,
        left: 0,
        right: 0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    transactionIconContainerStyle: {
        height: 45.0,
        width: 45.0,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    dialogUniqueIdContainerStyle: {
        backgroundColor: '#EEEEEE',
        paddingVertical: Sizes.fixPadding,
        width: '100%',
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0,
    }
})

export default TotalBalanceScreen;