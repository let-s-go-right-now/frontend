import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TextInput, Dimensions, Image, Alert, PermissionsAndroid } from 'react-native';
import { BlackButton, GrayContainer } from '../components';
import CloseDarkgray from '../assets/icons/user/close_darkgray.svg';
import DefaultImg from '../assets/icons/user/profile.png';
import Edit from '../assets/icons/user/edit.png';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { axiosInstance } from '../utils';
import { useRoute } from '@react-navigation/native';

const SignupWrapper = styled.View`
    width: 100%;
    height: ${({height}) => height}px;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
`

const Line = styled.View`
    background-color: ${({ready}) => ready ? '#1D1D1F' : '#F4F4F4'};
    margin-top: 24px;
    width: 100%;
    height: 6px;
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

const ProfileWrapper = styled.View`
    display: flex;
    align-items: center;
`

const Profile = styled.Image`
    width: 84px;
    height: 84px;
    border-radius: 42px;
`

const EditButton = styled.TouchableOpacity`
    width: 28px;
    height: 28px;
    background-color: #E9E9E9;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
`

const Name = styled.Text`
    font-size: 20px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
    margin: 12px 0 52px 0;
`

const Main = styled.View`
    display: flex;
    width: 343px;
`

const Bold = styled.Text`
    font-family: 'SUIT-SemiBold';
    color: #1D1D1F;
    font-size: 17px;
    margin-bottom: 12px;
`

const Desc = styled.Text`
    font-family: 'SUIT-Medium';
    color: #969AA3;
    font-size: 13px;
`

const StyledInput = styled(TextInput)`
    font-size: 15px;
    font-family: 'SUIT-Medium';
    padding: 18px;
`

const Signup2 = ({ navigation }) => {
    const route = useRoute();
    const { name, email, password } = route.params;
    const [ready, setReady] = useState(false);
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [image, setImage] = useState(null);

    const height = Dimensions.get('window').height;

    const accountNumberRef = useRef(null);

    const handlePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: '사진 접근 권한 요청',
                    message: '프로필 사진을 변경하려면 기기의 사진 및 미디어 파일에 접근해야 합니다.',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('권한이 허용되었습니다.');
            } else {
                console.log('권한이 거부되었습니다.');
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const handleImage = async () => {
        await handlePermission();

        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: false,
        }, 
        response => {
            if (response.didCancel) {
                return;
            }
            if (response.errorCode) {
                Alert.alert('사진 변경에서 에러가 발생했습니다.');
                return;
            }
            if (response.assets?.length>0) {
                const selectedImage = response.assets[0];
                setImage({
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.fileName,
                });
                console.log(selectedImage.uri);
            }
        })
    }

    const handleBank = bank => {
        setBank(bank);
    }

    const handleAccountNumber = accountNumber => {
        setAccountNumber(accountNumber);
    }

    const handleSubmit = async () => {
        if (!image) {
            Alert.alert('프로필 이미지를 업로드하세요');
            return;
        }

        if (!bank) {
            Alert.alert('은행을 입력하세요');
            return;
        }

        if (!accountNumber) {
            Alert.alert('계좌번호를 입력하세요');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('accountNumber', `${bank}${accountNumber}`);

        formData.append('image', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || 'profile.jpg'
        });

        try {
            console.log('회원가입 정보:', formData);
            const response = await axiosInstance.post('api/member/join', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            console.log('회원가입 성공:', response);
            navigation.navigate('Main');
        } catch(error) {
            console.log('회원가입 에러:', error);
        }
    }
    
    useEffect(() => {
        if (bank!=='' && accountNumber!=='' && image!=='') {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [bank, accountNumber, image])

    return (
        <KeyboardAwareScrollView>
            <SignupWrapper height={height}>
                <Line ready={ready}></Line>
                <Top>
                    <Title>회원가입</Title>
                    <CloseDarkgray onPress={() => navigation.navigate('Main')}/>
                </Top>
                <ProfileWrapper>
                    <Profile source={image ? {uri: image.uri} : DefaultImg}/>
                    <EditButton onPress={() => handleImage()}>
                        <Image source={Edit} />
                    </EditButton>
                </ProfileWrapper>
                <Name>{name}</Name>
                <Main>
                    <Bold>
                        정산 시 사용할 계좌정보를 알려주세요
                    </Bold>
                    <Desc>
                        착오 없는 정산을 위해, 입력한 정보가 정확한지 확인해주세요
                    </Desc>
                    <StyledInput
                        placeholder="은행을 입력하세요"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        value={bank}
                        onChangeText={handleBank}
                        onSubmitEditing={() => accountNumberRef.current.focus()}
                        style={{marginTop: 20}}
                    />
                    <StyledInput
                        placeholder="123-45A-678901"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        value={accountNumber}
                        ref={accountNumberRef}
                        onChangeText={handleAccountNumber}
                        style={{marginTop: 12}}
                    />
                </Main>
                {ready ? (
                    <BlackButton 
                        text="완료"
                        width={343}
                        onPress={handleSubmit}
                        ready={ready}
                        style={{ position: 'absolute', bottom: 52 }}
                    />                    
                ): (
                    <GrayContainer
                        text="완료"
                        width={343}
                        style={{ position: 'absolute', bottom: 52 }}
                    />
                )}
            </SignupWrapper>
        </KeyboardAwareScrollView>
    )
}

export default Signup2
