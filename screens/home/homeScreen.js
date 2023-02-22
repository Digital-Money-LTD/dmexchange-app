import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, SafeAreaView, StatusBar, Image, StyleSheet, FlatList } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { AntDesign, Ionicons } from '@expo/vector-icons';
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



const HomeScreen = ({ navigation, changeIndex }) => {
    const { getRequest, logout } = AuthUser();
    const [userdetail, setUserdetails] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        fetchUserDetail();
        fetchUserTotalAvailableBalance();
    }, []);


    const fetchUserDetail = () =>{
         getRequest('get-user')
         .then((response)=>{
            setUserdetails(response.data);
            //console.log(response.data);
         });
    }

    const fetchUserTotalAvailableBalance = () =>{
        getRequest('total-available-price')
        //.then((data) => setBalance(data.formattedPrice))

        .then((response)=>{
            setBalance(response.data);
            console.log(response.formattedPrice);
         });
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
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor}  />
            <FlatList
                ListHeaderComponent={
                    <>
    
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 25,   }}>
                            <Ionicons name="notifications-outline" size={20} color="#007AFF" style={{ marginRight: 10 }} />
                            <Ionicons name="qr-code-sharp" size={20} color="#007AFF" />
                        </View>     

                        {balanceAndProfitInfo()}
                        {ButtonBarStart()}
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
                marginTop: Sizes.fixPadding - 2.0,
                marginBottom: Sizes.fixPadding,
                marginLeft: Sizes.fixPadding * 3.0,
            }}>
                <Text style={{ ...Fonts.black19Bold }}>Assets</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('BottomTabScreen', { index: 2 })}
                    style={styles.AddAsset}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>

            </View>
        )
    }

    
//Balance Card
    function balanceAndProfitInfo() {
         const toggleDropdown = () => {
            setShowDropdown(!showDropdown);
          };
          const [showDropdown, setShowDropdown] = useState(false);
          const walletNames = ['Wallet 1', 'Wallet 2', 'Wallet 3'];
          
        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginTop: 20.0,
            }}> 
            
            {/*User overall wallet balance*/}
                <View style={styles.balanceAndProfitInfoContainerStyle}>
               

                <View style={{ flexDirection: 'row', alignItems: 'center',paddingBottom:20 }}>
                    <Text style={{ marginRight: 10, color:"white",  }}>Main Wallet</Text>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <Ionicons name="ios-arrow-down" size={24} color="white" />
                    </TouchableOpacity>
                    {showDropdown && (
                        <View style={{ position: 'absolute', left: 0, right: 0, marginTop: 10 }}>
                        {walletNames.map((name) => (
                            <TouchableOpacity key={name} onPress={() => console.log(name)}>
                            <Text>{name}</Text>
                            </TouchableOpacity>
                        ))}
                        </View>
                    )}
                </View>


                    <Text style={{ ...Fonts.white16Medium }}>Your Balance</Text>
                    <Text style={{ ...Fonts.white30Bold, marginVertical: Sizes.fixPadding }}> { balance.formattedPrice }</Text>
                </View>

                {/*User profile picture*/}
                <View style={{ position: 'absolute', right: 40.0, bottom: 60.0, }}>
                    <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() =>
                                    changeIndex({ index: 4 })
                                    //navigation.push('BottomTabScreen', { index: 4 })
                                }
                            >
                                <Image source={require('../../assets/images/user/user_14.jpg')}
                                    style={{ height: 40.0, width: 40.0, borderRadius: 15.0 }}
                                />
                            </TouchableOpacity>
                </View>
            </View>
        )
    }
//this function defines the send , receive and buy buttons
    function ButtonBarStart() {

        const ButtonBar = () => {
            return (
              <View style={styles.Buttoncontainer}>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="arrow-up-circle" size={30} color="black" />
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="arrow-down-circle" size={30} color="black" />
                        <Text style={styles.buttonText}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="wallet" size={30} color="black" />
                        <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>
              </View>
            );
          };
          

        return (
            <View>
                <ButtonBar />
             </View>
        )
    }

    
}

const styles = StyleSheet.create({
    userWelcomeContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
    },
    AddAsset:{
        backgroundColor:'black',
        borderRadius:50,
        marginRight:5,
       
    },
   
    Buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      },
      button: {
        flex: 1,
        backgroundColor: '',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
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