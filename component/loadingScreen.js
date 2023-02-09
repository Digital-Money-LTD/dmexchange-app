import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                PublicSans_Bold: require("../assets/fonts/PublicSans-Bold.ttf"),
                PublicSans_Black: require("../assets/fonts/PublicSans-Black.ttf"),
                PublicSans_Medium: require("../assets/fonts/PublicSans-Medium.ttf"),
                PublicSans_Regular: require("../assets/fonts/PublicSans-Regular.ttf"),
                PublicSans_SemiBold: require("../assets/fonts/PublicSans-SemiBold.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;







