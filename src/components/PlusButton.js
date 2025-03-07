import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Plus from '../assets/icons/travel/plus.svg';
import { TouchableOpacity } from 'react-native';

const Container = styled(TouchableOpacity).attrs((props) => ({
    NoBorder: props.NoBorder, // attrs를 사용해 props 전달
}))`
    background-color: #FFFFFF;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 
    gap: 4px;
    border: ${(props) => (props.NoBorder ? 'none' : '1px solid #1D1D1F')};
`;

const Title = styled.Text`
    font-size: 15px;
    color: #1D1D1F;
    font-family: 'SUIT-Bold';
    line-height: 15px;
`;

const PlusButton = ({ text, width, height, onPress, NoBorder = false }) => {
    return (
        <Container width={width} height={height} onPress={onPress} NoBorder={NoBorder}>
            <Plus />
            <Title>{text}</Title>
        </Container>
    );
};

PlusButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    NoBorder: PropTypes.bool, 
};

export default PlusButton;
