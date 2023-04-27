import React, { useCallback, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import HomeScreen from "../screens/home/homeScreen";
import ExchangeScreen from "../screens/exchange/exchangeScreen";
import PortfolioScreen from "../screens/portfolio/portfolioScreen";
import UserScreen from "../screens/user/userScreen";
import { Sizes, Colors, Fonts } from "../constants/styles";
import { useFocusEffect } from '@react-navigation/native';
import { Profiler } from "react";

const BottomTabBarScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        backClickCount: 0,
        currentIndex: 1,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount, currentIndex } = state;

    const changeIndex = ({ index }) => {
        updateState({ currentIndex: index })
    }

    return (
        <View style={{ flex: 1 }}>
            {currentIndex == 1 ?
                <HomeScreen navigation={navigation} changeIndex={changeIndex} /> :
                currentIndex == 2 ?
                    <ExchangeScreen navigation={navigation} /> :
                    currentIndex == 3 ?
                        <PortfolioScreen navigation={navigation} /> :
                        <UserScreen navigation={navigation} />
            }
            <View style={styles.bottomTabBarStyle}>
                {bottomTabBarItem({
                    index: 1,
                    icon: require('../assets/images/icon/grey/home.png'),
                    title: 'Home',
                 
                })}
                {bottomTabBarItem({
                    index: 2,
                    icon: require('../assets/images/icon/bottom-bar/exchange.png'),
                    title: 'Trade',
                })}
                
                {bottomTabBarItem({
                    index: 3,
                    icon: require('../assets/images/icon/grey/portfolio.png'),
                    title: 'Stake',
                })}
                {bottomTabBarItem({
                    index: 4,
                    icon: require('../assets/images/icon/grey/user.png'),
                    title: 'Profile',
                })}
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.white13Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View>
    )

    function bottomTabBarItem({ index, icon, title }) {
        return (
            <TouchableOpacity
            activeOpacity={0.99}
            onPress={() => changeIndex({ index: index })}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={icon}
                resizeMode="contain"
                style={{ height: 25.0, width: 25.0, tintColor: currentIndex == index ? Colors.primaryColor : null }}
              />
              <Text style={{ ...Fonts.black13Medium, marginTop: 5 }}>{title}</Text>
            </View>
          </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 50,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})



