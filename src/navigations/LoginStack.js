import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Main, Signup1, Signup2, Login, Home } from '../screens';  //splash

const Stack = createStackNavigator();

const LoginStack = ({ setIsLogin }) => {
    return (
        <Stack.Navigator
            initialRouteName='Main'
        >
            <Stack.Screen name='Main' component={Main} options={{headerShown: false}}/>
            <Stack.Screen name='Signup1' component={Signup1} options={{headerShown: false}}/>
            <Stack.Screen name='Signup2' component={Signup2} options={{headerShown: false}}/>
            <Stack.Screen name='Login' options={{headerShown: false}}>
                {props => <Login {...props} setIsLogin={setIsLogin} />}
            </Stack.Screen>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default LoginStack
