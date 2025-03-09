import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Calculation, CompletedDetail, CompletedProfile, Finish, ImgZoomIn, ImgZoomInTab, Report, TravelCompleted, WCompletedExpense } from '../screens';

const Stack = createStackNavigator();

const CompletedTravelStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            initialRouteName="TravelCompleted"
            screenOptions={{
                headerStyle: { backgroundColor: '#f8f9fa' },
                headerShadowVisible: false,
                headerTitleAlign: 'center',  // 제목 중앙 정렬
            }}
        >
            <Stack.Screen
                name="TravelCompleted"
                component={TravelCompleted}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CompletedDetail"
                component={CompletedDetail}
                options={{
                    title: "이전 여행", 
                    headerTitleStyle: {
                        fontSize: 15,  // 폰트 크기 15
                        color: '#1D1D1F',  // 폰트 색상
                        fontFamily: 'SUIT-SemiBold',  // 폰트 패밀리
                    },
                }} 
            />
            <Stack.Screen
                name="CompletedProfile"
                component={CompletedProfile}
                options={{
                    title: "이전 여행 상세", 
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
                name="WCompletedExpense"
                component={WCompletedExpense}
                options={{ title: '여행 지출 확인하기', headerTitleStyle: {
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
                options={{ title: '금액 정산하기',headerTitleStyle: {
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
        </Stack.Navigator>
    );
};

export default CompletedTravelStack;
