import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import spark from '../assets/icons/spending/spark_black.png';
import { BlackButton } from '../components';

const FinishWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const BoldWrapper = styled.View`
    gap: 4px;
    display: flex;
    align-items: center;
    flex-direction: row;
`

const Bold = styled.Text`
    font-size: 27px;
    font-family: 'SUIT-ExtraBold';
    color: #323232;
`

const Desc = styled.Text`
    font-size: 16px;
    font-family: 'SUIT-Medium';
    color: #AAAAAA;
    margin: 19px auto 95px auto;
`

const Finish = () => {
    return (
        <FinishWrapper>
            <BoldWrapper>
                <Bold>고생하셨어요</Bold>
                <Image source={spark} style={{width: 32, height: 32}}/>
            </BoldWrapper>
            <Desc>여행기록 > 이전여행 에서 확인할 수 있어요</Desc>
            <BlackButton 
                text="홈으로 돌아가기"
                width={327}
            />
        </FinishWrapper>
    )
}

export default Finish
