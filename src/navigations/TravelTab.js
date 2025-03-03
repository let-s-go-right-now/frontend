import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OngoingTravelStack from './OngoingTravelStack';
import CompletedTravelStack from './CompletedTravelStack';
import { theme } from '../theme';
import { CompletedDetail } from '../screens';

const Tab = createMaterialTopTabNavigator();

const TravelTab = () => {
  return (
    <Tab.Navigator
  style={{ backgroundColor: 'white' }}
  screenOptions={{
    tabBarStyle: {
      width: 200,
      height: 42,
      elevation: 0 
    },
    tabBarIndicatorStyle: {
      backgroundColor: '#363638',
      height: 2, // 라인 두께 조절
      width: 65, // 라인 길이 조절 (필요하면 추가)
      marginLeft:18,
      borderRadius: 2, // 라운드 효과 추가 가능
    },
    tabBarLabelStyle: {
      fontFamily: theme.fonts.extrabold,
      fontSize: 17,
    },
  }}
>
  <Tab.Screen name="진행 중" component={OngoingTravelStack} />
  <Tab.Screen name="이전 여행" component={CompletedTravelStack}  />

</Tab.Navigator>

  );
};

export default TravelTab;