import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Home from '../screens/Home';
import Travel from '../screens/Travel';
import Mypage from '../screens/Mypage';

const Tab = createBottomTabNavigator();


//tab icon의 크기, 색상, 이름 format 맞추기
const TabIcon = ({ source, size }) => {
    return (
      <Image
        source={source}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    );
  };

const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({ focused }) => (
                      <TabIcon source={focused ? require('../assets/icons/bottom-tab-home-filled.png') :require('../assets/icons/bottom-tab-home.png') } size={30} />
                    ),
                  }}
            ></Tab.Screen>
            <Tab.Screen
                component={Travel}
                name="Travel"
                options={{
                    tabBarLabel: '여행기록',
                    tabBarIcon: ({ focused }) => (
                    <TabIcon source={focused ? require('../assets/icons/bottom-tab-travel-filled.png') : require('../assets/icons/bottom-tab-travel.png') } size={30} />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                component={Mypage}
                name="Mypage"
                options={{
                    tabBarLabel: 'MY',
                    tabBarIcon: ({ focused }) => (
                    <TabIcon source={focused ? require('../assets/icons/bottom-tab-my-filled.png') : require('../assets/icons/bottom-tab-my.png')} size={30} />
                    ),
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    )
};

export default BottomTab;