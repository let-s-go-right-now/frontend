import React, { useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import TravelOngoing from './TravelOngoing';
import TravelCompleted from './TravelCompleted';
import LineTab from '../navigations/LineTab';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const Travel = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('진행 중'); 

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Container style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top }}>
        <LineTab tabs={['진행 중', '완료']} onSelect={setSelectedTab} selectedTab={selectedTab} />
        
        {/* 선택된 탭에 따라 다른 화면 렌더링 */}
        {selectedTab === '진행 중' ? <TravelOngoing /> : <TravelCompleted />}
      </Container>
    </>
  );
};

export default Travel;
