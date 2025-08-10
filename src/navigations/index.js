import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import queryString from 'query-string'; 
import { createStackNavigator } from '@react-navigation/stack';
import { InviteScreen } from '../screens';  // InviteScreen 임포트
import BottomTab from './BottomTab';  // BottomTab 임포트
import LoginStack from './LoginStack';  // LoginStack 임포트

const Stack = createStackNavigator(); // Stack Navigator 생성

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [InviteToken, setInviteToken] = useState(null);  
  const navigation = useNavigation();

  // 딥링크 URL 처리
  useEffect(() => {
    const handleDeepLink = async (event) => {
      const { url } = event;
      const parsed = queryString.parseUrl(url);
      const token = parsed.query.token;  
      if (token) {
        await AsyncStorage.setItem('InviteToken', token); // AsyncStorage에 token 저장
        setInviteToken(token); // 상태에 token 저장
        navigation.navigate('InviteScreen', { InviteToken: token }, {isLogin:isLogin}); // Stack 내의 InviteScreen으로 이동
      }
    };

    const unsubscribe = Linking.addEventListener('url', handleDeepLink);

    return () => {
      unsubscribe.remove();
    };
  }, [navigation]);

  return (
    <Stack.Navigator
    initialRouteName={isLogin ? "BottomTab" : "LoginStack"}
    screenOptions={{ headerShown: false }} // 모든 스크린에서 헤더 숨김
  >
    {isLogin ? (
      <Stack.Screen name="BottomTab">
        {(props) => <BottomTab {...props} setIsLogin={setIsLogin} />}
      </Stack.Screen>
    ) : (
      <Stack.Screen name="LoginStack">
        {(props) => <LoginStack {...props} setIsLogin={setIsLogin} InviteToken={InviteToken} />}
      </Stack.Screen>
    )}
    <Stack.Screen name="InviteScreen" component={InviteScreen} isLogin={isLogin}/>
  </Stack.Navigator>
  );
};

export default Navigation;
