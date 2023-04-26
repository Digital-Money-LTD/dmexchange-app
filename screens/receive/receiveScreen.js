import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ModalDropdown from 'react-native-modal-dropdown';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';


const walletOptions = ['Wallet A', 'Wallet B', 'Wallet C'];

const ReceiveScreen = ({navigation}) => {

  const [selectedWallet, setSelectedWallet] = useState(walletOptions[0]);
  const [walletAddress, setWalletAddress] = useState('0x5BB29BFc0151b7681B72052453Da018E79CeB5DF');
  
  const handleWalletChange = (index, value) => {
    setSelectedWallet(value);
  }

  const handleCopyAddress = () => {
    Clipboard.setString(walletAddress);
    alert('Wallet address copied to clipboard');
  }

  const handleGenerateNewAddress = () => {
    // TODO: Implement generate new address logic
  }

  return (

    <View style={styles.container}>

<TouchableOpacity 
 onPress={() => navigation.push('BottomTabScreen', { index: 2 })}
style={styles.backButton}>
        <Icon name='arrow-left' size={20} color='#007AFF' />
      </TouchableOpacity>
      <View style={styles.qrContainer}>
        <QRCode
          value={walletAddress}
          size={200}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Wallet:</Text>
        <ModalDropdown
          options={walletOptions}
          defaultValue={selectedWallet}
          onSelect={handleWalletChange}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
        />
        <Text style={styles.label}>Wallet Address:</Text>
        <TouchableOpacity onPress={handleCopyAddress}>
          <Text style={styles.address}>{walletAddress}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGenerateNewAddress} style={styles.button}>
          <Text style={styles.buttonText}>Generate New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
  },
  address: {
    fontSize: 16,
    
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginBottom: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#c58e0f',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});

export default ReceiveScreen;
