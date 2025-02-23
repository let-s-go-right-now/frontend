import React from 'react';
import styled from 'styled-components/native';
import { BlackButton } from '../components';
import { MiniGrayButton } from '../components';
import Logo  from '../assets/icons/logo/logo.svg';

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

const Main = ({ navigation }) => {
    return (
        <MainWrapper>
            <Top>
                <LogoImg />
                <TextWrapper>
                    <Title>당장가자</Title>
                    <Desc>지금 바로 떠나고 싶을 때</Desc>
                </TextWrapper>                
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

export default Main
