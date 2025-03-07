import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TravelCreate,TravelManage,TravelOngoing, WriteExpense } from '../screens';
import ReportStack from './ReportStack';

const Stack = createStackNavigator();

const OngoingTravelStack = () => {
    return (<>
            <Stack.Navigator 
            initialRouteName='TravelOngoing'
            screenOptions={{
                headerStyle: { backgroundColor: '#f8f9fa' },
                headerShadowVisible: false,
                headerTitleAlign: 'center',  // 제목 중앙 정렬
            }}
        >
            <Stack.Screen
                name="TravelOngoing"
                component={TravelOngoing}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="TravelCreate"  
                component={TravelCreate}
                options={{
                    title: "여행 만들기", 
                    headerTitleStyle: {
                        fontSize: 15,  // 폰트 크기 15
                        color: '#1D1D1F',  // 폰트 색상
                        fontFamily: 'SUIT-SemiBold',  // 폰트 패밀리
                    },
                    headerStyle: {
                        backgroundColor: 'white',  // 흰색으로 배경 설정
                    },
                }} 
            />
            <Stack.Screen
                name="TravelManage"  //AI화면 연결
                component={TravelManage}
                options={{
                    title: "여행 관리하기", 
                    headerTitleStyle: {
                        fontSize: 15,  // 폰트 크기 15
                        color: '#1D1D1F',  // 폰트 색상
                        fontFamily: 'SUIT-SemiBold',  // 폰트 패밀리
                    },
                    headerStyle: {
                        backgroundColor: 'white',  // 흰색으로 배경 설정
                    },
                }} 
            />
                        <Stack.Screen
                name="WriteExpense"  //AI화면 연결
                component={WriteExpense}
                options={{
                    title: "여행 지출 기록하기", 
                    headerTitleStyle: {
                        fontSize: 15,  // 폰트 크기 15
                        color: '#1D1D1F',  // 폰트 색상
                        fontFamily: 'SUIT-SemiBold',  // 폰트 패밀리
                    },
                    headerStyle: {
                        backgroundColor: 'white',  // 흰색으로 배경 설정
                    },
                }} 
            />
            <Stack.Screen
                name="ReportStack"
                component={ReportStack}
                options={{ headerShown: false, title: '지출리포트', mode: 'dark'}}
            />
        </Stack.Navigator>
        </>
    );
};

export default OngoingTravelStack;
