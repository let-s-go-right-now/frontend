import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Wrapper = styled.View`
    background-color: #6E6E6E;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: ${({height}) => height}px;
    width: ${({width}) => width}px;
    align-self: center;
`

const Top = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Bold';
    color: #FFFFFF;
`

const Account = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    color: #AAAAAA;
`

const CopyAccount = ({ name, account, height=61, width=343, style=null }) => {
    return (
        <Wrapper height={height} width={width} style={[style]}>
            <Top>{name}님의 계좌번호를 복사했어요</Top>
            <Account>{account}</Account>
        </Wrapper>
    )
}

CopyAccount.propTypes = {
    name: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    style: PropTypes.object,
}

export default CopyAccount
