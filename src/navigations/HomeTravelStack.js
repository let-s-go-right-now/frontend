import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import BackDark from '../assets/icons/ai/back_dark.png';
import BackBright from '../assets/icons/ai/back_bright.png';
import HeartEmpty from '../assets/icons/ai/heart_gray.png';
import { Home, TravelCreate,TravelInvite, Mypage, AiRecommend, AiDetail, Report, WCreateExpense } from '../screens';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

const HomeTravelStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Home'
            screenOptions={({ navigation, route }) => {
                const darkMode = route.name === 'AiDetail';
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
                name="Home"
                component={Home}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="TravelCreate"
                component={TravelCreate}
                options={{ title: '여행 만들기', mode: 'light' }}
            />
            <Stack.Screen
                name="TravelInvite"  
                component={TravelInvite}
                options={{ title: '여행 초대', mode: 'light' }}
            />
            <Stack.Screen
                name="WCreateExpense"
                component={WCreateExpense}
                options={{ title: '여행 지출 만들기', headerTitleStyle: {
                    fontSize: 15,  // 폰트 크기 15
                    color: '#1D1D1F',  // 폰트 색상
                    fontFamily: 'SUIT-SemiBold',  // 폰트 패밀리
                },
                headerStyle: {
                    backgroundColor: 'white',  // 흰색으로 배경 설정
                }, }}
            />
                        <Stack.Screen
                name="Report"
                component={Report}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="AiRecommend"
                component={AiRecommend}
                options={{ title: 'AI 여행 계획', mode: 'light'}}
            />
            <Stack.Screen
                name="AiDetail"
                component={AiDetail}
                options={{ title: 'AI 여행 계획', mode: 'dark'}}
            />

        </Stack.Navigator>
    );
};

export default HomeTravelStack;
