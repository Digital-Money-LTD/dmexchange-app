import React from "react";
import { Text, View, SafeAreaView, StatusBar, Image } from "react-native";


const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('SignIn');
    }, 3000);

    return (
        <SafeAreaView style={{ flex: 1,}}>
        <StatusBar translucent={false}  />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/splash.gif')}
            style={{ width: '100%', height: '100%'}}
          />
        </View>
      </SafeAreaView>
    )
}

export default SplashScreen;