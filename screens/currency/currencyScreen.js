import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { LineChart } from "react-native-chart-kit";
import { BottomSheet } from "@rneui/themed";
import { Snackbar } from 'react-native-paper';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import SvgUri from 'react-native-svg';
import  AuthUser from "../../Api/AuthUser";

const svgUrl = 'https://staging.dmexchange.com/coin/dm.svg';

const { width } = Dimensions.get('screen');

const CurrencyScreen = ({ navigation }) => {
    const { getRequest, logout } = AuthUser();
    const route = useRoute();
    const { walletdata } = route.params;
    const [walletTransactions, setWallets] = useState([]);

    useEffect(()=>{
            getRequest('wallet-transactions/' + walletdata.id)
            .then((response)=>{
               setWallets(response.data);
               //console.log(response.data);
            });
       
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}
        >
            <View style={styles.popularCurrenciesContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                    <SvgUri uri={svgUrl} width="65" height="20" />
                    

                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.black16Medium }}>{item.coin.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                            <Text style={{ ...Fonts.blackMedium, marginRight: Sizes.fixPadding + 5.0 }}>
                                {item.dollar_price}
                            </Text>
                            
                            <Text style={{ ...Fonts.blackMedium }}>
                                - {item.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );



    const [state, setState] = useState({
        showBottomSheet: false,
        value: '',
        amount: '',
        iswatchList: false,
        showSnackBar: false,
        isBuy: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showBottomSheet,
        value,
        amount,
        iswatchList,
        showSnackBar,
        isBuy,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {currencyNameAndAddRemoveInfo()}
                {currencyInfo({ buyOrSell: 'Buy' })}

                {portfolioTitle()}
                {portfolioInfo()}

                <SafeAreaView style={{ flex: 1, }}>
                    <StatusBar translucent={false} backgroundColor={Colors.primaryColor}  />
                    <FlatList
                        data={walletTransactions}
                        renderItem={renderItem}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
                    />
                    
                </SafeAreaView>


                {aboutCurrenyTitle()}
                {aboutCurrencyDetail({
                    icon: require('../../assets/images/icon/rank.png'),
                    title: 'Market Rank',
                    value: '#1',
                })}
                {aboutCurrencyDetail({
                    icon: require('../../assets/images/icon/market-cap.png'),
                    title: 'Market Cap',
                    value: '$75535.74 Cr.',
                })}
                {aboutCurrencyDetail({
                    icon: require('../../assets/images/icon/supply.png'),
                    title: 'Circulating Supply',
                    value: `2 Cr. BTC`
                })}
                {whatIsCurrencyInfo()}
                {buyAndSellPriceDifferentInfo()}

            </ScrollView>
            {buyAndSellButton()}
            {sheet()}
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                {iswatchList == false ?
                    <Text style={{ ...Fonts.whiteRegular }}>Remove from watchlist</Text> :
                    <Text style={{ ...Fonts.whiteRegular }}> Added to watchlist</Text>
                }
            </Snackbar>
        </SafeAreaView>
    )

    function currencyNameAndAddRemoveInfo() {
        return (
            <View style={styles.headerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.black17Bold }}>
                        {walletdata.coin}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.addRemoveCurrencyContainerStyle}
                    onPress={() => {
                        updateState({ iswatchList: !iswatchList })
                        updateState({ showSnackBar: true })
                    }}
                >
                    {iswatchList == true ?
                        <Ionicons name="star" size={20} color={Colors.primaryColor} /> :
                        <Ionicons name="star-outline" size={20} color={Colors.primaryColor} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

    function currencyInfo({ buyOrSell }) {
        return (
            <View style={styles.currencyInfoContainerStyle}>
                <View style={styles.currencyLogoContainerStyle}>
                    <Image source={require('../../assets/images/crypto_icon/btc.png')}
                        style={{ height: 40.0, width: 40.0 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.black15Medium }}>Current {walletdata.wallet.coin.symbol} {buyOrSell} Price</Text>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                        <Text style={{ ...Fonts.black16Bold, marginRight: Sizes.fixPadding + 10.0 }}>
                        {walletdata.formatted_available_price}
                        </Text>
                        <AntDesign
                            name="caretup" size={12}
                            color={Colors.primaryColor}
                            style={{ marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0 }}
                        />
                        <Text style={{ ...Fonts.primaryColor16Medium }}>4.65%</Text>
                    </View>
                </View>
            </View>
        )
    }

    function aboutCurrenyTitle() {
        return (
            <View style={styles.aboutCurrencyTitleContainerStyle}>
                <Text style={{ ...Fonts.black17SemiBold }}>
                    About BTC
                </Text>
            </View>
        )
    }

    function whatIsCurrencyInfo() {
        return (
            <View style={styles.whatIsCurrencyTitleContainerStyle}>
                <Text style={{ ...Fonts.black16SemiBold }}>
                    What is BTC?
                </Text>
                <Text style={{ ...Fonts.blackMedium, paddingTop: Sizes.fixPadding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus, augue quis vehicula fermentum, libero purus congue mauris, a luctus ipsum orci in mauris. Phasellus consectetur sed libero at gravida. In hac habitasse platea dictumst.
                </Text>
            </View>
        )
    }

    function buyAndSellButton() {
        return (
            <View>
                <View style={styles.buyAndSellButtomContainerStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showBottomSheet: true })
                            updateState({ isBuy: true })
                        }}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            BUY
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 30.0, width: 2.0, backgroundColor: "rgba(255,255,255,0.22)" }}>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showBottomSheet: true })
                            updateState({ isBuy: false })
                        }}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            SELL
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function amountTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <OutlinedTextField
                    label='Amount'
                    keyboardType='phone-pad'
                    suffix='BTC'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black16Medium, }}
                    baseColor="gray"
                    value={amount}
                    onChangeText={(value) => updateState({ amount: value })}
                />
            </View>
        )
    }

    function valueTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <OutlinedTextField
                    label='Value'
                    keyboardType='phone-pad'
                    suffix='USD'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black16Medium, }}
                    baseColor="gray"
                    value={value}
                    onChangeText={(text) => updateState({ value: text })}
                />
            </View>
        )
    }

    function sheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { updateState({ showBottomSheet: false }) }}
                    style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: Sizes.fixPadding,
                        borderTopRightRadius: Sizes.fixPadding,
                    }}
                >
                    <View style={{
                        paddingVertical: Sizes.fixPadding, backgroundColor: 'white',
                        borderTopLeftRadius: Sizes.fixPadding,
                        borderTopRightRadius: Sizes.fixPadding,
                    }}>
                        <Text style={{
                            alignSelf: 'center', ...Fonts.black16SemiBold,
                            paddingVertical: Sizes.fixPadding + 5.0,
                            paddingHorizontal: Sizes.fixPadding * 2.0,
                        }}>
                            {isBuy ? `Buy` : 'Sell'} Bitcoin (BTC)
                        </Text>
                        <View style={{
                            backgroundColor: 'gray', height: 0.5,
                            marginBottom: Sizes.fixPadding + 10.0,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                        }}>

                        </View>
                        {currencyInfo({ buyOrSell: isBuy ? `Buy` : 'Sell' })}
                        {valueTextField()}
                        {amountTextField()}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.buyOrSellButtonStyle}
                            onPress={() => navigation.navigate('Success')}
                        >
                            <Text style={{ ...Fonts.white16Medium }}> {isBuy ? `BUY` : 'SELL'} </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function chartInfo() {
        const chartConfig = {
            backgroundGradientFrom: 'white',
            backgroundGradientTo: "white",
            fillShadowGradient: '#3EA3F5',
            fillShadowGradientOpacity: 4,
            color: (opacity = 1) => `gray`,
            strokeWidth: 1,
            barRadius: 2,
            decimalPlaces: 2,
        };

        const data = {
            labels: [9, 11, 13, 15, 17],
            datasets: [
                {
                    data: [20, 45, 28, 80, 99, 43],
                    color: (opacity = 0.5) => `rgba(32, 147, 240, ${opacity})`, // optional
                }
            ],
        };

        return (
            <View style={{ backgroundColor: Colors.whiteColor, marginBottom: Sizes.fixPadding, height: 250.0, }}>
                <LineChart
                    data={data}
                    width={width}
                    height={250}
                    chartConfig={chartConfig}
                    withDots={false}
                    fromZero={true}
                    style={{
                        alignSelf: 'center',
                        paddingTop: Sizes.fixPadding,
                    }}
                    bezier
                />
            </View>
        )
    }

    function buyAndSellPriceDifferentInfo() {
        return (
            <View style={{
                backgroundColor: 'white', paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingTop: Sizes.fixPadding,
                paddingBottom: Sizes.fixPadding * 6.0
            }}>
                <Text style={{ ...Fonts.black16SemiBold }}>
                    Why is the Buy Price and Sell Price different in BTC?
                </Text>
                <Text style={{ ...Fonts.blackMedium, paddingTop: Sizes.fixPadding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus, augue quis vehicula fermentum, libero purus congue mauris, a luctus ipsum orci in mauris. Phasellus consectetur sed libero at gravida. In hac habitasse platea dictumst.Integer turpis eros, venenatis eget sapien tincidunt, porttitor efficitur tortor.Integer id consectetur nisl.
                </Text>
            </View>
        )
    }

    function aboutCurrencyDetail({ icon, title, value }) {
        return (
            <View style={{ backgroundColor: 'white', paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    paddingVertical: Sizes.fixPadding * 2.0
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icon}
                            style={{ height: 20.0, width: 20.0 }}
                            resizeMode="contain"
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.black15Medium }}>{title}</Text>
                    </View>
                    <Text style={{ ...Fonts.black16SemiBold }}>{value}</Text>
                </View>
                <View style={{ height: 0.40, backgroundColor: 'gray', marginBottom: Sizes.fixPadding }}></View>
            </View>
        )
    }

    function portfolioInfo() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Sizes.fixPadding }}>
                    <View style={styles.portfolioInfoContainerStyle}>
                        <Text style={{ ...Fonts.gray16Medium }}>
                            {walletdata.wallet.coin.symbol} Balance
                        </Text>
                        <Text style={{ ...Fonts.black17Bold }}>
                        {walletdata.available}
                        </Text>
                    </View>
                    <View style={styles.portfolioInfoContainerStyle}>
                        <Text style={{ ...Fonts.gray16Medium }}>
                            Current Value
                        </Text>
                        <Text style={{ ...Fonts.black17Bold }}>
                        {walletdata.formatted_available_price}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.portfolioInfoContainerStyle}>
                        <Text style={{ ...Fonts.gray16Medium }} numberOfLines={2}>
                            Average Buy Price
                        </Text>
                        <Text style={{ ...Fonts.black17Bold }}>
                            $37,598
                        </Text>
                    </View>
                    <View style={styles.portfolioInfoContainerStyle}>
                        <Text style={{ ...Fonts.gray16Medium }}>
                            Gain/Loss
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign
                                name="caretup"
                                size={12}
                                color={Colors.primaryColor}
                                style={{ marginTop: 5.0 }}
                            />
                            <Text style={{ ...Fonts.primaryColor17SemiBold, marginLeft: Sizes.fixPadding - 3.0 }}>
                                5.65%
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function portfolioTitle() {
        return (
            <Text style={{
                ...Fonts.black17SemiBold,
                marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding
            }}>
                Your Portfolio
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        backgroundColor: 'white'
    },
    addRemoveCurrencyContainerStyle: {
        backgroundColor: 'white',
        borderColor: Colors.primaryColor,
        height: 40.0,
        width: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    },
    portfolioInfoContainerStyle: {
        height: 90.0,
        width: width / 2.35,
        backgroundColor: 'white', elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding + 5.0
    },
    buyOrSellButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 10.0,
        marginBottom: Sizes.fixPadding
    },
    currencyLogoContainerStyle: {
        height: 60.0, width: 60.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        borderColor: '#D8D8D8',
        borderWidth: 1.0,
        justifyContent: 'center'
    },
    currencyInfoContainerStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    aboutCurrencyTitleContainerStyle: {
        backgroundColor: 'white',
        marginTop: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    whatIsCurrencyTitleContainerStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    buyAndSellButtomContainerStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0.0,
        left: 0,
        right: 0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 42.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0
    }
})

export default CurrencyScreen;