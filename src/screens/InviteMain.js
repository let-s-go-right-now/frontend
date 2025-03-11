import React, { useState } from 'react';
import styled from 'styled-components/native';
import { BlackButton } from '../components';
import { MiniGrayButton } from '../components';
import Logo  from '../assets/icons/logo/logo.svg';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const MainWrapper = styled.View`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 212px;
`

const Top = styled.View`
    display: flex;
    align-items: center;
    margin-top: 196px;
`

const LogoImg = styled(Logo)`
    width: 90px;
    height: 90px;
`

const TextWrapper = styled.View`
    display: flex;
    align-items: center;
`

const Title = styled.Text`
    font-size: 42px;
    color: #1D1D1F;
    margin-top: 24px;
    font-family: 'ONE Mobile OTF Regular';
`

const Desc = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    margin-top: 12px;
`

const ButtonWrapper = styled.View`
    display: flex;
    align-items: center;
    gap: 25px;
`

const InviteMain = ({ navigation }) => {
    const [name,setName] = useState('박시우')
    return (
        <MainWrapper>
            <Top>
                <View><Text>{name}님의</Text> <Text>여행에 초대되었어요</Text></View>
                <Text>로그인 후 여행에 참여할 수 있어요</Text>
            </Top>
            <ButtonWrapper>
                <BlackButton 
                    text="로그인"
                    width={327}
                    onPress={() => navigation.navigate('Login')}
                />
                <MiniGrayButton 
                    text="가입하기"
                    onPress={() => navigation.navigate('Signup1')}
                />                
            </ButtonWrapper>
        </MainWrapper>
    )
}

export default InviteMain
