import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import CloseGray from '../assets/icons/user/close_gray.svg';
import MoneyDark from '../assets/icons/spending/money_dark.png';
import MoneyLight from '../assets/icons/spending/money_light.png';
import PersonDark from '../assets/icons/spending/person_dark.png';
import PersonLight from '../assets/icons/spending/person_light.png';


const Report = () => {
    const [mode, setMode] = useState('dark');

    return (
        <ContainerWrapper>
            <Container1 mode={mode}>
                <Header mode={mode}>
                    <HeaderTop>
                        <HeaderText mode={mode} fontSize={15}>지출리포트</HeaderText>
                        <CloseGray style={{position: 'absolute', right: 16 }}/>                    
                    </HeaderTop>
                    <HeaderBottom>
                        <HeaderText mode={mode}>총 지출액</HeaderText>
                        <InfoWrapper>
                            <Image source={mode==='dark' ? MoneyDark : MoneyLight} style={{marginRight: 3}}/>
                            <HeaderText mode={mode} style={{marginRight: 9}}>156만원</HeaderText>
                            <PersonWrapper mode={mode}>
                                <Image source={mode==='dark' ? PersonDark : PersonLight}/>
                                <Member mode={mode}>3인</Member>
                            </PersonWrapper>
                        </InfoWrapper>
                    </HeaderBottom>
                </Header> 
            </Container1>
            <Container2>
                <InfoWrapper >
                    <Title>나의 총 지출액</Title>
                    <Image source={MoneyLight}/>
                        <Title>52만원</Title>
                </InfoWrapper>
            </Container2>       
        </ContainerWrapper>
    )
}

const ContainerWrapper = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`

const Container1 = styled.View`
    width: 100%;
    padding: 0 16px;
    background-color: ${({mode}) => mode==='dark' ? '#1D1D1F' : '#FFFFFF'};

`
const Container2 = styled.View`
    width: 100%;
    padding: 0 16px;
`

const Header = styled.View`
    /* height: 36px; */
    background-color: ${({mode}) => mode==='dark' ? '#1D1D1F' : '#FFFFFF'};
`
const HeaderTop = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 36px;
    margin-bottom: 12px;
`

const HeaderBottom = styled.View`
    display: flex;
    padding: 16px 0;
    gap: 20px;
    margin-bottom: 17px;
`

const HeaderText = styled.Text`
    color: ${({mode}) => mode==='dark' ? '#FFFFFF' : '#1D1D1F'};
    font-size: ${({fontSize}) => fontSize || 20}px;
    text-align: start;
`

const PersonWrapper = styled.View`
    background-color: ${({mode}) => mode==='dark' ? '#4E4E4E' : '#F7F7F7'};
    border-radius: 1px;
    padding: 4px 6px;
    gap: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const InfoWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`

const Member = styled.Text`
    font-size: 13px;
    color: ${({mode}) => mode==='dark' ? '#AAAAAA' : '#838383'};
`

const Title = styled.Text`
    color: #000000;
    font-size: 20px;
    font-family: 'SUIT-ExtraBold';
`

export default Report
