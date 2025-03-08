import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { BlackButton } from '../../components'; // BlackButton 컴포넌트 경로에 맞게 수정하세요
import styled from 'styled-components/native';
import { theme } from '../../theme';


const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#1D1D1F')};
  height: ${(props) => props.height || '50px'};
  width: ${(props) => props.width}px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
  position: relative;
  gap: 4px;
  font-weight: bold;
  font-size: 16px;
  border-width: 1px;
  border-color: #1D1D1F;
  border-style: solid;
`;

const Title = styled.Text`
  font-size: 17px;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  font-family: 'SUIT-Bold';
  line-height: 23.8px;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;


const TravelInvite = ({ navigation }) => {
  const [topComponentWidth, setTopComponentWidth] = useState(0); // 상단 컴포넌트의 너비 상태
  
  // 상단 컴포넌트의 크기를 측정
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTopComponentWidth(width); // 상단 컴포넌트의 너비 상태 업데이트
  };

  // 지출기록하기
  const handleWriteExpense = () => {
    navigation.navigate('WCreateExpense',{id:1});
  };

    // 
    const handleOngoingTravel = () => {
      navigation.navigate('Home');
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>여행을 만들었어요</Text>
        <Text style={styles.subTitleText}>
          초대 링크 복사로 함께 떠날 멤버를 초대할 수 있어요
        </Text>
      </View>
      <View style={styles.twobuttonwrapper}>
      <ButtonContainer width={353}>
      <Button width={166.5} bgColor={'#000000' || '#1D1D1F'} height={148} onPress={()=>{}}>
        <Title color="#FFFFFF">멤버초대하기</Title>
        <IconContainer><Image source={require('../../assets/icons/bigTwo-left.png')} style={{ width: 58, height: 53.5 }} /></IconContainer>
      </Button>
      <Button width={166.5} bgColor={"#ffffff" || '#FFFFFF'} height={148} onPress={handleWriteExpense}>
        <Title color="#1D1D1F">지출기록하기</Title>
        <IconContainer><Image source={require('../../assets/icons/bigTwo-right.png')} style={{ width: 50, height: 57 }} /></IconContainer>
      </Button>
    </ButtonContainer>
      </View>
      <BlackButton
        text="여행보러가기"
        width={343}
        onPress={handleOngoingTravel}  // 버튼 클릭 시 실행할 함수
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
    fontFamily: theme.fonts.extrabold,
    fontSize: 19,
    color: '#1D1D1F',
    marginBottom: 10,
  },
  twobuttonwrapper: {
    marginLeft: 20,
    marginRight: 8,
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
