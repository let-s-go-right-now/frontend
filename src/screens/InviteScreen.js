import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BlackButton } from '../components';
import { theme } from '../theme';

const InviteScreen = ({ route, navigation }) => {
  const { InviteToken,isLogin } = route.params; // 네비게이션을 통해 전달된 초대 토큰
  const [isInvite, setIsInvite] =useState(false);
  const [InviteFail, setInviteFail]  =useState(false);

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
          `https://letsgorightnow.shop/api/trip/join?token=${InviteToken}`,
          {}, // 초대 토큰은 body에 포함
          {
            headers: {
              Authorization: `${token}`, // jwtToken을 Authorization 헤더에 포함
            },
          }
        );
        console.log('초대 처리 성공:', response.data);
        setIsInvite(true);
      } catch (error) {
        setInviteFail(false);
      }
    };

    fetchTokenAndJoinTrip();
  }, [InviteToken]);

  // Home 화면으로 네비게이션하는 함수
  const navigateToHome = () => {
    if(InviteToken && isInvite){
          navigation.navigate('BottomTab'); // 'Home' 화면으로 네비게이션
        }
        else if(InviteFail){
          navigation.navigate('BottomTab'); // 'Home' 화면으로 네비게이션
        }    else{
          navigation.navigate('LoginStack');
    
      }};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>초대 화면</Text>
      <Text style={styles.tokenText}>                {InviteToken && isInvite
          ? '초대링크의 여행에 초대되었어요'
          : InviteFail
          ? '이미 초대된 멤버입니다.'
          : InviteToken && !isInvite
          ? '로그인 후 다시 시도해주세요'
          : '오류'
        }</Text>
      
      {/* Home으로 돌아가는 버튼 */}
      <BlackButton onPress={navigateToHome} text=        {InviteToken && isInvite
          ? '홈으로 이동'
          : InviteFail
          ? '이미 초대된 멤버입니다.'
          : InviteToken && !isInvite
          ? '로그인하러가기'
          : '홈으로 이동'
        }
       width={350} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SUIT-ExtraBold',
    color: '#1D1D1F',
    marginBottom: 10,
  },
  tokenText: {
    fontSize: 16,
    fontFamily: theme.fonts.extrabold,
    color: '#323232',
    marginBottom: 20,
  },
});

export default InviteScreen;
