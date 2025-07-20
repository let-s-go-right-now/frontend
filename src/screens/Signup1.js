import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styled from 'styled-components/native';;
import { BlackButton, GrayContainer, StyledInput } from '../components';
import { TextInput, Keyboard, Dimensions, Alert, Text } from 'react-native';
import CloseDarkgray from '../assets/icons/user/close_darkgray';
import CloseGray from '../assets/icons/user/close_gray';

const SignupWrapper = styled.View`
    width: 100%;
    height: ${({height}) => height}px;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
`

const LineWrapper = styled.View`
    margin-top: 18px;
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 6px;
`

const Line1 = styled.View`
    background-color: ${({ready}) => ready ? '#1D1D1F' : '#F4F4F4'};
    width: 50%;
`

const Line2 = styled.View`
    background-color: #F4F4F4;
    width: 50%;
`

const Top = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 343px;
    margin: 40px 0;
    height: 24px;
`

const Title = styled.Text`
    font-size: 20px;
    font-family: 'SUIT-ExtraBold';
    color: #1D1D1F;
`

const Container = styled.View`
    display: flex;
    width: 343px;
    height: 77px;
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
    height: 15px;
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
    padding: 0 12px;
    background-color: #FBFBFB;
`

const Signup1 = ({ navigation }) => {
    const [ready, setReady] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const height = Dimensions.get('window').height;

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleName = text => setName(text.replace(/\s/g, ''));

    const deleteName = () => {
        setName('');
    }

    const deleteEmail = () => {
        setEmail('');
    }

    const deletePassword = () => {
        setPassword('');
    }

    const handleEmail = text => {
        text = text.replace(/\s/g, ''); // 공백 제거
        setEmail(text);
        const emailCondition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailCondition.test(text) ? '' : '유효한 이메일 주소를 입력하세요.');
    };
    const handlePassword = text => {
        text = text.replace(/\s/g, ''); // 공백 제거
        setPassword(text);
        const passwordCondition =  /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        setPasswordError(passwordCondition.test(text) ? '' : '8자 이상, 대문자와 특수문자를 포함하세요');
    };

    const handleNext = () => {
        if (!setEmail || !setPassword) {
        }
        navigation.navigate('Signup2', {
            name,
            email,
            password,
        })
    }

    useEffect(() => {
        if (name!=='' && email!=='' && password!='' && emailError==='' && passwordError==='') {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [name,email, password, emailError, passwordError])

    return (
        <SignupWrapper style={{ height: height }}>
            <LineWrapper>
                <Line1 ready={ready}></Line1>
                <Line2></Line2>
            </LineWrapper>
            <Top>
                <Title>회원가입</Title>
                <CloseDarkgray onPress={() => navigation.navigate('Main')}/>
            </Top>
            <Container>
                <Info>
                    <Category>이름</Category>
                </Info>
                <InputWrapper>
                    <StyledInput
                        placeholder="이름을 입력하세요"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={handleName}
                        value={name}
                        onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
                    />
                    { name !== '' && <CloseGray onPress={deleteName}/> }
                </InputWrapper>
            </Container>
            <Container style={{marginTop: 28, marginBottom: 28}}>
                <Info>
                    <Category>이메일</Category>
                    {emailError !== null &&
                        <ErrorMessage>{emailError}</ErrorMessage>
                    }
                </Info>
                <InputWrapper>
                    <StyledInput
                        placeholder="example@gmail.com"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={handleEmail}
                        value={email}
                        ref={emailRef}
                        onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
                    />
                    { email !== '' && <CloseGray onPress={deleteEmail}/> }
                </InputWrapper>
            </Container>
            <Container>
                <Info>
                    <Category>비밀번호</Category>
                    {passwordError !== null && 
                        <ErrorMessage>{passwordError}</ErrorMessage>
                    }
                </Info>
                <InputWrapper>
                    <StyledInput
                        placeholder="8자 이상, 대문자와 특수문자를 포함하세요"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                        onChangeText={handlePassword}
                        value={password}
                        ref={passwordRef}
                    />
                    { password !== '' && <CloseGray onPress={deletePassword}/> }
                </InputWrapper>
            </Container>
            {ready ? (
                <BlackButton 
                    text="다음"
                    width={343}
                    onPress={handleNext}
                    ready={ready}
                    style={{ position: 'absolute', bottom: 52 }}
                />                
            ) : (
                <GrayContainer
                    text="로그인"
                    width={343}
                    style={{ position: 'absolute', bottom: 52 }}
                />
            )}
        </SignupWrapper>
    )
}

export default Signup1
