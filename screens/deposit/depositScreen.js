import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StatusBar, TouchableOpacity, StyleSheet, ScrollView  } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { OutlinedTextField } from 'rn-material-ui-textfield';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import  AuthUser from "../../Api/AuthUser";

const DepositScreen = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const { getRequest, logout } = AuthUser();
    const [activeWallets, setActiveWallets] = useState([]);
    const [latestAddress, setLatestAddress] = useState('');
    const [address, setSelectedAddress] = useState('');

    const handleSelectValue = (value) => {
        setSelectedAddress(value);
        
      };

    useEffect(()=>{
            getRequest('get-wallets')
            .then((response)=>{
                setActiveWallets(response.data);
            });

            getRequest('latest-address/14')
            getRequest('latest-address/' + address)
            .then((response)=>{
               setLatestAddress(response.data);
               //console.log(response.data);
            });
       
    }, []); 

    const [state, setState] = useState({
        amount: '10',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { amount } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {header()}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
                {currentBalanceInfo()}
                <View>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={handleSelectValue}
                >
                    {activeWallets.map(item => (
                        <Picker.Item 
                            key={item.id} 
                            label={item.coin} 
                            value={item.id} 
                        />
                    ))}
                </Picker>
                </View>
                {amountTextField()}
                {amountSelection()}
                {minMaxLimitInfo()}
                {depositeButton()}
                {processingTimeInfo()}
            </ScrollView>
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
                    Deposit
                </Text>
            </View>
        )
    }

    function amountTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <OutlinedTextField
                    label='Amount'
                    keyboardType='phone-pad'
                    suffix='$'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black16Medium, }}
                    baseColor="gray"
                    value={amount}
                    onChangeText={(value) => updateState({ amount: value })}
                />
            </View>
        )
    }

    function amountSelection() {
        return (
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding * 4.0,
                    paddingTop: Sizes.fixPadding + 5.0,
                    paddingBottom: Sizes.fixPadding,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    {currencySelection({ value: 10 })}
                    {currencySelection({ value: 50 })}
                    {currencySelection({ value: 100 })}
                    {currencySelection({ value: 500 })}
                </View>
            </View>
        )
    }

    function currencySelection({ value }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ amount: value.toString() })
                }}
                style={styles.currencySelectionContainerStyle}
            >
                <Text style={{ ...Fonts.black15Medium }}>${value}</Text>
            </TouchableOpacity>
        )
    }

    function depositeButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
                style={styles.depositButtonStyle}>
                <Text style={{ ...Fonts.white16Medium }}>DEPOSIT</Text>
            </TouchableOpacity>
        )
    }

    function processingTimeInfo() {
        return (
            <Text style={{ ...Fonts.black16Medium, alignSelf: 'center' }}>
                {latestAddress.address}
            </Text>
        )
    }

    function minMaxLimitInfo() {
        return (
            <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', }}>
                Min $10, Max $3,000
            </Text>
        )
    }

    function currentBalanceInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.black19Bold }}>$152</Text>
                <Text style={{
                    ...Fonts.black13Medium,
                    marginBottom: Sizes.fixPadding * 3.0,
                    marginTop: Sizes.fixPadding - 5.0
                }}>
                    Current Balance {address}
                </Text>
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
    currencySelectionContainerStyle: {
        backgroundColor: "#E5E5E5",
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: 12.0,
        paddingVertical: Sizes.fixPadding + 1.0,
    },
    depositButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0,
    }
})

export default DepositScreen;