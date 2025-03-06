import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const OptionButton = styled(TouchableOpacity)`
    display: flex;
    flex-direction: row;
    gap: 5px;
    padding: 9px 8px;
    align-items: center;
    background-color: ${({isSelected}) => isSelected ? '#FFFFFF' : '#555555'};
    margin-right: 10px;
    margin-bottom: 24px;
`

const StyledText = styled.Text`
    font-size: 14px;
    font-family: 'SUIT-Bold';
    color: ${({isSelected}) => isSelected ? '#393939' : '#AAAAAA'};
`

const DateText = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-SemiBold';
    color: ${({isSelected}) => isSelected ? '#393939' : '#AAAAAA'};
`

const DateOptionButton = ({ text, date, onPress, isSelected, day }) => {
    const dateList = date.split('-');

    return (
        <OptionButton isSelected={isSelected} onPress={() => onPress(day)}>
            <StyledText isSelected={isSelected}>{text}</StyledText>
            <DateText isSelected={isSelected}>{dateList[1]}.{dateList[2]}</DateText>
        </OptionButton>
    )
}

DateOptionButton.propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool,
}

export default DateOptionButton
