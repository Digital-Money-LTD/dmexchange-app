import React from "react";
import { SafeAreaView, StatusBar, Image } from "react-native";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Ionicons, AntDesign } from '@expo/vector-icons';

const portfolioCurrencyList = [
    {
        id: '1',
        logo: require('../../assets/images/crypto_icon/btc.png'),
        name: 'Bitcoin',
        point: '2.685',
        sortName: 'BTC',
        isPositive: true,
        percentage: 5.26,
        amount: '1,45,250'
    },
    {
        id: '2',
        logo: require('../../assets/images/crypto_icon/eth.png'),
        name: 'Ethereum',
        point: '15.0256',
        sortName: 'ETH',
        isPositive: false,
        percentage: 2.56,
        amount: '2,50,245',
    },
];

const PortfolioScreen = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginTop: item.id == 1 ? Sizes.fixPadding * 2.0 : Sizes.fixPadding,
                paddingBottom: Sizes.fixPadding,
            }}
            onPress={() => navigation.navigate('Currency')}
        >
            <View style={styles.currencyInfoContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={item.logo}
                        style={{ height: 55.0, width: 55.0, borderRadius: 27.5 }}
                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.black16Medium }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                            <Text style={{ ...Fonts.blackMedium, marginRight: Sizes.fixPadding - 5.0 }}>
                                {item.point}
                            </Text>
                            <Text style={{ ...Fonts.blackMedium, marginRight: Sizes.fixPadding + 5.0 }}>
                                {item.sortName}
                            </Text>
                            <AntDesign
                                name={item.isPositive == true ? "caretup" : "caretdown"} size={12}
                                color={item.isPositive == true ? Colors.primaryColor : 'red'}
                                style={{ marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0 }}
                            />
                            <Text style={{ ...Fonts.blackMedium }}>
                                {item.percentage}%
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Fonts.black16SemiBold }}>
                        ${item.amount}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {portfolioInfo()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {totalBalanceInfo()}
                            {depositUSDTitle()}
                        </>
                    }
                    data={portfolioCurrencyList}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 18.0,
                        paddingTop: Sizes.fixPadding
                    }}
                />
            </View>
        </SafeAreaView>
    )

    function portfolioInfo() {
        return (
            <View style={{ elevation: 5.0, backgroundColor: 'gray' }}>
                <View style={{
                    backgroundColor: 'white',
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding - 5.0
                }}>
                    <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding + 5.0 }}>Portfolio</Text>
                </View>
                <View style={styles.recentValueOfCurrencyContainerStyle}>
                    <View>
                        <Text style={{ ...Fonts.gray13Medium }}>
                            Current value
                        </Text>
                        <Text style={{ ...Fonts.black17Medium, marginTop: Sizes.fixPadding - 8.0 }}>
                            $4,50,933
                        </Text>
                    </View>
                    <View style={{ height: 30.0, width: 0.50, backgroundColor: 'gray' }}>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.gray13Medium }}>
                            Invested value
                        </Text>
                        <Text style={{ ...Fonts.black17Medium, marginTop: Sizes.fixPadding - 8.0 }}>
                            $4,28,386
                        </Text>
                    </View>
                    <View style={{ height: 30.0, width: 0.50, backgroundColor: 'gray' }}>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.gray13Medium }}>Gain/Loss</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: Sizes.fixPadding - 8.0,
                            justifyContent: 'flex-end'
                        }}>
                            <AntDesign
                                name="caretup" size={12}
                                color={Colors.primaryColor}
                                style={{ marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0 }}
                            />
                            <Text style={{ ...Fonts.primaryColor16Medium }}>
                                5.2%
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function depositUSDTitle() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Deposit')}
                style={styles.depositeUSDContainerStyle}>
                <Text style={{ ...Fonts.primaryColor17Medium }}>DEPOSITE USD</Text>
            </TouchableOpacity>
        )
    }

    function totalBalanceInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Balance')}
                style={{
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingTop: Sizes.fixPadding,
                }}>
                <View style={styles.totalBalanceInfoContainerStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.walletIconContainerStyle}>
                            <Image
                                source={require('../../assets/images/icon/primary-color/wallet.png')}
                                resizeMode="contain"
                                style={{ height: 30.0, width: 30.0 }}
                            />
                        </View>
                        <View style={{ paddingLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.black13Regular }}>
                                Total USD Balanc
                            </Text>
                            <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 7.0 }}>
                                $152
                            </Text>
                        </View>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={Colors.primaryColor}
                        style={{ alignSelf: 'center' }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    depositeUSDContainerStyle: {
        backgroundColor: 'white',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: 'center',
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
    },
    totalBalanceInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DBE1FF',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
    },
    walletIconContainerStyle: {
        height: 55.0,
        width: 55.0, borderRadius: 27.5,
        backgroundColor: 'rgba(75,106,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    recentValueOfCurrencyContainerStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding * 2.0,
    },
    currencyInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    }
})

export default PortfolioScreen;