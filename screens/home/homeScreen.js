import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, SafeAreaView, StatusBar, Image, StyleSheet, FlatList, Table, Row, Rows  } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import SvgUri from 'react-native-svg';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import  AuthUser from "../../Api/AuthUser";
const logo = 'https://staging.dmexchange.com/coin/dm.svg';

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

const quickBuy = () => {
    return (
      <View style={styles.containerQuickBuy}>
        <TouchableOpacity style={styles.buttonQuickBuy}>
          <Image source={require('../../assets/images/crypto_icon/btc.png')} style={styles.iconQuickBuy} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuickBuy}>
          <Image source={require('../../assets/images/crypto_icon/eth.png')} style={styles.iconQuickBuy} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuickBuy}>
          <Image source={require('../../assets/images/crypto_icon/bch.png')} style={styles.iconQuickBuy} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuickBuy}>
          <Image source={require('../../assets/images/crypto_icon/ltc.png')} style={styles.iconQuickBuy} />
        </TouchableOpacity>
      </View>
    );
  };
  

const HomeScreen = ({ navigation, changeIndex }) => {
    const navigater = useNavigation();
    const { getRequest, logout } = AuthUser();
    const [userdetail, setUserdetails] = useState('');
    const [balance, setBalance] = useState(0);
    const [wallets, setWallets] = useState([]);

    useEffect(()=>{
        //fetchUserDetail();
        //fetchUserTotalAvailableBalance();
        //const intervalId = setInterval(() => {
            fetchUserDetail();
            fetchUserWallets();
            fetchUserTotalAvailableBalance();
            //}, 1000);
          //return () => clearInterval(intervalId);
    }, []);


    const fetchUserDetail = () =>{
         getRequest('user-profile')
         .then((response)=>{
            setUserdetails(response.data);
         });
    }

    const fetchUserWallets = () =>{
        getRequest('get-wallets')
        .then((response)=>{
           setWallets(response.data);
           //console.log(response.data);
        });
   }

    const fetchUserTotalAvailableBalance = () =>{
        getRequest('total-available-price')
        .then((response)=>{
            setBalance(response.data);
         });
   }


    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}
            //onPress={() => navigation.push('Currency')}
            onPress={() => navigater.navigate('Currency', { walletdata: item })}
        >
            <View style={styles.popularCurrenciesContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                    <SvgUri uri={logo} width="65" height="20" />
                    

                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.black16Medium }}>{item.coin}</Text>
                        <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                            <Text style={{ ...Fonts.blackMedium, marginRight: Sizes.fixPadding + 5.0 }}>
                                {item.available}
                            </Text>
                            
                            <Text style={{ ...Fonts.blackMedium }}>
                                | {item.formatted_available_price}
                            </Text>
                        </View>
                    </View>
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
    
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 25,  marginTop: 10 }}>
                            <Ionicons name="notifications-outline" size={20} color="#007AFF" style={{ marginRight: 10 }} />
                            <Ionicons name="qr-code-sharp" size={20} color="#007AFF" />
                        </View>     

                        {balanceAndProfitInfo()}
                        {ButtonBarStart()}
                        {quickBuyTitle()}
                        {quickBuy()}
                        {popularCurrenciesTitle()}



                    </>
                }
                data={wallets}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
            />
            
        </SafeAreaView>
    )
    //quickbuy title
    function quickBuyTitle() {
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding - 2.0,
                marginBottom: Sizes.fixPadding - 30.0,
                marginLeft: Sizes.fixPadding * 3.0,
            }}>
                <Text style={{ ...Fonts.black19SemiBold, fontSize:16}}>Quick Buy</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('BottomTabScreen', { index: 2 })}
                    style={styles.AddAsset}
                >
                   
                </TouchableOpacity>

            </View>
        )
    }

    function userphoto() {
        if (!userdetail || !userdetail.profile || !userdetail.profile.picture) {
        return <View style={{ height: 40.0, width: 40.0, borderRadius: 15.0, backgroundColor: '#d3d3d3', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>{userdetail && userdetail.name ? userdetail.name.charAt(0).toUpperCase() : ''}</Text>
                </View>;
        } else {
        return <Image
            source={{ uri: userdetail.profile.picture }}
            style={{ height: 40.0, width: 40.0, borderRadius: 15.0  }}
        />;
        }
    }

    //popular currencies title 
    function popularCurrenciesTitle() {
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding - 20.0,
                marginBottom: Sizes.fixPadding,
                marginLeft: Sizes.fixPadding * 3.0,
            }}>
                <Text style={{ ...Fonts.black19SemiBold, fontSize:16 }}>Wallets</Text>
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
                <View style={{ position: 'absolute', top: 10.0, right: 30.0 }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => changeIndex({ index: 4 })}
                    >
                     {userphoto()}
                        
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
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.push('Receive')}
                   > 
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
        mar0ginRight:5,
       
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
    },
    containerQuickBuy: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        borderRadius: 8,
        padding: 20,
        margin: 20,
      },
      buttonQuickBuy: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      iconQuickBuy: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
})

export default HomeScreen;