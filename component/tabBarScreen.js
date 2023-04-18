import React, { useState } from "react";
import {
    Text,
    View,
    useWindowDimensions,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Image,
    Animated,
} from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import { Fonts, Colors, Sizes } from "../constants/styles";
import { AllData, WatchlistData, TopGainerData, TopLosersData } from "./statisticDataLists";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

export default TabBarScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Watchlist' },
        { key: 'third', title: 'Top Gainers' },
        { key: 'forth', title: 'Top Losers' },
    ]);

    const layout = useWindowDimensions();

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <Currency data={AllData} navigation={navigation} />;
            case 'second':
                return <WatchList navigation={navigation} />;
            case 'third':
                return <Currency data={TopGainerData} navigation={navigation} />;
            case 'forth':
                return <Currency data={TopLosersData} navigation={navigation} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            swipeEnabled={false}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: '#2497F3', }}
                    tabStyle={{
                        width: layout.width / 4.3,
                    }}
                    
                    scrollEnabled={true}
                    style={{ backgroundColor: 'white', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ ...Fonts.gray12Medium }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}

const rowSwipeAnimatedValues = {};

Array(20)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const WatchList = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(
        WatchlistData);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
        setShowSnackBar(true);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ ...styles.rowFront, }}
            activeOpacity={0.9}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding,
                }}
                onPress={() => navigation.navigate('Currency')}
            >
                <View style={styles.currencyInfoContainerStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            source={data.item.logo}
                            style={{ height: 55.0, width: 55.0, borderRadius: 27.5 }}
                            resizeMode="contain"
                        />
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.black16Medium }}>{data.item.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                                <Text style={{ ...Fonts.blackMedium, marginRight: Sizes.fixPadding + 5.0 }}>
                                    {data.item.sortName}
                                </Text>
                                <AntDesign
                                    name={data.item.isPositive == true ? "caretup" : "caretdown"} size={12}
                                    color={data.item.isPositive == true ? Colors.primaryColor : 'red'}
                                    style={{ marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0 }}
                                />
                                <Text style={{ ...Fonts.blackMedium }}>
                                    {data.item.percentage}%
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.black16SemiBold }}>
                            ${data.item.amount}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </TouchableHighlight>

    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons name="delete" size={29} color="white" style={{ alignSelf: 'center' }} />
                    <Text style={{ ...Fonts.white13Medium, alignSelf: 'center' }}>Delete</Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        listData.length == 0 ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.noWatchListDataContainerStyle}>
                    <Ionicons name="eye-sharp" size={50} color="#8F8F8F" />
                </View>
                <Text style={{ ...Fonts.gray18Bold, marginTop: Sizes.fixPadding * 2.0 }}>
                    Watchlist is empty!
                </Text>
            </View>
            :
            <View style={styles.container}>
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-100}
                    onSwipeValueChange={onSwipeValueChange}
                />
                <Snackbar
                    style={styles.snackBarContainerStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    Removed from watchlist
                </Snackbar>
            </View>
    );
}

const Currency = ({ data, navigation }) => {

    const renderItem = ({ item }) => (

        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding,
            }}
            onPress={() => navigation.navigate('Currency')}
        >
            <View style={styles.currencyInfoContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={item.logo}
                        style={{ height: 55.0, width: 55.0, borderRadius: 27.5 }}
                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.black16Medium }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                            <Text style={{ ...Fonts.blackMedium, marginRight: Sizes.fixPadding + 5.0 }}>
                                {item.sortName}
                            </Text>
                            <AntDesign
                                name={item.isPositive == true ? "caretup" : "caretdown"} size={12}
                                color={item.isPositive == true ? Colors.primaryColor : 'red'}
                                style={{ marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0 }}
                            />
                            <Text style={{ ...Fonts.blackMedium }}>
                                {item.percentage}%
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Fonts.black16SemiBold }}>
                        ${item.amount}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: Sizes.fixPadding * 7.0,
                paddingTop: Sizes.fixPadding
            }}
        />
    )
}

const styles = StyleSheet.create({
    currencyInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    container: {
        backgroundColor: Colors.backColor,
        flex: 1,
        marginVertical: Sizes.fixPadding
    },
    snackBarContainerStyle: {
        position: 'absolute',
        bottom: 42.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    rowFront: {
        backgroundColor: Colors.backColor,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1.0,
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        width: 100,
        backgroundColor: 'red',
        right: 0,
    },
    noWatchListDataContainerStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 75.0,
        backgroundColor: '#DFE0E2',
        alignItems: 'center',
        justifyContent: 'center',
    }

})



