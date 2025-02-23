import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { BlackButton } from '../components';
import { TextInput } from 'react-native';
import CloseDarkgray from '../assets/images/close_darkgray.svg';
import CloseGray from '../assets/images/close_gray.svg';

const LoginWrapper = styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
`

const Top = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 343px;
    margin-top: 36px;
`

const Title = styled.Text`
    font-size: 20px;
    font-family: 'SUIT-ExtraBold';
    color: #1D1D1F;
`

const Container = styled.View`
    display: flex;
    width: 343px;
`

const Info = styled.View`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;
`

const Category = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Bold';
    color: #333333;
`

const ErrorMessage = styled.Text`
    font-size: 12px;
    font-family: 'SUIT-SemiBold';
    color: #E06F6F;
`

const InputWrapper = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    height: 50px;
    padding: 12px;
    background-color: #FBFBFB;
`

const StyledInput = styled(TextInput)`
    height: 50px;
    font-size: 14px;
    font-family: 'SUIT-Medium';
    width: 289px;
`

const Login = ({ navigation }) => {
    const [ready, setReady] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const passwordRef = useRef(null);

    const handleEmail = email => {
        setEmail(email);
    }

    const handlePassword = password => {
        setPassword(password);
    }

    const deleteEmail = () => {
        setEmail('');
    }

    const deletePassword = () => {
        setPassword('');
    }

    return (
        <LoginWrapper>
            <Top>
                <Title>로그인</Title>
                <CloseDarkgray onPress={() => navigation.navigate('Main')}/>
            </Top>
            <Container style={{marginTop: 60}}>
                <Info>
                    <Category>이메일</Category>
                    {/* <ErrorMessage>존재하는 이메일이 아닙니다</ErrorMessage> */}
                </Info>
                <InputWrapper>
                    <StyledInput
                        placeholder="example@gmail.com"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={handleEmail}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                    />
                    {email !== '' && <CloseGray onPress={deleteEmail} />}
                </InputWrapper>
            </Container>
            <Container style={{marginTop: 28, marginBottom: 60}}>
                <Info>
                    <Category>비밀번호</Category>
                    {/* <ErrorMessage>비밀번호가 회원정보와 일치하지 않습니다</ErrorMessage> */}
                </Info>
                <InputWrapper>
                    <StyledInput
                        placeholder="8자 이상, 대문자와 특수문자를 포함하세요"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                        onChangeText={handlePassword}
                        ref={passwordRef}
                        value={password}
                    />
                    {password !== '' && <CloseGray onPress={deletePassword} />}
                </InputWrapper>
            </Container>
            <BlackButton 
                text="로그인"
                width={343}
                onPress={() => navigation.navigate('Main')}
                ready={ready}
            />
        </LoginWrapper>
    )
}

export default Login
