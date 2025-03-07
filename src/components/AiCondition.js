import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Image, View } from 'react-native';
import calendarBlack from '../assets/icons/main/calendar_black.png';
import locationBlack from '../assets/icons/main/location_black.png';
import moneyBlack from '../assets/icons/main/money_black.png';
import transportBlack from '../assets/icons/main/transport_black.png';
import calendarWhite from '../assets/icons/main/calendar_white.png';
import locationWhite from '../assets/icons/main/location_white.png';
import moneyWhite from '../assets/icons/main/money_white.png';
import transportWhite from '../assets/icons/main/transport_white.png';

const ConditionWrapper = styled.ScrollView.attrs(() => ({
    horizontal: true,
    contentContainerStyle: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 0,
        alignItems: 'center'
    },
}))`
    height: 26px;
    display: flex;
    flex-shrink: 0;
`

const Category = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 6px 4px;
    height: 26px;
`

const Img = styled(Image)`
    width: 14px;
    height: 14px;
`

const BlackText = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    color: #1D1D1F;
`

const GrayText = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    color: #AAAAAA;
`

const WhiteText = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    color: #FFFFFF;
`

const Line = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    color: #AAAAAA;
    margin: 0 4px;
`

const AiConditionBlack = ({ date, money, location, transport }) => {

    return (
        <View style={{marginTop: 17}}>
            <ConditionWrapper>
                <Category>
                    <Img source={calendarBlack}/>
                    <BlackText>{date}</BlackText>
                </Category>
                <Line>|</Line>
                <Category>
                    <Img source={moneyBlack}/>
                    <BlackText>{money > 10000 ? `${Math.floor(money/10000)}만원` : `${money}원`}</BlackText>
                    <GrayText>/인</GrayText>
                </Category>
                <Line>|</Line>
                <Category>
                    <Img source={locationBlack}/>
                    <BlackText>{location}</BlackText>
                </Category>
                <Line>|</Line>
                <Category>
                    <Img source={transportBlack}/>
                    <BlackText>{transport}</BlackText>
                </Category>
            </ConditionWrapper>        
        </View>
    )
}

const AiConditionWhite = ({ startDate, endDate, money, location, transport, style=null }) => {
    const start = startDate.replace(/-/g, ' ').split(' ');
    const end = endDate.replace(/-/g, ' ').split(' ');
    console.log('start', start);
    console.log('end', end);
    
    return (
        <ConditionWrapper style={[style]}>
            <Category>
                <Img source={transportWhite}/>
                <WhiteText>{transport}</WhiteText>
            </Category>
            <Line>|</Line>
            <Category>
                <Img source={moneyWhite}/>
                <WhiteText>{money > 10000 ? `${Math.floor(money/10000)}만원` : `${money}원`}</WhiteText>
            </Category>
            <Line>|</Line>
            <Category>
                <Img source={locationWhite}/>
                <WhiteText>{location}</WhiteText>
            </Category>
            <Line>|</Line>
            <Category>
                <Img source={calendarWhite}/>
                <WhiteText>{start[1]}.{start[2]} - {end[1]}.{end[2]}</WhiteText>
            </Category>
        </ConditionWrapper>
    )
}

export { AiConditionBlack, AiConditionWhite };
