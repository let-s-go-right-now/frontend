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

const Wrapper = styled.View`
    padding: 5px 0 5px 8px;
    margin-left: 5px;
    border-left-width: 1px;
    border-left-color: #AAAAAA;
    border-left-style: dashed;
    width: 343px;
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

const AiTransport = ({ location, mode, duration, cost }) => {
    const [from, to] = location.split(' → ');

    return (
        <Wrapper>
            <RowWrapper style={{marginBottom: 12}}>
                <From>{from}</From>
                <ArrowImg source={Arrow}/>
                <To>{to}</To>
            </RowWrapper>
            <RowWrapper style={{justifyContent: 'space-between'}}>
                <RowWrapper>
                    {
                        mode==='도보' ? <TransportIcon source={Walk}/>
                        :mode==='버스' ? <TransportIcon source={Bus}/>
                        :mode==='고속버스' ? <TransportIcon source={Bus}/>
                        :<TransportIcon source={Car}/>
                    }
                    <Transport>{mode}</Transport>
                    <Line>|</Line>
                    <Transport>{duration}</Transport>
                </RowWrapper>
                {cost!==null && (
                    <RowWrapper>
                        <MoneyImg source={Cost} />
                        <Money>{cost.toLocaleString()}원</Money>
                    </RowWrapper>                         
                )}
            </RowWrapper>
        </Wrapper>
    )
}

AiTransport.propTypes = {
    location: PropTypes.string.isRequired,
    mode: PropTypes.string,
    duration: PropTypes.string,
    cost: PropTypes.number,
}

export default AiTransport
