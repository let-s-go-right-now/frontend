import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Main, Signup1, Signup2, Login, Home, InviteScreen } from '../screens';  //splash
import { useTabBarVisibility } from '../utils';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const LoginStack = ({ setIsLogin,InviteToken }) => {
    console.log('LoginStack에서 받은 setIsLogin:', setIsLogin);

    useTabBarVisibility(false);
    return (
        <Stack.Navigator
            initialRouteName='Main'
        >
            <Stack.Screen name='Main' component={Main} options={{headerShown: false}} InviteToken={InviteToken}/>
            <Stack.Screen name='Signup1' component={Signup1} options={{headerShown: false}}/>
            <Stack.Screen name='Signup2' component={Signup2} options={{headerShown: false}}/>
            <Stack.Screen name='Login' options={{headerShown: false}}>
                {props => <Login {...props} setIsLogin={setIsLogin}/>}
            </Stack.Screen>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}} InviteToken={InviteToken}/>
        </Stack.Navigator>
    )
}

export default LoginStack
