import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import locationImg from '../assets/icons/ai/location.png';

const Wrapper = styled.View`
    background-color: #4E4E4E;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    width: 347px;
    height: 39px;
    padding: 8px 12px;
    margin-top: 26px;
    margin-bottom: 12px;
`

const Time = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-ExtraBold';
    color: #1D1D1F;
    background-color: #FFFFFF;
    padding: 5px 7px;
    margin-right: 12px;
`

const Location = styled.Text`
    font-size: 14px;
    font-family: 'SUIT-Mdeium';
    color: #FBFBFB;
`

const Icon = styled(Image)`
    width: 17px;
    height: 17px;
    margin-right: 3px;
`

const AiTitle = ({ time, location }) => {
    return (
        <Wrapper>
            <Time>{time}</Time>
            <Icon source={locationImg}/>
            <Location>{location}</Location>
        </Wrapper>
    )
}

AiTitle.propTypes = {
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
}

export default AiTitle
