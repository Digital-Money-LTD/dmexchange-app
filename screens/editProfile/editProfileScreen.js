import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { TextInput, Text, View, SafeAreaView, StatusBar, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import { Picker } from '@react-native-picker/picker';
import { BottomSheet } from "@rneui/themed";
import  AuthUser from "../../Api/AuthUser";

const photo = 'https://staging.dmexchange.com/storage/profile/4229/avatar.jpg?id=ZJuz6';

const EditProfileScreen = ({ navigation }) => {
    const navigater = useNavigation();
    const { postRequest, getRequest } = AuthUser();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBioData] = useState('');
    const [userdetail, setUserdetails] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [countries, setCountries] = useState([]);
    const [bottom_sheet, setBottomSheet] = useState(false);

    useEffect(()=>{
        fetchUserDetail();
        getRequest('countries')
            .then((response)=>{
                setCountries(response.data);
        });

        setFirstName(userdetail?.profile?.first_name);
        setLastName(userdetail?.profile?.last_name);
        setEmail(userdetail?.email);
        setDob(userdetail?.profile?.dob);
        setCountry(userdetail?.country);
        setPhone(userdetail?.phone);
        setBioData(userdetail?.profile?.bio);
        
    }, []);

    const fetchUserDetail = () =>{
         getRequest('user-profile')
         .then((response)=>{
            setUserdetails(response.data);
         });
    }

    const profile_data = {
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        country: country,
        email: email,
        phone: phone,
        bio: bio
    };

    const handleUpadateProfile = (e) => {
        e.preventDefault();

        postRequest('update-profile', profile_data)
          .then(response => {
            if (response.data.status === 400){
              setErrors(response.data.message);
            } else if (response.data.status === 200) {
              Alert.alert(response.data.message);
              setErrors('');
              //navigater.navigate('SignIn');
            }
          })
        .catch(error => console.log(error));
    };

    function userphoto() {
        if (!userdetail || !userdetail.profile || !userdetail.profile.picture) {
        return <View style={{ height: 110, width: 110, borderRadius: 55, backgroundColor: '#d3d3d3', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 50, color: 'white' }}>{userdetail && userdetail.name ? userdetail.name.charAt(0).toUpperCase() : ''}</Text>
                </View>;
        } else {
        return <Image
            source={{ uri: userdetail.profile.picture }}
            style={{ height: 110.0, width: 110.0, borderRadius: 55.0 }}
            resizeMode="contain"
        />;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profileImageChangeInfo()}
                    <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0 }}>
                        <OutlinedTextField
                            label='First Name'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={first_name}
                            onChangeText={text => setFirstName(text)}
                        />
                        {errors.first_name && <Text style={{ color: 'red' }}>{errors.first_name[0]}</Text>}
                    </View>
                    <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0 }}>
                        <OutlinedTextField
                            label='Last Name'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={last_name}
                            onChangeText={text => setLastName(text)}
                        />
                        {errors.last_name && <Text style={{ color: 'red' }}>{errors.last_name[0]}</Text>}
                    </View>
                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='Date of Birth'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={dob}
                            onChangeText={text => setDob(text)}
                        />
                         {errors.dob && <Text style={{ color: 'red' }}>{errors.dob[0]}</Text>}
                    </View>
                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='Country'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={country}
                            onChangeText={text => setCountry(text)}
                        />
                        {errors.country && <Text style={{ color: 'red' }}>{errors.country[0]}</Text>}
                    </View>

                    <View style={styles.textFieldsCommonStyle}>
                        <Picker
                            selectedValue={selectedValue}
                        >
                            {countries.map(country => (
                                <Picker.Item
                                    labelTextStyle={{ ...Fonts.black15Medium }}
                                    style={{ ...Fonts.black15SemiBold, }}
                                    key={country.code} 
                                    label={country.name} 
                                    value={country.code} 
                                />

                            ))}
                        </Picker>
                    </View>

                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='Email'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='PhoneNumber'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            keyboardType="numeric"
                        />
                        {errors.phone && <Text style={{ color: 'red' }}>{errors.phone[0]}</Text>}
                    </View>
                    <View style={styles.textFieldsCommonStyle}>
                        <OutlinedTextField
                            label='Bio Data'
                            labelTextStyle={{ ...Fonts.black15Medium }}
                            style={{ ...Fonts.black15SemiBold, }}
                            value={bio}
                            onChangeText={text => setBioData(text)}
                        />
                        {errors.bio && <Text style={{ color: 'red' }}>{errors.bio[0]}</Text>}
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleUpadateProfile}
                        style={styles.saveButtonContainerStyle}>
                        <Text style={{ ...Fonts.white16SemiBold }}>Update Profile</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {viewBottomSheet()}
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
                    Edit Profile
                </Text>
            </View>
        )
    }

    function viewBottomSheet() {
        return (
            <BottomSheet
                isVisible={bottom_sheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { setBottomSheet(false) } }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setBottomSheet(false)}
                    style={styles.bottomSheetStyle}
                >
                    <Text style={{ ...Fonts.black19Bold, textAlign: 'center', }}>
                        Choose Option
                    </Text>
                    <View style={{ height: 0.80, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-camera" size={22} color="#4C4C4C" />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={22} color="#4C4C4C" />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function profileImageChangeInfo() {
        return (
            <View style={{ alignItems: 'center', marginTop: Sizes.fixPadding * 2.5 }}>
                {userphoto()}
                <View style={{ position: 'absolute', bottom: -9.0, }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setBottomSheet(true)}
                        style={styles.changeProfileContainerStyle}>
                        <MaterialIcons name="photo-camera" size={15} color="white" />
                        <Text style={{ ...Fonts.white13Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    changeProfileContainerStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.orangeColor,
        paddingVertical: Sizes.fixPadding - 5.0,
        width: 130.0,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButtonContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    textFieldsCommonStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 1.5
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
}
)

export default EditProfileScreen;