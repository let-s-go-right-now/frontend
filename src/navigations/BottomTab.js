import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {Home, Travel, Mypage} from '../screens';
import HomeStack from './HomeStack';
import { theme } from "../theme";
import MypageStack from './MypageStack';

const Tab = createBottomTabNavigator();

// tab icon의 크기, 색상, 이름 format 맞추기
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
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#1D1D1F',
        tabBarStyle: {
          backgroundColor: '#ffffff', // 탭 바 배경색 설정
          borderTopColor: '#ffffff', // 탭 바 경계선 색상
          borderTopWidth: 1, // 탭 바 경계선 두께
          height: 70,
          paddingTop: 5,
        },
      }}
      
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={
                focused
                  ? require('../assets/icons/bottom-tab-home-filled.png')
                  : require('../assets/icons/bottom-tab-home.png')
              }
              size={30}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <View style={{ alignItems: 'center' }}>
                <TabIcon
                  source={
                    props.accessibilityState.selected
                      ? require('../assets/icons/bottom-tab-home-filled.png')
                      : require('../assets/icons/bottom-tab-home.png')
                  }
                  size={30}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: props.accessibilityState.selected
                      ? '#000000' // 선택된 탭 글자 색
                      : '#1D1D1F', // 비선택된 탭 글자 색
                    fontWeight:props.accessibilityState.selected
                        ? 'bold'
                        : 'medium',
                        paddingTop: 5,
                  }}
                >
                  홈
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Travel"
        component={Travel}
        options={{ headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={
                focused
                  ? require('../assets/icons/bottom-tab-travel-filled.png')
                  : require('../assets/icons/bottom-tab-travel.png')
              }
              size={30}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <View style={{ alignItems: 'center' }}>
                <TabIcon
                  source={
                    props.accessibilityState.selected
                      ? require('../assets/icons/bottom-tab-travel-filled.png')
                      : require('../assets/icons/bottom-tab-travel.png')
                  }
                  size={30}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: props.accessibilityState.selected
                      ? '#000000'
                      : '#1D1D1F',
                      fontWeight:props.accessibilityState.selected
                      ? 'bold'
                      : 'medium',
                      paddingTop: 5,
                  }}
                >
                  여행기록
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{ headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={
                focused
                  ? require('../assets/icons/bottom-tab-my-filled.png')
                  : require('../assets/icons/bottom-tab-my.png')
              }
              size={30}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <View style={{ alignItems: 'center' }}>
                <TabIcon
                  source={
                    props.accessibilityState.selected
                      ? require('../assets/icons/bottom-tab-my-filled.png')
                      : require('../assets/icons/bottom-tab-my.png')
                      
                  }
                  size={30}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: props.accessibilityState.selected
                      ? '#000000'
                      : '#1D1D1F',
                      fontWeight:props.accessibilityState.selected
                      ? 'bold'
                      : 'medium',
                      paddingTop: 5,
                  }}
                >
                  MY
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
