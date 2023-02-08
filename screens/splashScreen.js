import React from "react";
import { Text, View, SafeAreaView, StatusBar, Image } from "react-native";



const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('SignIn');
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'#0a58ff'}}>
        <StatusBar translucent={true}  />
        <View style={{ flex: 1, backgroundColor:'#0a58ff'  }}>
          <Image
            source={require('../assets/splash.png')}
            style={{ width: '100%', height: '100%'}}
          />
        </View>
      </SafeAreaView>
    )
}

export default SplashScreen;