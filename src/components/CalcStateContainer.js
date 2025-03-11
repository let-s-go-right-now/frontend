import React from 'react';
import styled from 'styled-components/native';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import profile from '../assets/icons/user/profile.png';

const Container = styled.View`
    width: 100%;
`

const Top = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 18px;
    justify-content: space-between;
`

const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Profile = styled(Image)`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px;
`

const Name = styled.Text`
    font-size: 19px;
    font-family: 'SUIT-SemiBold';
    color: #1D1D1F;
`

const Total = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Bold';
    color: #838383;
    position: relative;
    right: 0;
`

const Receive = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Bold';
    color: #FF1E1E;
    padding-left: 42px;
`

const Send = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Bold';
    color: #1E5EFF;
    padding-left: 42px;
`

const Desc = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    color: #363638;
    padding-left: 42px;
`

const Wrapper = styled.View`
    display: flex;
    gap: 14px;
`

const CalcStateContainer = ({ name, image, receive, receiver, receiverNum, send, sender, senderNum }) => {
    console.log('image?????????',image);
    return (
        <Container>
            <Top>
                <RowWrapper>
                    {image!==undefined ? <Profile source={{uri: image}} />
                    :  <Profile source={profile} />}
                    <Name>{name}</Name>                    
                </RowWrapper>
                <Total>
                    {(receive-send) > 0 ? `+ ${(receive-send).toLocaleString()}원` 
                    : (receive-send) === 0 ? '0원'
                    : `- ${(send-receive).toLocaleString()}원`}
                </Total>
            </Top>
            <Wrapper>
                {/* 받은 금액 */}
                {receiverNum > 0 && (
                    <>
                        <Receive>+ {receive.toLocaleString()}원</Receive>
                        {receiverNum >= 2 ? 
                            <Desc>{receiver} 님 외 {receiverNum-1}명에게 받았어요</Desc>
                            : <Desc>{receiver} 님에게 받았어요</Desc>
                        }
                    </>
                )}
                {/* 보낸 금액 */}
                {senderNum > 0 && (
                    <>
                        <Send>- {send.toLocaleString()}원</Send>
                        {senderNum >= 2 ? 
                            <Desc>{sender} 님 외 {senderNum-1}명에게 보냈어요</Desc>
                            : <Desc>{sender} 님에게 보냈어요</Desc>
                        }
                    </>
                )}                
            </Wrapper>
        </Container>
    )
}

CalcStateContainer.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    receive: PropTypes.number, // 받은 금액
    receiver: PropTypes.string, // 누구에게 받았는지
    send: PropTypes.number, // 보낸 금액
    sender: PropTypes.string, // 누구에게 보냈는지

}

export default CalcStateContainer
