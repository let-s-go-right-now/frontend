import React, { useState }  from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {BlackButton, BigTwoButton} from '../../components' // BlackButton 컴포넌트 경로에 맞게 수정하세요

const TravelInvite = () => {
    const [topComponentWidth, setTopComponentWidth] = useState(0); // 상단 컴포넌트의 너비 상태
  
    // 상단 컴포넌트의 크기를 측정
    const onLayout = (event) => {
      const { width } = event.nativeEvent.layout;
      setTopComponentWidth(width); // 상단 컴포넌트의 너비 상태 업데이트
    };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>여행을 만들었어요</Text>
        <Text style={styles.subTitleText}>
          초대 링크 복사로 함께 떠날 멤버를 초대할 수 있어요
        </Text>
      </View>
      <BigTwoButton
            width={topComponentWidth - 20}
            height="148px"  // 버튼 높이 설정
            textLeft="멤버초대하기"
            textRight="지출기록하기"
            imageLeft={<Image source={require('../../assets/icons/bigTwo-left.png')} style={{ width: 58, height: 53.5 }} />}
            imageRight={<Image source={require('../../assets/icons/bigTwo-right.png')} style={{ width: 50, height: 57 }} />}
            bgColorLeft="#000000"
            bgColorRight="#ffffff"
            />
      <BlackButton
        text="여행보러가기"
        width={351}
        onPress={() => {}}  // 버튼 클릭 시 실행할 함수
        style={styles.button}
      />
    </ScrollView>
  );
};

export default TravelInvite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontFamily: 'theme.fonts.extrabold',
    fontSize: 19,
    color: '#1D1D1F',
    marginBottom: 10,
  },
  subTitleText: {
    fontWeight: 'medium',
    fontSize: 13,
    color: '#838383',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});
