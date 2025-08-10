import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { BlackButton } from '../components';
import { theme } from '../theme';
import axiosInstance from '../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 초대 API 함수
const fetchJoinTrip = async (InviteToken) => {
  // 만약 InviteToken 없으면 throw로 종료
  if (!InviteToken) throw new Error('초대토큰이 없습니다.');

  // 토큰 체크: 없으면 throw
  const token = await AsyncStorage.getItem('jwtToken');
  if (!token) throw new Error('토큰없음');

  // axiosInstance에서 토큰 자동 주입이니까 헤더 지정 X
  // baseURL 적용, 상대경로만 작성
  const { data } = await axiosInstance.post(
    `/api/trip/join?token=${InviteToken}`,
    {}
  );
  return data;
};

const InviteScreen = ({ route, navigation,isLogin }) => {
  const { InviteToken } = route.params;

  // react-query로 API 호출(InviteToken변화에 대응)
  const {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['invite-join', InviteToken],
    queryFn: () => fetchJoinTrip(InviteToken),
    enabled: !!InviteToken, 
    retry: false,
  });

  // 토큰 없을 때: 네비게이션 바로 보내고 렌더 X(보호)
  React.useEffect(() => {
    if (!InviteToken) {
      navigation.navigate('LoginStack');
    }
  }, [InviteToken, navigation]);

  // 토큰 없는 에러(로그인 X) -> 로그인 네비게이션
  React.useEffect(() => {
    if (error?.message === '토큰없음') {
      navigation.navigate('LoginStack');
    }
  }, [error, navigation]);

  // 버튼 클릭시 홈/로그인으로 이동
  const navigateToHome = () => {
    if(isLogin){
    if (isSuccess) {
      navigation.navigate('BottomTab');
    } else if (isError && error?.response?.status === 409) {
      // 이미 초대된 멤버 등 특정 에러 분기
      navigation.navigate('BottomTab');
    } else if (error?.message === '토큰없음') {
      navigation.navigate('LoginStack');
    } else {
      navigation.navigate('BottomTab');
    }
  }
  };

  let description = '오류';
  if (isLoading) description = '초대 처리 중...';
  else if (isSuccess) description = '초대링크의 여행에 초대되었어요';
  else if (isError && error?.response?.status === 409)
    description = '이미 초대된 멤버입니다.';
  else if (error?.message === '토큰없음')
    description = '로그인 후 다시 시도해주세요';

  let buttonText = '홈으로 이동';
  if (isSuccess) buttonText = '홈으로 이동';
  else if (isError && error?.response?.status === 409)
    buttonText = '이미 초대된 멤버입니다.';
  else if (error?.message === '토큰없음')
    buttonText = '로그인하러가기';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>초대 화면</Text>
      <Text style={styles.tokenText}>{description}</Text>
      <BlackButton
        onPress={navigateToHome}
        text={buttonText}
        width={350}
      />
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
