import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const InviteScreen = ({ route, navigation }) => {
  const { InviteToken } = route.params; // 네비게이션을 통해 전달된 초대 토큰

  useEffect(() => {
    const fetchTokenAndJoinTrip = async () => {
      try {
        if (!InviteToken) return; // 초대 토큰이 없으면 종료

        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          console.log('토큰이 없습니다.');
          navigation.navigate('LoginStack');
          return;
        }

        // 초대 토큰은 body에 포함하고, JWT 토큰은 헤더에 포함
        const response = await axios.post(
          'https://letsgorightnow.shop/api/trip/join',
          { token: InviteToken }, // 초대 토큰은 body에 포함
          {
            headers: {
              Authorization: `${token}`, // jwtToken을 Authorization 헤더에 포함
            },
          }
        );

        console.log('초대 처리 성공:', response.data);
      } catch (error) {
        console.error('초대 처리 실패:', error);
      }
    };

    fetchTokenAndJoinTrip();
  }, [InviteToken]);

  // Home 화면으로 네비게이션하는 함수
  const navigateToHome = () => {
    navigation.navigate('BottomTab'); // 'Home' 화면으로 네비게이션
  };

  return (
    <View>
      <Text>초대 화면</Text>
      <Text>Token: {InviteToken}</Text>
      
      {/* Home으로 돌아가는 버튼 */}
      <Button title="Home으로 돌아가기" onPress={navigateToHome} />
    </View>
  );
};

export default InviteScreen;
