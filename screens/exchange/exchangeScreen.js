import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ExchangeScreen = () => {
  const [selectedPayCurrency, setSelectedPayCurrency] = useState(null);
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);

  const handlePayAmountChange = (text) => {
    setPayAmount(text);
    // Calculate estimated value based on hardcoded exchange rate of 1:2
    setEstimatedValue(parseFloat(text) * 2);
  };

  const handleReceiveAmountChange = (text) => {
    setReceiveAmount(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardColumn}>
          <View style={styles.cardColumnLeft}>
            <Text style={styles.cardHeaderText}>Pay</Text>
          </View>
          <View style={styles.cardColumnRight}>
            <TouchableOpacity style={styles.minMaxButton}>
              <Text style={styles.minMaxButtonText}>Min/Max</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardColumn}>
          <View style={styles.cardColumnLeft}>
            <DropDownPicker
              items={[
                { label: 'USD', value: 'USD', icon: () => <Text>$</Text> },
                { label: 'EUR', value: 'EUR', icon: () => <Text>€</Text> },
                { label: 'GBP', value: 'GBP', icon: () => <Text>£</Text> },
              ]}
              defaultValue={selectedPayCurrency}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              itemStyle={styles.dropdownItem}
              labelStyle={styles.dropdownText}
              placeholder="Select currency"
              onChangeItem={(item) => setSelectedPayCurrency(item.value)}
            />
          </View>
          <View style={styles.cardColumnRight}>
          <TextInput
              style={styles.clickfield}
              value={receiveAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              onChangeText={handleReceiveAmountChange}
              />
          </View>
        </View>
        <View style={styles.card}>
            <View style={styles.cardColumn}>
              <View style={styles.cardColumnLeft}>
                <Text style={styles.cardHeaderText}>Total Balance</Text>
              </View>
              <View style={styles.cardColumnRight}>
                <Text style={styles.totalBalanceText}>$10,000.00</Text>
              </View>
            </View>
      </View>
    </View>
      
      <View style={styles.card}>
        <View style={styles.cardColumn}>
          <View style={styles.cardColumnLeft}>
            <Text style={styles.cardHeaderText}>Receive</Text>
          </View>
          <View style={styles.cardColumnRight}></View>
        </View>
        <View style={styles.cardColumn}>
          <View style={styles.cardColumnLeft}>
            <DropDownPicker
              items={[
                { label: 'BTC', value: 'BTC' },
                { label: 'ETH', value: 'ETH' },
                { label: 'LTC', value: 'LTC' },
              ]}
              defaultValue={selectedReceiveCurrency}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              itemStyle={styles.dropdownItem}
              labelStyle={styles.dropdownText}
              placeholder="Select currency"
              onChangeItem={(item) => setSelectedReceiveCurrency(item.value)}
            />
          </View>
          <View style={styles.cardColumnRight}>
           {/* <TextInput
              style={styles.clickfield}
              value={receiveAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              onChangeText={handleReceiveAmountChange}
              />*/}
          </View>
</View>
<View style={styles.cardColumn}>
    <View style={styles.cardColumnLeft}>
    <Text style={styles.cardEstimatedText}>Estimated Value</Text>
    </View>
<View style={styles.cardColumnRight}>
<Text style={styles.estimatedValueText}>
{estimatedValue} {selectedReceiveCurrency}
</Text>
</View>
</View>
</View>

</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 16,
backgroundColor: '#fff',
paddingTop: 100,
},
card: {
backgroundColor: '#F8F8F8',
borderRadius: 10,
padding: 16,
marginVertical: 8,
},
cardColumn: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginBottom: 16,
},
cardColumnLeft: {
flex: 1,
},
cardHeaderText: {
fontSize: 16,
fontWeight: 'bold',
color: '#000',
},
cardEstimatedText:{
  fontSize: 15,
  fontWeight: 'bold',
  color: '#000',
},
cardColumnRight: {
flex: 1,
alignItems: 'flex-end',
},
minMaxButton: {
backgroundColor: '#EFF0F6',
paddingVertical: 8,
paddingHorizontal: 12,
borderRadius: 5,
},
minMaxButtonText: {
fontSize: 12,
fontWeight: 'bold',
color: '#4B4E5A',
},
dropdownContainer: {
height: 40,
width: '100%',
},
dropdown: {
backgroundColor: '#F8F8F8',
borderWidth: 0,
},
dropdownItem: {
justifyContent: 'flex-start',
},
dropdownText: {
fontSize: 16,
fontWeight: 'bold',
color: '#000',
},
clickableField: {
backgroundColor: '#fff',
height: 40,
width: '100%',
borderRadius: 5,
borderWidth: 1,
borderColor: '#D3D3D3',
paddingHorizontal: 12,
fontSize: 16,
fontWeight: 'bold',
color: '#000',
},
estimatedValueText: {
fontSize: 16,
fontWeight: 'bold',
color: '#000',
},
totalBalanceText: {
fontSize: 16,
fontWeight: 'bold',
color: '#000',
},
});

export default ExchangeScreen;
