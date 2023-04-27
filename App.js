import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabBarScreen from "./component/bottomTabBarScreen";
import TotalBalanceScreen from "./screens/balance/totalBalanceScreen";
import CurrencyScreen from "./screens/currency/currencyScreen";
import DepositScreen from "./screens/deposit/depositScreen";
import SuccessScreen from "./screens/success/successScreen";
import WithdrawScreen from "./screens/withdraw/withdrawScreen";
import WrongScreen from "./screens/wrong/wrongScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import ChangePasswordScreen from "./screens/ChangePassword/ChangePasswordScreen";
import BankDetailScreen from "./screens/bankDetail/bankDetailScreen";
import SupportScreen from "./screens/support/supportScreen";
import PrivacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import SigninScreen from "./screens/auth/signinScreen";
import ReceiveScreen from "./screens/receive/receiveScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import ExchangeScreen from "./screens/exchange/exchangeScreen";
import ForgotPasswordScreen from "./screens/auth/forgotPassword";
import ResetPasswordScreen from './screens/auth/resetPassword';
import EnterEmailCodeScreen from "./screens/auth/enterEmailCode";
import OTPScreen from "./screens/auth/otpScreen";
import SecurePinScreen from "./screens/auth/securePinScreen";
import SplashScreen from "./screens/splashScreen";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}

        // initialRouteName="ForgotPassword"
      >
       
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="SignIn" component={SigninScreen} />
        <Stack.Screen name="Receive" component={ReceiveScreen} />
        <Stack.Screen name="ExchangeScreen" component={ExchangeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='EnterEmailCode' component={EnterEmailCodeScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="SecurePin" component={SecurePinScreen} />
        <Stack.Screen name="BottomTabScreen" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Currency" component={CurrencyScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Wrong" component={WrongScreen} />
        <Stack.Screen name="Balance" component={TotalBalanceScreen} />
        <Stack.Screen name="Deposit" component={DepositScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="BankDetail" component={BankDetailScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;