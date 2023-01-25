import React from "react";
import { Text, View, SafeAreaView, StatusBar, ScrollView, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';

const PrivacyPolicyScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {privacyPolicyInfo()}
                    {termsOfUseInfo()}
                </ScrollView>
            </View>
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
                    Privacy Policy
                </Text>
            </View>
        )
    }

    function termsOfUseInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.black17SemiBold }}>Terms of Use</Text>
                {dummyText()}
            </View>
        )
    }

    function dummyText() {
        return (
            <Text style={{ ...Fonts.black15Medium, marginTop: Sizes.fixPadding }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </Text>
        )
    }

    function privacyPolicyInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.black17SemiBold }}>Privacy Policy</Text>
                {dummyText()}
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
})

export default PrivacyPolicyScreen;