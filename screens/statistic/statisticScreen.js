import React from "react";
import { Text, View, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { Colors, Sizes } from "../../constants/styles";
import TabBarScreen from "../../component/tabBarScreen";
import { Ionicons } from '@expo/vector-icons';

const StatisticScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={styles.todayAndSearchInfoWrapStyle}>
                <Text style={{ fontSize: 16.0, color: '#006400', fontFamily: 'Montserrat_Bold' }}>
                    Market is up 3.68% today
                </Text>
                <Ionicons name="search-sharp" size={24} color={Colors.primaryColor} />
            </View>
            <TabBarScreen navigation={navigation} />
        </SafeAreaView>
    )
}

export default StatisticScreen;

const styles = StyleSheet.create({
    todayAndSearchInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})