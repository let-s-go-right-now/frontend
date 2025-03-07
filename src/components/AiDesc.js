// location과 details만 존재할 때

import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Wrapper = styled.View`
    padding: 12px 0 12px 8px;
    margin-left: 8px;
    border-left-width: 1px;
    border-left-color: #1D1D1F;
    border-left-style: dashed;
    border-radius: 1px;
    width: 100%;
`

const Title = styled.Text`
    font-size: 19px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
`

const Desc = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Medium';
    color: #363638;
    margin-top: 10px;
`

const AiDesc = ({ location, details }) => {
    return (
        <Wrapper>
            <Title>{location}</Title>
            <Desc>{details}</Desc>
        </Wrapper>
    )
}

AiDesc.propTypes = {
    location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
}

export default AiDesc
