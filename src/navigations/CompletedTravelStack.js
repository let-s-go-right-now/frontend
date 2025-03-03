import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CompletedDetail, TravelCompleted } from '../screens';

const Stack = createStackNavigator();

const CompletedTravelStack = ({navigation, route}) => {


    return (
        <Stack.Navigator initialRouteName="TravelCompleted">
            <Stack.Screen
                name="TravelCompleted"
                component={TravelCompleted}
                options={{ headerShown: false, mode: 'light' }}
            />
            <Stack.Screen
                name="CompletedDetail"
                component={CompletedDetail}
                options={{ tabBarStyle: { display: 'none' } } }
            />
        </Stack.Navigator>
    );
};

export default CompletedTravelStack;
