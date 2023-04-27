import React, { createRef, useState } from "react";
import { Feather } from '@expo/vector-icons';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";


const { width } = Dimensions.get('screen');

const EnterEmailCodeScreen = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false
    });
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // simulate request
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("ResetPassword");
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primaryColor}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
      <Feather
                    name="arrow-left"
                    size={25}
                    color="black"
                    style={{ position: 'absolute', left: 15.0, top: 20.0, zIndex: 1, }}
                    onPress={() => navigation.pop()}
                />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizes.fixPadding,
            flexGrow: 1,
            justifyContent: "center"
          }}
        >
          <Image
            source={require("../../assets/images/auth-icon.png")}
            style={{
              alignSelf: "center",
              width: 150.0,
              height: 150.0,
              marginBottom: Sizes.fixPadding
            }}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{
                alignSelf: "center",
                marginBottom: Sizes.fixPadding
              }}
            >
              Enter code sent to your email.
            </Text>
          </View>
          
          {otpFields()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleResetPassword}
            style={styles.continueButtonStyle}
            disabled={isLoading}
          >
            {!isLoading ? (
              <Text style={{ ...Fonts.white16SemiBold }}>
                Verify
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View
        style={{ alignSelf: "center", marginBottom: Sizes.fixPadding * 2.0 }}
      >
        <Text style={{ alignSelf: "center", marginTop: Sizes.fixPadding }}>
          Didn't receive code?{" "}
          
          <Text
            style={{ color: Colors.primaryColor }}
            onPress={() => navigation.goBack()}
          >
            Resend
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
function otpFields() {
  const secondTextInput = createRef();
  const thirdTextInput = createRef();
  const forthTextInput = createRef();
  const fifthTextInput = createRef();
  const sixthTextInput = createRef();

  return (
    <View style={styles.otpFieldsContainerStyle}>
      <View style={styles.textFieldContainerStyle}>
        <TextInput
          style={Fonts.black17SemiBold}
          onChangeText={() => {
            secondTextInput.current.focus();
          }}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.textFieldContainerStyle}>
        <TextInput
          style={Fonts.black17SemiBold}
          ref={secondTextInput}
          keyboardType="numeric"
          onChangeText={() => {
            thirdTextInput.current.focus();
          }}
        />
      </View>

      <View style={styles.textFieldContainerStyle}>
        <TextInput
          style={Fonts.black17SemiBold}
          keyboardType="numeric"
          ref={thirdTextInput}
          onChangeText={() => {
            forthTextInput.current.focus();
          }}
        />
      </View>

      <View style={styles.textFieldContainerStyle}>
        <TextInput
          style={Fonts.black17SemiBold}
          keyboardType="numeric"
          ref={forthTextInput}
          onChangeText={() => {
            fifthTextInput.current.focus();
          }}
        />
      </View>

      <View style={styles.textFieldContainerStyle}>
        <TextInput
          style={Fonts.black17SemiBold}
          keyboardType="numeric"
          ref={fifthTextInput}
          onChangeText={() => {
            sixthTextInput.current.focus();
          }}
        />
      </View>

      <View style={styles.textFieldContainerStyle}>
        <TextInput
          style={Fonts.black17SemiBold}
          keyboardType="numeric"
          ref={sixthTextInput}
          onChangeText={() => {
            updateState({ isLoading: true });
            setTimeout(() => {
              updateState({ isLoading: false });
              navigation.navigate('SecurePin');
            }, 2000);
          }}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({

    textFieldContainerStyle: {
        height: 55.0,
        width: 45.0, // reduced width to fit 6 text fields on the screen
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        marginRight: Sizes.fixPadding, // add margin right
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.0,
    },
    otpFieldsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        // marginLeft: 0
    },
    // textFieldContainerStyle: {
    //     height: 55.0,
    //     width: 55.0,
    //     borderRadius: Sizes.fixPadding - 5.0,
    //     backgroundColor: Colors.whiteColor,
    //     marginRight: Sizes.fixPadding, // add margin right
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     elevation: 1.0
    // },
    resendInfoContainerStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    otpTextContainerStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5
    },
    otpFieldsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
});

export default EnterEmailCodeScreen;
