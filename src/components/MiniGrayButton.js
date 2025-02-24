import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledText = styled.Text`
    color: ${({color}) => color};
    font-size: 13px;
    font-family: 'SUIT-Medium';
    text-decoration: ${({underline}) => underline ? 'underline' : 'none'};
`

const MiniGrayButton = ({ text, color = '#838383', underline = true, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <StyledText color={color} underline={underline}>{text}</StyledText>
        </TouchableOpacity>
    )
}

MiniGrayButton.propTyoes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    underline: PropTypes.bool,
    onPress: PropTypes.func,
}

export default MiniGrayButton
