import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, SafeAreaView, StatusBar, Image, StyleSheet, FlatList } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { AntDesign } from '@expo/vector-icons';
import  AuthUser from "../../Api/AuthUser";

const popularCurrenciesList = [
    {
        id: '1',
        logo: require('../../assets/images/crypto_icon/btc.png'),
        name: 'Bitcoin',
        sortName: 'BTC',
        isPositive: true,
        percentage: 4.72,
        amount: '10,136.73'
    },
    {
        id: '2',
        logo: require('../../assets/images/crypto_icon/eth.png'),
        name: 'Ethereum',
        sortName: 'ETH',
        isPositive: true,
        percentage: 6.86,
        amount: '185.65',
    },
    {
        id: '3',
        logo: require('../../assets/images/crypto_icon/xrp.png'),
        name: 'XRP',
        sortName: 'XRP',
        isPositive: false,
        percentage: 8.95,
        amount: '0.262855',
    },
    {
        id: '4',
        logo: require('../../assets/images/crypto_icon/bch.png'),
        name: 'Bitcoin Cash',
        sortName: 'BCH',
        isPositive: true,
        percentage: 4.55,
        amount: '297.98',
    },
    {
        id: '5',
        logo: require('../../assets/images/crypto_icon/ltc.png'),
        name: 'Litecoin',
        sortName: 'LTC',
        isPositive: true,
        percentage: 7.12,
        amount: '71.24',
    }
];

const portfolioList = [
    {
        id: '1',
        image: require('../../assets/images/crypto_icon/btc.png'),
        name: 'BTC',
        amount: '1,45,250',
        isPositive: true,
        percentage: 20,
    },
    {
        id: '2',
        image: require('../../assets/images/crypto_icon/eth.png'),
        name: 'ETH',
        amount: '2,50,245',
        isPositive: false,
        percentage: 3,
    },
];

const HomeScreen = ({ navigation, changeIndex }) => {
    const { getRequest, logout } = AuthUser();
    const [userdetails, setUserdetails] = useState('');

    useEffect(()=>{
        fetchUserDetail();
    }, []);


    const fetchUserDetail = () =>{
         getRequest('get-user')
         .then((response)=>{
            setUserdetails(response.data);
            console.log(response.data);
         });
    }

       function renderElement() {
  const userdetail = { name: userdetails.name }; // replace this with your actual user details
  if (userdetail) {
    return <Text>{userdetail.name}</Text>;
  } else {
    return <Text>no data</Text>;
  }
}



    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}
            onPress={() => navigation.push('Currency')}
        >
            <View style={styles.popularCurrenciesContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={item.logo}
                        style={{ height: 55.0, width: 55.0, borderRadius: 27.5 }}
                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.black16Medium }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
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
    );

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}>
                        <View style={styles.userWelcomeContainerStyle}>
                            <View>
                                <Text style={{ ...Fonts.gray17Medium, }}>Welcome</Text>
                                <Text style={{ ...Fonts.black22Bold, marginTop: Sizes.fixPadding - 5.0, }}>
                                    { renderElement() }

                                    <TouchableOpacity onPress={() => logout }>
                <Text style={{ ...Fonts.blackRegular, alignSelf: 'center', marginTop: 20 }}>
         <Text style={{ color: Colors.orangeColor}}>logout</Text>
                </Text>
            </TouchableOpacity>
                                </Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() =>
                                    changeIndex({ index: 4 })
                                    //navigation.push('BottomTabScreen', { index: 4 })
                                }
                            >
                                <Image source={require('../../assets/images/user/user_14.jpg')}
                                    style={{ height: 60.0, width: 60.0, borderRadius: 15.0 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                        {balanceAndProfitInfo()}
                        {myPortfolioTitle()}
                        {portfolioInfo()}
                        {popularCurrenciesTitle()}

                    </>
                }
                data={popularCurrenciesList}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
            />
        </SafeAreaView>
    )

    function popularCurrenciesTitle() {
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding - 5.0,
                marginBottom: Sizes.fixPadding,
            }}>
                <Text style={{ ...Fonts.black19SemiBold }}>Popular Currencies</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('BottomTabScreen', { index: 2 })}
                >
                    <Text style={{ ...Fonts.primaryColor17Medium }}>See More</Text>
                </TouchableOpacity>

            </View>
        )
    }

    function myPortfolioTitle() {
        return (
            <Text style={{
                ...Fonts.black19SemiBold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 5.0,

            }}>
                My Portfolio
            </Text>
        )
    }

    function balanceAndProfitInfo() {
        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginTop: 20.0,
            }}>
                <View style={styles.balanceAndProfitInfoContainerStyle}>
                    <Text style={{ ...Fonts.white16Medium }}>Balance</Text>
                    <Text style={{ ...Fonts.white30Bold, marginVertical: Sizes.fixPadding }}>$4,50,933</Text>
                    <Text style={{ ...Fonts.white16Medium, marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding + 5.0 }}>
                        Monthly Profit
                    </Text>
                    <Text style={{ ...Fonts.white25Bold }}>$12,484</Text>
                </View>
                <View style={{ position: 'absolute', right: 40.0, bottom: 20.0, }}>
                    <View style={styles.balanceAndProfitPercentageInfoStyle}>
                        <AntDesign name="caretup" size={12} color={Colors.whiteColor} />
                        <Text style={{ ...Fonts.whiteSemiBold, marginLeft: 7.0 }}>+10%</Text>
                    </View>
                </View>
            </View>
        )
    }

    function portfolioInfo() {

        const renderItem = ({ item }) => (

            <View style={styles.portfolioContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={item.image}
                        style={{ height: 60.0, width: 60.0, borderRadius: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.black17Medium }}>{item.name}</Text>
                </View>
                <View>
                    <Text style={{ ...Fonts.gray17Medium, marginBottom: Sizes.fixPadding - 3.0 }}>Portfolio</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.black22Bold }}>
                            {`$${item.amount}`}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {item.isPositive == true ?
                                <AntDesign name="caretup" size={12} color={Colors.primaryColor} style={{ marginTop: 5.0 }} />
                                :
                                <AntDesign name="caretdown" size={12} color="red" style={{ marginTop: 2.5 }} />
                            }
                            {
                                item.isPositive == true ?
                                    <Text style={{ ...Fonts.primaryColor17Medium, marginLeft: Sizes.fixPadding - 3.0 }}>
                                        {`+${item.percentage}%`}
                                    </Text> :
                                    <Text style={{ ...Fonts.red17Medium, marginLeft: Sizes.fixPadding - 3.0 }}>
                                        {`-${item.percentage}%`}
                                    </Text>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )

        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={portfolioList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
            />
        )
    }

    
}

const styles = StyleSheet.create({
    userWelcomeContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
    },
    popularCurrenciesContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white', elevation: 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    balanceAndProfitInfoContainerStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    balanceAndProfitPercentageInfoStyle: {
        flexDirection: 'row',
        backgroundColor: "rgba(255,255,255,0.22)",
        alignItems: 'center',
        paddingHorizontal: 12.0,
        paddingVertical: 12.0,
        borderRadius: 22.0
    },
    portfolioContainerStyle: {
        height: 170.0,
        width: 230.0,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 10.0,
        marginVertical: 15.0,
        paddingHorizontal: 10.0,
        paddingVertical: 10.0,
        borderRadius: 20,
        elevation: 3.0,
    }
})

export default HomeScreen;