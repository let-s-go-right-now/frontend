import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Plus from '../assets/images/plus.svg';

const Container = styled.View`
    background-color: #FFFFFF;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 
    gap: 4px;
    border: 1px solid #1D1D1F;
`

const Title = styled.Text`
    font-size: 15px;
    color: #1D1D1F;
    font-family: 'SUIT-Bold';
    line-height: 15px;
`

const PlusButton = ({ text, width, height }) => {
    return (
        <Container width={width} height={height}>
            <Plus />
            <Title>{text}</Title>
        </Container>
    )
}

PlusButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default PlusButton
