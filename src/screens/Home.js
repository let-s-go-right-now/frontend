import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { BigTwoButton, GrayButton } from '../components';

const Home = () => {
  const homeIcon = require('../assets/icons/bottom-tab-home-filled.png');
  const [topComponentWidth, setTopComponentWidth] = useState(0); // 상단 컴포넌트의 너비 상태

  // 상단 컴포넌트의 크기를 측정
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTopComponentWidth(width); // 상단 컴포넌트의 너비 상태 업데이트
  };

    return (
      <View style={{ flex: 1 }}>
        <Text>Home</Text>
        <GrayButton
          text="식사"
          width={64}
          height={38}
          fontColor="#AAAAAA" 
          bgColor="#000000"  
          fontSize={17}     // 단위 없이 숫자만 사용
          fontWeight="bold"  
          icon={<Image source={homeIcon} style={{ width: 14, height: 14 }} />}  
        />
        <BigTwoButton
            width={topComponentWidth - 20}
            height="148px"  // 버튼 높이 설정
            textLeft="멤버초대하기"
            textRight="지출기록하기"
            imageLeft={<Image source={require('../assets/icons/bigTwo-left.png')} style={{ width: 58, height: 53.5 }} />}
            imageRight={<Image source={require('../assets/icons/bigTwo-right.png')} style={{ width: 50, height: 57 }} />}
            bgColorLeft="#000000"
            bgColorRight="#ffffff"
            />
        
      </View>
    );
  }

export default Home;
