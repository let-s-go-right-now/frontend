import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import { CategoryOptionButton, PieChartComponent, MiniPieChart, BarChartComponent, BlackButton } from '../components';
import CloseGray from '../assets/icons/user/close_gray.png';
import MoneyDark from '../assets/icons/spending/money_dark.png';
import MoneyLight from '../assets/icons/spending/money_light.png';
import PersonDark from '../assets/icons/spending/person_dark.png';
import PersonLight from '../assets/icons/spending/person_light.png';
import Trophy from '../assets/icons/spending/trophy.png';
import 이우경 from '../assets/icons/user/이우경.png';
import spark from '../assets/icons/spending/spark.png';
import LinearGradient from 'react-native-linear-gradient';
import Calculation from './Calculation';
import useTabBarVisibility from '../navigations/userTabBarVisibility';

const Report = ({ navigation }) => {
    useTabBarVisibility(false);
    const [mode, setMode] = useState('dark');
    const [isMvp, setIsMvp] = useState(true);
    const [mvpName, setMvpName] = useState('이우경');

    return (
        <ContainerWrapper>
            <Container1 mode={mode}>
                <Header mode={mode}>
                    <HeaderTop>
                        <HeaderText mode={mode} fontSize={15}>지출리포트</HeaderText>
                        <Image source={CloseGray} onPress={() => navigation.goBack()} style={{position: 'absolute', right: 16, width: 24, height: 24}}/>                    
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
                <InfoWrapper style={{marginTop: 27}}>
                    <ExtraTitle style={{marginRight: 20}}>나의 총 지출액</ExtraTitle>
                    <Image source={MoneyLight} style={{marginRight: 3}}/>
                        <SemiTitle>52만원</SemiTitle>
                </InfoWrapper>
                <ExtraTitle style={{marginTop: 44}}>교통에 가장 많이 썼어요</ExtraTitle>
                <PieChartComponent />
                <ExtraTitle>2일차에 가장 많이 썼어요</ExtraTitle>
                <BarChartComponent />
                <ExtraTitle style={{marginTop: 60, marginBottom: 24}}>멤버별 지출을 알려드려요</ExtraTitle>
                <Option>
                    <CategoryOptionButton style={{paddingRight: 64}}/>
                    <LinearGradient
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        colors={['rgba(209, 48, 48, 0)', 'rgba(255, 255, 255, 1)']}
                        style={{
                            width: 120,
                            height: 44,
                            position: 'absolute',
                            right: 0,
                        }}
                    />                    
                </Option>
                <MiniPieChart/>
                <MvpWrapper>
                    { isMvp && (
                        <>
                            <InfoWrapper style={{marginRight: 'auto'}}>
                                <ExtraTitle>지출 MVP</ExtraTitle>
                                <Image source={Trophy} style={{}} />                                
                            </InfoWrapper>
                            <Profile source={이우경}/>
                            <Name>{mvpName}</Name>
                            <InfoWrapper>
                                <MvpText>총</MvpText>
                                <MvpText3> {58}만원 </MvpText3>
                                <MvpText>지출</MvpText>
                            </InfoWrapper>
                            <InfoWrapper>
                                <MvpText2>이번 여행에서 가장 많이 지출하셨어요</MvpText2>
                                <SparkIcon source={spark}/>
                            </InfoWrapper>
                        </>                        
                        )
                    }
                    <BlackButton
                        text="금액 정산하기"
                        width={343}
                        image={MoneyDark}
                        style={{
                            marginTop: 53,
                            marginBottom: 10
                        }}
                        onPress={() => navigation.navigate('Calculation')}
                    />
                </MvpWrapper>
            </Container2>
        </ContainerWrapper>
    )
}

const ContainerWrapper = styled.ScrollView`
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

const ExtraTitle = styled.Text`
    color: #000000;
    font-size: 20px;
    font-family: 'SUIT-ExtraBold';
`

const SemiTitle = styled.Text`
    color: #000000;
    font-size: 20px;
    font-family: 'SUIT-SemiBold';
`

const MvpWrapper = styled.View`
    display: flex;
    align-items: center;
`

const Profile = styled.Image`
    height: 60px;
    width: 60px;
    border-radius: 30px;
    margin: 48px 0 8px 0;
`

const Name = styled.Text`
    font-family: 'SIUT-SemiBold';
    color: #363638;
    font-size: 15px;
    margin-bottom: 20px;
`

const MvpText = styled.Text`
    font-family: 'SIUT-SemiBold';
    color: #363638;
    font-size: 15px;
    margin-bottom: 20px;
`

const MvpText2 = styled.Text`
    font-family: 'SIUT-Medium';
    color: #838383;
    font-size: 15px;
`

const MvpText3 = styled.Text`
    font-family: 'SUIT-ExtraBold';
    color: #363638;
    font-size: 15px;
    margin-bottom: 20px;
`

const SparkIcon = styled.Image`
    width: 16px;
    height: 16px;
    margin-left: 4px;
`

const Option = styled.View`
    position: relative;
`

export default Report
