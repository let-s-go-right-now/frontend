import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

const InputWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: ${({height}) => height}px;
    width: ${({width}) => width}px;
    background-color: #FBFBFB;
    margin-bottom: 32px;
`

const StyledInput = styled(TextInput)`
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    color: #363638;
    width: 295px;
`

const StyledText = styled.Text`
    font-size: 17px;
    font-family: 'SUIT-SemiBold';
    color: #363638;
`

const MoneyInput = ({ height, width, onDataChange }) => {
    const [money, setMoney] = useState();

    const handleMoney = (newmoney) => {
        console.log('money', newmoney);
        setMoney(newmoney);
        onDataChange(newmoney);
    }

    return (
        <InputWrapper height={height} width={width}>
            <StyledInput 
                placeholder="걷은 금액을 입력하세요"
                placeholderTextColor='#838383'
                placeholderFontFamily="SUIT-Medium"
                keyboardType="number-pad"
                value={money}
                onChangeText={(newmoney) => handleMoney(newmoney)}
            />
            <StyledText>원</StyledText>
        </InputWrapper>
    )
}

MoneyInput.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
}

export default MoneyInput;
