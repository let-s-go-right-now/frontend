import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { BlackButton, GrayContainer } from '../components';
import { TextInput } from 'react-native';
import CloseDarkgray from '../assets/icons/user/close_darkgray.svg';
import CloseGray from '../assets/icons/user/close_gray.svg';
import { axiosInstance } from '../utils';
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Login = ({ navigation, setIsLogin }) => {
    const [ready, setReady] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('jwtToken', token);
        } catch (error) {
            console.error('토큰 저장 중 에러 발생:', error);
        }
    };

    const handleLogin = async () => {
        try {
            console.log('Login navigation:', navigation);
            console.log('setIsLogin:', setIsLogin);

            const response = await axiosInstance.post('api/member/login', {
                email: email,
                password: password,
            })
            if (response.status===200) {
                console.log('로그인 성공:', response);
                const token = response.headers.authorization;
                await storeToken(token);
                console.log('jwtToken:', token);
                getName();
                setIsLogin(true);
                console.log(setIsLogin);      
                setTimeout(() => {
                    navigation.navigate('Home');
                }, 500);
            }
        } catch (error) {
            console.log('로그인 에러:', error);
            console.log('error.response.data:', error.response.data);
            if (error.response.data.code==="MEMBER4001") {
                setEmailError(true);
                setPasswordError(false);
            }
            else if (error.response.data.code==="MEMBER4002") {
                setPasswordError(true);
                setEmailError(false);
            }
            else {
                Alert.alert('이메일과 비밀번호를 다시 확인한 후 시도해주세요.')
            }
        }
    }

    const getName = async () => {
        try {
            const response = await axiosInstance.get('api/member/info');
            console.log('getName 성공:', response);
            await AsyncStorage.setItem('name', response.data.result.name);
            console.log('이름 저장 성공', response.data.result.name);
        } catch(error) {
            console.log('getInfo 실패:', error.response);
        }
    }

    useEffect(() => {
        if (email!=='' && password!=='') {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [email, password])

    return (
        <LoginWrapper>
            <Top>
                <Title>로그인</Title>
                <CloseDarkgray onPress={() => navigation.navigate('Main')}/>
            </Top>
            <Container style={{marginTop: 60}}>
                <Info>
                    <Category>이메일</Category>
                    {emailError && <ErrorMessage>존재하는 이메일이 아닙니다</ErrorMessage>}
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
                    {passwordError && <ErrorMessage>비밀번호가 회원정보와 일치하지 않습니다</ErrorMessage>}
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
            {ready ? (
                <BlackButton 
                    text="로그인"
                    width={343}
                    onPress={handleLogin}
                    ready={ready}
                />
            ) : (
                <GrayContainer
                    text="로그인"
                    width={343}
                />              
            )}
        </LoginWrapper>
    )
}

export default Login
