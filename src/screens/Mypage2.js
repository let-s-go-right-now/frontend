import React, { useState, useRef, useEffect, useCallback } from 'react'
import { TextInput, View, Image, TouchableOpacity, Dimensions, Button, Text, PermissionsAndroid, Alert } from 'react-native';
import styled from 'styled-components/native';
import { GrayButton, MiniGrayButton, BlackButton } from '../components';
import DefaultImg from '../assets/icons/user/profile.png';
import Edit from '../assets/icons/user/edit.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomBottomSheet, TwoButton } from '../components';
import { WhiteButton } from '../components';
import CloseGray from '../assets/icons/user/close_gray';
import { launchImageLibrary } from 'react-native-image-picker';
import { axiosInstance } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MypageWrapper = styled.View`
    width: 375px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    margin: 0 auto;
`

const ProfileImg = styled.Image`
    width: 84px;
    height: 84px;
    border-radius: 42px;
    margin: 32px 0 12px 0;
`

const NameWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 18px;
`

const Name = styled.Text`
    font-size: 20px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
`

const NameInput = styled(TextInput)`
    font-size: 20px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
    padding: 0;
    margin: 0;
`

const Wrapper = styled.View`
    width: 343px;
    margin-top: 48px;
    margin-bottom: 20px;
`

const Title = styled.Text`
    font-size: 17px;
    font-family: 'SUIT-ExtraBold';
    color: #1D1D1F;
    margin-bottom: 10px;
`

const Desc = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    color: #969AA3;
`

const Bank = styled.Text`
    color: #363638;
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    background-color: #FBFBFB;
    padding: 18px;
    width: 100%;
`

const BankInput = styled(TextInput)`
    color: #363638;
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    background-color: #FBFBFB;
    padding: 18px;
    width: 100%;
`

const ButtonWrapper = styled.View`
    /* position: absolute;  */
    /* top: 440px; */
    /* bottom: -193px; */
`

const BottomText = styled.Text`
    font-size: 19px;
    color: #1D1D1F;
    font-family: 'SUIT-ExtraBold';
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

const StyledInput = styled(TextInput)`
    font-size: 14px;
    font-family: 'SUIT-Medium';
    max-width: 289px;
`

const Mypage2 = ({ navigation, setIsLogin }) => {
    useEffect(() => {
        navigation.setOptions({
            tabBarVisible: false,
            screenOptions:{ tabBarStyle: { display: 'none' } }
        });

        return () => {
            navigation.setOptions({
                tabBarVisible: true,
                creenOptions:{ tabBarStyle: { display: 'none' } }
            });
        };
    }, [navigation]);
    const height = Dimensions.get('window').height;

    const [isEdit, setIsEdit] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState('');
    const [bank, setBank] = useState('국민은행');
    const [accountNumber, setAccountNumber] = useState('123-45A-678901');
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ['40%'];
    const [topComponentWidth, setTopComponentWidth] = useState(0);
    const [bottom, setBottom] = useState('option');

    const accountNumberRef = useRef(null);
    const bottomSheetRef = useRef(null); 

    const handleEditButton = useCallback(() => {
        setIsEdit(prevState => !prevState);
    }, []);

    const handleBank = (bank) => {
        setBank(bank);
    }

    const handleaccountNumber = (accountNumber) => {
        setAccountNumber(accountNumber);
    }
    
    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setTopComponentWidth(width);
    };


    const openBottomSheet = () => {
        setIsOpen(true);
        // setIsOpen(!isOpen);
    };
    
    const closeBottomSheet = () => {
        setIsOpen(false);
        setBottom('option');
    }

    const handleNameEdit = () => {
        setBottom('name');
    }

    const handleProfileDelete = () => {
        setBottom('delete');
    }

    const handleProfileUpdate = () => {
        setBottom('update');
    }

    const handleName = (name) => {
        setName(name);
    }

    const deleteName = () => {
        setName('');
    }

    const handleLogoutBottom = () => {
        setIsOpen(true);
        setBottom('logout');
    }

    const deleteIdBottom = () => {
        setBottom('deleteId')
        setIsOpen(true);
    }

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
        async (response) => {
            if (response.didCancel) {
                return;
            }
            if (response.errorCode) {
                Alert.alert('사진 변경에서 에러가 발생했습니다.');
                return;
            }
            if (response.assets?.length>0) {
                const formData = new FormData();
                const image = response.assets[0];
                formData.append('profileImgLink', {
                    uri: image.uri,
                    type: image.type || 'image/jpeg',
                    name: image.fileName || 'profile.jpg'
                });
                try {
                    const response = await axiosInstance.put('api/member/profile-image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                    console.log('프로필 사진 변경 성공', response);
                    setIsOpen(false);
                    setImageUri(image.uri);
                } catch(error) {
                    console.log('프로필 사진 변경 에러: ', error.response);
                }
            }
        })
    }
    
    const getInfo = async () => {
        try {
            const response = await axiosInstance.get('api/member/info');
            console.log('getInfo 성공:', response);
            setName(response.data.result.name);
            setImageUri(response.data.result.profileImageLink);
            const [bank, number] = response.data.result.accountNumber.split(' ');
            console.log('bank',bank);
            console.log('number',number);
            setBank(bank);
            setAccountNumber(number);
        } catch(error) {
            console.log('getInfo 실패:', error);
        }
    }

    const changeName = async () => {
        const formData = new FormData();
        formData.append('name', name);
        console.log('이름 변경 formData: ', formData);
        try {
            const response = await axiosInstance.put('api/member/name', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('이름 변경 성공:', response.data);
            setIsOpen(false);
        } catch (error) {
            console.log('이름 변경 에러:', error);
        }
    }

    const handleInfo = async () => {
        const formData = new FormData();
        formData.append('accountNumber', `${bank} ${accountNumber}`);
        console.log('formData:', formData);
        try {
            const response = await axiosInstance.put('api/member/account-number', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log('회원 정보 수정 성공: ', response);
            setIsEdit(false);
        } catch (error) {
            console.log('회원 정보 수정 에러: ', error);
        }
    }

    const deleteImage = async () => {
        try {
            const response = await axiosInstance.delete('api/member/profile-image');
            console.log('사진 삭제 성공: ', response);
            setIsOpen(false);
            getInfo();
        } catch (error) {
            console.log('사진 삭제 실패:', error);
        }
    }
    console.log('props:', {navigation, setIsLogin});

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('api/member/logout');
            console.log('로그아웃 성공: ', response);
            setIsLogin(false);
            if (setIsLogin) {
                setIsLogin(false);
                navigation.navigate('LoginStack');
            } else {
                console.log('setIsLogin이 정의되지 않음');
            }
        } catch (error) {
            console.log('로그아웃 에러: ', error.response);
        }
    }

    const handleDeleteId = async () => {
        try {
            console.log(AsyncStorage.getItem('jwtToken'));
            const response = await axiosInstance.post('api/member/leave');
            console.log('회원탈퇴 성공:', response);
            setIsOpen(false);
            navigation.reset({routes: [{name: 'LoginStack'}]})
        } catch (error) {
            console.log('회원탈퇴 에러:', error);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <>
        <KeyboardAwareScrollView onLayout={onLayout} style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            <MypageWrapper>
                <ProfileImg source={imageUri ? {uri: imageUri} : DefaultImg}/>
                <NameWrapper>
                    <Name>{name}</Name>
                    {isEdit && 
                    <TouchableOpacity onPress={() => openBottomSheet()}>
                        <Image 
                            source={Edit} 
                            style={{width: 20, height: 20}}
                        />
                    </TouchableOpacity>
                    }
                </NameWrapper>
                <GrayButton
                    text={isEdit ? "수정완료" : "수정하기"}
                    width={69}
                    height={31}
                    bgColor="#FBFBFB"
                    fontColor="#838383"
                    fontSize={15}
                    fontWeight="Medium"
                    onPress={() => {
                        if (isEdit) {
                            handleInfo()
                        } else {
                            setIsEdit(true)
                        }
                    }}
                />
                <Wrapper>
                    <Title>정산 시 사용할 계좌</Title>
                    <Desc>착오 없는 정산을 위해, 입력한 정보가 정확한지 확인해주세요</Desc>
                </Wrapper>
                {isEdit ? 
                    <>
                        <BankInput
                            value={bank}
                            onChangeText={(text) => handleBank(text)}
                            onSubmitEditing={() => accountNumberRef.current.focus()}
                            style={{marginBottom: 12}}
                        />
                        <BankInput
                            value={accountNumber}
                            onChangeText={(text) => handleaccountNumber(text)}
                            ref={accountNumberRef}
                        />
                    </>
                    :
                    <>
                        <Bank style={{marginBottom: 12}}>{bank}</Bank>
                        <Bank>{accountNumber}</Bank>                        
                    </>
                }
                <ButtonWrapper>
                    <MiniGrayButton 
                        text="로그아웃"
                        color="#838383"
                        fontSize={15}
                        style={{
                            // marginTop: 128, 
                            marginTop: 100, 
                            marginBottom: 30,
                        }}
                        onPress={handleLogoutBottom}
                    />
                    <MiniGrayButton 
                        text="탈퇴하기"
                        color="#BBBBBB"
                        underline={false}
                        fontSize={15}
                        onPress={deleteIdBottom}
                    />                    
                </ButtonWrapper>
            </MypageWrapper>
        </KeyboardAwareScrollView>
        {isOpen && (
            <CustomBottomSheet 
                ref={bottomSheetRef} 
                onSheetChange={openBottomSheet}
                snapPoints={snapPoints}
                isOpen={isOpen}
            >
                {
                    bottom==='option' ? (
                        <>
                            <BottomText style={{marginBottom: 40}}>프로필 수정하기</BottomText>
                            <BlackButton text="이름 수정" width={343} style={{marginBottom: 18}} onPress={handleNameEdit}/>
                            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                                <WhiteButton text="프로필 사진 교체" width={166.5} onPress={handleImage}/>
                                <WhiteButton text="프로필 사진 삭제" width={166.5} onPress={handleProfileDelete}/>
                            </View>
                        </>                        
                    ) : bottom==='name' ? (
                        <>
                            <BottomText style={{marginBottom: 31}}>이름 수정하기</BottomText>
                            <InputWrapper style={{marginBottom: 31}}>
                                <StyledInput
                                    placeholder="이름을 입력하세요"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={handleName}
                                    value={name}
                                />
                                {name !== '' && <CloseGray onPress={deleteName}/>}
                            </InputWrapper>
                            <TwoButton
                                textLeft="저장"
                                textRight="취소"
                                width={343}
                                onPressLeft={changeName}
                                onPressRight={closeBottomSheet}
                            />
                        </>
                    ) : bottom==='delete' ? (
                        <>
                            <BottomText style={{marginBottom: 112}}>사진을 삭제할까요?</BottomText>
                            <TwoButton
                                textLeft="삭제"
                                textRight="취소"
                                width={343}
                                onPressLeft={deleteImage}
                                onPressRight={closeBottomSheet}
                            />
                        </>
                    ) : bottom==='update' ? (
                        <>
                            
                        </>
                    ) : bottom==='deleteId' ? (
                        <>
                            <BottomText>당장가자 회원에서 탈퇴할까요?</BottomText>
                            <Text style={{color: '#AAAAAA', fontSize: 16, marginTop: 16, marginBottom: 40, fontFamily: 'SUIT-Medium'}}>모든 회원정보 및 여행 기록이 영구 삭제됩니다</Text>
                            <TwoButton
                                textLeft="회원 탈퇴하기"
                                textRight="취소"
                                width={343}
                                onPressLeft={handleDeleteId}
                                onPressRight={closeBottomSheet}
                            />
                        </>
                    ) : bottom==='logout' ? (
                        <>
                            <BottomText style={{marginBottom: 39}}>로그아웃 할까요?</BottomText>
                            <TwoButton
                                textLeft="로그아웃"
                                textRight="취소"
                                width={343}
                                onPressLeft={handleLogout}
                                onPressRight={closeBottomSheet}
                            />
                        </>
                    ) : null
                }
            </CustomBottomSheet>
            )}
        </>
    )
}

export default Mypage2
