import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Calculation, Finish, ImgZoomIn, ImgZoomInTab, Report, TravelCreate,TravelInvite,TravelManage,TravelOngoing, WEditExpense, WriteExpense } from '../screens';

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
                name="WEditExpense"
                component={WEditExpense}
                options={{ title: '여행 지출 수정하기', headerTitleStyle: {
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
                name="Calculation"
                component={Calculation}
                options={{ title: '금액 정산하기', headerTitleStyle: {
                    fontSize: 15,  // 폰트 크기 15
                    color: '#1D1D1F',  // 폰트 색상
                    fontFamily: 'SUIT-SemiBold',  // 폰트 패밀리
                },
                headerStyle: {
                    backgroundColor: 'white',  // 흰색으로 배경 설정
                }, }}
            />
            <Stack.Screen
                name="Finish"
                component={Finish}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="ImgZoomIn"
                component={ImgZoomIn}
                options={{ headerShown: false, mode: 'light' }}
            />
                        <Stack.Screen
                name="ImgZoomInTab"
                component={ImgZoomInTab}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="TravelInvite"  
                component={TravelInvite}
                options={{ title: '여행 초대', mode: 'light' }}
            />
        </Stack.Navigator>
        </>
    );
};

export default OngoingTravelStack;
