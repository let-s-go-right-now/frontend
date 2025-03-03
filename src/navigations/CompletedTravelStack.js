import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import BackDark from '../assets/icons/ai/back_dark.png';
import BackBright from '../assets/icons/ai/back_bright.png';
import HeartEmpty from '../assets/icons/ai/heart_empty.png';
import { TravelCompleted, TravelCreate,TravelOngoing } from '../screens';
import { Text } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const CompletedTravelStack = () => {
    return (<>
        <Stack.Navigator 
        initialRouteName='TravelCompleted'
    >
        <Stack.Screen
            name="TravelCompleted"
            component={TravelCompleted}
            options={{ headerShown: false, mode: 'light' }}
        />
    </Stack.Navigator>
        </>
    );
};

export default CompletedTravelStack;
