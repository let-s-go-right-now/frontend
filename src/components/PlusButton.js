import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Plus from '../assets/images/plus.svg';
import { TouchableOpacity } from 'react-native';

const Container = styled(TouchableOpacity)`
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

const PlusButton = ({ text, width, height, onPress }) => {
    return (
        <Container width={width} height={height} onPress={onPress}>
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
