// locatio과 transportOption만 존재할 때

import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Bus from '../assets/icons/ai/bus.png';
import Walk from '../assets/icons/ai/walk.png';
import Car from '../assets/icons/ai/car.png';
import Cost from '../assets/icons/ai/cost.png';
import Arrow from '../assets/icons/ai/arrow.png';

const BigWrapper = styled.View`
    display: flex;
    gap: 8px;
    width: 343px;
    margin-left: 5px;
    border-left-width: 1px;
    border-left-color: #AAAAAA;
    border-left-style: dashed;
`

const WrapperContainer = styled.View`
    display: flex;
    gap: 8px;
    margin-left: 8px;
`

const Wrapper = styled.View`
    margin-left: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Location = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
    margin-left: 8px;
`

const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const From = styled.Text`
    font-size: 12px;
    font-family: 'SUIT-Regular';
    color: #AAAAAA;
`

const To = styled.Text`
    font-size: 12px;
    font-family: 'SUIT-Medium';
    color: #838383;
`

const ArrowImg = styled(Image)`
    width: 7px;
    height: 6px;
    margin: 0 7px;
`

const TransportIcon = styled(Image)`
    width: 12px;
    height: 12px;
    margin-right: 3px;
`

const Transport = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-SemiBold';
    color: #838383;
    width: 46px;
`
const Duration = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-SemiBold';
    color: #838383;
`

const Line = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-SemiBold';
    color: #AAAAAA;
    margin: 0 3px;
`

const MoneyImg = styled(Image)`
    width: 14px;
    height: 14px;
    margin-right: 4px;
`

const Money = styled.Text`
    font-size: 12px;
    font-family: 'SUIT-Bold';
    color: #999999;
`

const AiTransport = ({ from, to, options }) => {

    return (
        <BigWrapper>
            <Location>
                <From>{from}</From>
                <ArrowImg source={Arrow}/>
                <To>{to}</To>
            </Location>        
            {options && options.map((data, index) => {
                return (
                    <WrapperContainer key={index}>
                        <Wrapper>
                            <RowWrapper>
                                {
                                    data.mode==='도보' ? <TransportIcon source={Walk}/>
                                    :data.mode==='버스' ? <TransportIcon source={Bus}/>
                                    :data.mode==='고속버스' ? <TransportIcon source={Bus}/>
                                    :<TransportIcon source={Car}/>
                                }
                                <Transport>{data.mode}</Transport>
                                <Line>|</Line>
                                <Duration>{data.duration}</Duration>
                            </RowWrapper>
                            {data.cost !== undefined && (
                                <RowWrapper>
                                    <MoneyImg source={Cost} />
                                    <Money>{data.cost.toLocaleString()}원</Money>
                                </RowWrapper>                         
                            )}
                        </Wrapper>                        
                    </WrapperContainer>
                )
            })}
    </BigWrapper>
    )
}

export default AiTransport
