import React from 'react';
import { Button, StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// 스타일 정의
const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

// 🚀 Mypage 컴포넌트
const Mypage = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Container style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top }}>
        <StyledText>Mypage</StyledText>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </Container>
    </>
  );
};
  export default Mypage;