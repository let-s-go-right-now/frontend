import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledText = styled.Text`
    color: ${({color}) => color};
    font-size: ${({fontSize}) => fontSize};
    font-family: 'SUIT-Medium';
    text-decoration: ${({underline}) => underline ? 'underline' : 'none'};
`

const MiniGrayButton = ({ text, color = '#838383', underline = true, onPress, fontSize = 13, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <StyledText color={color} underline={underline} fontSize={fontSize}>{text}</StyledText>
        </TouchableOpacity>
    )
}

MiniGrayButton.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    underline: PropTypes.bool,
    onPress: PropTypes.func,
    fontSize: PropTypes.number,
    style: PropTypes.object,
}

export default MiniGrayButton
