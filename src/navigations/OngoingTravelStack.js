import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import BackDark from '../assets/icons/ai/back_dark.png';
import BackBright from '../assets/icons/ai/back_bright.png';
import HeartEmpty from '../assets/icons/ai/heart_empty.png';
import { TravelCompleted, TravelCreate,TravelOngoing, Finish } from '../screens';
import { Text } from 'react-native-gesture-handler';
import ReportStack from './ReportStack';

const Stack = createStackNavigator();

const OngoingTravelStack = () => {
    return (<>
            <Stack.Navigator 
            initialRouteName='TravelOngoing'
        >
            <Stack.Screen
                name="TravelOngoing"
                component={TravelOngoing}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="TravelCreate"  //AI화면 연결
                component={TravelCreate}
                options={{ title: 'AI', mode: 'light' }}
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
