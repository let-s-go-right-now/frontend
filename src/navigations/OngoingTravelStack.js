import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import BackDark from '../assets/icons/ai/back_dark.png';
import BackBright from '../assets/icons/ai/back_bright.png';
import HeartEmpty from '../assets/icons/ai/heart_empty.png';
import { TravelCreate,TravelOngoing } from '../screens';

const Stack = createStackNavigator();

const OngoingTravelStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName='TravelOngoing'
            screenOptions={({ navigation, route }) => {
                const darkMode = route.name === '마이페이지'; // 마이페이지 화면에서는 다크모드 적용
                return {
                    headerStyle: {
                        height: 36,
                        borderBottomWidth: 0,
                        backgroundColor: darkMode ? '#1D1D1F' : '#FFFFFF',
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: darkMode ? '#FFFFFF' : '#1D1D1F', 
                        fontSize: 15,
                        fontFamily: 'SUIT-SemiBold'
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={darkMode ? BackBright : BackDark}
                                style={{ width: 16, height: 13, marginLeft: 18 }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity>
                            <Image
                                source={darkMode ? HeartEmpty : null}
                                style={{ width: 26, height: 26, marginRight: 18 }}
                            />
                        </TouchableOpacity>
                    )
                }
            }}
        >
            <Stack.Screen
                name="TravelOngoing"
                component={TravelOngoing}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="TravelCreate"  //AI화면 연결
                component={TravelCreate}
                options={{ title: 'TravelCreate', mode: 'light' }}
            />
        </Stack.Navigator>
    );
};

export default OngoingTravelStack;
