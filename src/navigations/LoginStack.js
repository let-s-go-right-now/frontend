import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Main } from '../screens';
import { Signup1 } from '../screens';
import { Signup2 } from '../screens';
import { Login } from '../screens';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Main'
        >
            <Stack.Screen name='Main' component={Main} options={{headerShown: false}}/>
            <Stack.Screen name='Signup1' component={Signup1} options={{headerShown: false}}/>
            <Stack.Screen name='Signup2' component={Signup2} options={{headerShown: false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default LoginStack
