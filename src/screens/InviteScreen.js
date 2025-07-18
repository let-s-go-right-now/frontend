import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const InviteScreen = ({ route }) => {
  const { InviteToken } = route.params; // 네비게이션을 통해 전달된 초대 토큰

  useEffect(() => {
    const fetchTokenAndJoinTrip = async () => {
      try {
        if (!InviteToken) return; // 초대 토큰이 없으면 종료

        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          console.log('토큰이 없습니다.');
          return;
        }

        // API 요청 보내기 (JWT 토큰을 Authorization 헤더에 포함)
        const response = await axios.post(
          'https://letsgorightnow.shop/api/trip/join',
          { InviteToken },
          {
            headers: { Authorization: `${token}` },
          }
        );

        console.log('초대 처리 성공:', response.data);
      } catch (error) {
        console.error('초대 처리 실패:', error);
      }
    };

    fetchTokenAndJoinTrip();
  }, [InviteToken]);

  return (
    <View>
      <Text>초대 화면</Text>
      <Text>Token: {InviteToken}</Text>
    </View>
  );
};

export default InviteScreen;
