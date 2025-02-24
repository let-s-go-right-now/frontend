import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import BackDark from '../assets/icons/ai/back_dark.png';
import BackBright from '../assets/icons/ai/back_bright.png';
import HeartEmpty from '../assets/icons/ai/heart_empty.png';
import { NavigationContainer } from '@react-navigation/native';

// 테스트용 데이터
// const ExampleList = [
//     {
//         id: 1,
//         name: "Home",
//         component: Home,
//         options: { headerShown: false, mode: 'light' },
//     },
//     {
//         id: 2,
//         name: "AI 여행 계획",
//         component: Plan,
//         options: { title: 'AI 여행 계획', mode: 'light'},
//     },
//     {
//         id: 3,
//         name: "AI 여행 계획2",
//         component: Plan2,
//         options: { title: 'AI 여행 계획', mode: 'dark'},
//     },
// ]

const Stack = createStackNavigator();

const StackNavigator = ({ ScreenList }) => {
    return (
        <Stack.Navigator 
            screenOptions={({navigation, route}) => {
                const darkMode = ScreenList.find(screen => screen.name === route.name)?.options?.mode === 'dark';
                return {
                    headerStyle: {
                        height: 36,
                        borderBottomWidth: 0,
                        backgroundColor: darkMode ? '#1D1D1F' : '#FFFFFF',
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    headerTitleAlign : 'center',
                    headerTitleStyle: {
                        color: darkMode ? '#FFFFFF' : '#1D1D1F', 
                        fontSize: 15,
                        fontFamily: 'SUIT-SemiBold'
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={darkMode ? BackBright : BackDark}
                                style={{width: 16, height: 13, marginLeft: 18}}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity>
                            <Image
                                source={darkMode ? HeartEmpty : null}
                                style={{width: 26, heihgt: 26, marginRight: 18}}
                            />
                        </TouchableOpacity>
                    )
                }
            }}
        >
            {ScreenList.map((screen) => (
                <Stack.Screen
                    key={screen.id}
                    name={screen.name}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </Stack.Navigator>
    )
}

export default StackNavigator
