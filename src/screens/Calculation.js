import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { FlatList, Image, TouchableOpacity, TouchableWithoutFeedback , KeyboardAvoidingView, ScrollView, Platform, View, Text } from 'react-native';
import MoneyLight from '../assets/icons/spending/money_light.png';
import NextGray from '../assets/icons/spending/next_gray.png';
import { BlackButton, CustomBottomSheet, ProfileSlide, ExpenditureList2, TwoButton, MoneyInput, CopyAccount, CalcStateContainer } from '../components';
import MoneyDark from '../assets/icons/spending/money_dark.png';
import CheckGray from '../assets/icons/spending/check_gray.png';
import CheckBlue from '../assets/icons/spending/check_blue.png';
import Finish from './Finish';
import Clipboard from '@react-native-clipboard/clipboard';

const CalcWrapper = styled.View`
    width: 375px;
    padding: 0 16px;
    margin: 8px auto 0 auto;
    height: 100%;
`

const TopWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 38px;
`

const Bold = styled.Text`
    font-size: 20px;
    font-family: 'SUIT-ExtraBold';
    color: #000000;
`

const MiniRowWrapper = styled.View`
    display: flex;
    align-items: center;
    gap: 3px;
    flex-direction: row;
`

const TotalMoney = styled.Text`
    font-size: 20px;
    font-family: 'SUIT-SemiBold';
    color: #1D1D1F;
`

const MidWrapper = styled.View`
    display: flex;
    align-items: center;
    margin-bottom: 28px;
    flex-direction: row;
`

const GraySemiBold = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    color: #838383;
    margin: 0 2px 0 26px;
`

const GrayWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
    padding: 0 4px;
`

const MiniGraySemiBold = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-SemiBold';
    color: #838383;
`

const MiniGrayMedium = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    color: #AAAAAA;
`

const ResWrapper = styled.View`
    padding: 0 4px;
    gap: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 38px;
`

const SendWrapper = styled.View` 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const RowWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`

const Back = styled(TouchableOpacity)`
    background-color: #F7F7F7;
    border-radius: 6px;
    padding: 10px 8px;
    gap: 6px;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 8px;
`

const SendImg = styled(Image)`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`

const SendName = styled.Text`
    font-size: 17px;
    font-family: 'SUIT-SemiBold';
    color: #1D1D1F;
`

const Ment = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Bold';
    color: #363638;
`

const ResPrice = styled.Text`
    color: ${({color}) => color};
    font-size: 15px;
    font-family: 'SUIT-Bold';
`

const ReceiveWrapper = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const ReceiveImg = styled(Image)`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px;
`

const ReceiveName = styled.Text`
    font-size: 19px;
    font-family: 'SUIT-SemiBold';
    color: #1D1D1F;
    margin-right: 8px;
`

const BottomBold = styled.Text`
    font-size: 19px;
    font-family: "SUIT-ExtraBold";
    color: #1D1D1F;
    margin-bottom: 16px;
`

const BottomDesc = styled.Text`
    font-size: 16px;
    font-family: 'SUIT-Medium';
    color: #AAAAAA;
    margin-bottom: 32px;
    width: 343px;
    margin: 0 auto 32px auto;
    text-align: center;
`

const BlackExtra = styled.Text`
    font-size: 19px;
    font-family: 'SUIT-ExtraBold';
    color: #1D1D1F;
`

const BlueExtra = styled.Text`
    font-size: 19px;
    font-family: 'SUIT-ExtraBold';
    color: #1E5EFF;
`

const AccountWarpper = styled.TouchableOpacity`
    padding: 14px 16px;
    background-color: #FBFBFB;
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 343px;
    justify-content: space-between;
    margin-bottom: 32px;
`

const AccountMent = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
`

const ChackImage = styled(Image)`
    width: 28px;
    height: 28px;
`

const BottomWrapper = styled.View`
    display: flex;
    align-items: center;
`

const CalcStateWrapper = styled.View`
    margin: 28px 0 38px 0;
    display: flex;
    width: 343px;
    display: flex;
    align-items: center;
    gap: 24px;
`

const Calculation = ({ navigation }) => {
    const [name, setName] = useState('이우경');
    
    // 바텀 시트
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ['70%'];
    const bottomSheetRef = useRef(null);
    const [bottom, setBottom] = useState('amount');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedAmount, setSelectAmount] = useState(null);
    const [selectedAccount, setSelectAccount] = useState('국민 123-45A-678901');
    const [clickedAccount, setClickedAccount] = useState(false);

    const openBottomSheet = () => {
        setIsOpen(!isOpen);
        bottomSheetRef.current?.expand();
        setClickedAccount(false);
    };

    const handleAmount = () => {
        setBottom('amount');
        setIsOpen(true);
    }

    const handleAccount = (user, amount) => {
        setBottom('account');
        setSelectedUser(user);
        setSelectAmount(amount);
        setIsOpen(true);
    }

    const handleFinish = () => {
        setBottom('finish');
        setIsOpen(true);
    }

    const copyAccount = () => {
        Clipboard.setString('국민 123-45A-678901');
        setClickedAccount(true);

    }

    const CalcResList = [ // 정산 결과
        {
            id: 1,
            sender: '이우경',
            receiver: '박시우',
            image: require('../assets/icons/user/박시우.png'),
            amount: 518000, // 보내세요
            status: 'progress' 
        },
        {
            id: 2,
            sender: '임서현',
            receiver: '이우경',
            image: require('../assets/icons/user/임서현.png'),
            amount: 8000, // 받으세요
            status: 'progress' 
        },
        {
            id: 3,
            sender: '이우경',
            receiver: '박시우',
            image: require('../assets/icons/user/박시우.png'),
            amount: 518000, // 보냈어요
            status: 'end' 
        },
        {
            id: 4,
            sender: '임서현',
            receiver: '이우경',
            image: require('../assets/icons/user/임서현.png'),
            amount: 8000, // 받았어요
            status: 'end' 
        },
    ]

    const CalcStateList = [ // 정산 현황
        {
            id: 1,
            name: '박시우',
            image: require('../assets/icons/user/박시우.png'),
            settlementStatuses: [
                {
                    status: 'RECEIVED',
                    amount: 28000,
                    relatedMemberName: [
                        '임서현',
                        '이우경',
                    ]
                },
            ],
        },
        {
            id: 2,
            name: '이우경',
            image: require('../assets/icons/user/이우경.png'),
            settlementStatuses: [
                {
                    status: 'RECEIVED',
                    amount: 8000,
                    relatedMemberName: [
                        '임서현',
                    ]
                },
                {
                    status: 'SEND',
                    amount: 18000,
                    relatedMemberName: [
                        '박시우',
                    ]
                },
            ],
        },
        {
            id: 3,
            name: '임서현',
            image: require('../assets/icons/user/임서현.png'),
            settlementStatuses: [
                {
                    status: 'SEND',
                    amount: 32000,
                    relatedMemberName: [
                        '박시우',
                        '이우경',
                    ]
                },
            ],
        },
    ]

    const expenditures = [ // 지출 내역
        {
            id: 1,
            title: '점심 칼국수',
            cost: 27000,
            category: '식사',
            date: '12.22 13:21'
        },
        {
            id: 2,
            title: '택시타고 경포해변 이동',
            cost: 24190,
            category: '교통',
            date: '12.22 11:50'
        },
        {
            id: 3,
            title: '편의점에서 주전부리',
            cost: 12400,
            category: '식사',
            date: '12.22 09:34'
        },
        {
            id: 4,
            title: '점심 칼국수',
            cost: 27000,
            category: '식사',
            date: '12.22 13:21'
        },
        {
            id: 5,
            title: '택시타고 경포해변 이동',
            cost: 24190,
            category: '교통',
            date: '12.22 11:50'
        },
        {
            id: 6,
            title: '편의점에서 주전부리',
            cost: 12400,
            category: '식사',
            date: '12.22 09:34'
        },
        {
            id: 7,
            title: '점심 칼국수',
            cost: 27000,
            category: '식사',
            date: '12.22 13:21'
        },
        {
            id: 8,
            title: '택시타고 경포해변 이동',
            cost: 24190,
            category: '교통',
            date: '12.22 11:50'
        },
        {
            id: 9,
            title: '편의점에서 주전부리',
            cost: 12400,
            category: '식사',
            date: '12.22 09:34'
        },
        {
            id: 10,
            title: '점심 칼국수',
            cost: 27000,
            category: '식사',
            date: '12.22 13:21'
        },
    ]

    return (
        <>
            <FlatList
                style={{ flex: 1, backgroundColor: '#FFFFFF'}}
                data={[1]}
                keyExtractor={(item,index) => index.toString()}
                renderItem={() => (
                    <CalcWrapper>
                        <TopWrapper>
                            <Bold>나의 총 지출액</Bold>
                            <MiniRowWrapper>
                                <Image source={MoneyLight} style={{width: 21, height: 21}}/>
                                <TotalMoney>52만원</TotalMoney>
                            </MiniRowWrapper>
                        </TopWrapper>
                        <MidWrapper>
                            <Bold>정산 결과</Bold>
                            <TouchableOpacity onPress={() => handleAmount()} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <GraySemiBold>사전에 보낸 돈이 있나요?</GraySemiBold>
                                <Image source={NextGray} />
                            </TouchableOpacity>
                        </MidWrapper>
                        <GrayWrapper>
                            <MiniGraySemiBold>프로필을 클릭</MiniGraySemiBold>
                            <MiniGrayMedium>하여 정산을 완료하세요</MiniGrayMedium>
                        </GrayWrapper>
                        <ResWrapper>
                            {CalcResList.map((data) => {
                                return (
                                    data.sender === name && data.status === 'progress' ?
                                    <SendWrapper key={data.id}>
                                        <RowWrapper>
                                            <Back onPress={() => handleAccount(data.receiver, data.amount.toLocaleString())}>
                                                <SendImg source={data.image !== null ? data.image : require('../assets/icons/user/profile.png')} />
                                                <SendName>{data.receiver}</SendName>
                                            </Back>
                                            <Ment>님에게 송금하세요</Ment>
                                        </RowWrapper>
                                        <ResPrice color='#1E5EFF'>{data.amount.toLocaleString()}원</ResPrice>
                                    </SendWrapper> :
                                    data.sender === name && data.status === 'end' ? 
                                    <ReceiveWrapper key={data.id}>
                                        <RowWrapper>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <ReceiveImg source={data.image !== null ? data.image : require('../assets/icons/user/profile.png')} />
                                                <ReceiveName>{data.sender}</ReceiveName>                                                
                                            </View>
                                            <Ment>님에게 송금했어요</Ment>
                                        </RowWrapper>
                                        <ResPrice color='#1E5EFF'>{data.amount.toLocaleString()}원</ResPrice>
                                    </ReceiveWrapper> :
                                    <ReceiveWrapper key={data.id}>
                                        <RowWrapper>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <ReceiveImg source={data.image !== null ? data.image : require('../assets/icons/user/profile.png')} />
                                                <ReceiveName>{data.sender}</ReceiveName>                                                
                                            </View>
                                            <Ment>{data.status==='progress' ? '님에게 받으세요' : '님에게 받았어요'}</Ment>
                                        </RowWrapper>
                                        <ResPrice color='#FF1E1E'>{data.amount.toLocaleString()}원</ResPrice>
                                    </ReceiveWrapper>
                                )
                            })}
                        </ResWrapper>
                        <Bold>정산 현황</Bold>
                        <CalcStateWrapper>
                            {CalcStateList.map((data) => {
                                let receive = 0;
                                let receiver = '';
                                let receiverNum = 0;
                                let send = 0;
                                let sender = '';
                                let senderNum = 0;

                                data.settlementStatuses.forEach((item) => {
                                    if (item.status === "RECEIVED") {
                                        receive = item.amount;
                                        receiver = item.relatedMemberName[0];
                                        receiverNum = item.relatedMemberName.length;
                                    } else {
                                        send = item.amount;
                                        sender = item.relatedMemberName[0];
                                        senderNum = item.relatedMemberName.length;
                                    }
                                })
                                
                                return (
                                    <CalcStateContainer
                                        key={data.id}
                                        name={data.name}
                                        image={data.image}
                                        receive={receive}
                                        receiver={receiver}
                                        receiverNum={receiverNum}
                                        send={send}
                                        sender={sender}
                                        senderNum={senderNum}
                                    />
                                )
                            })}                            
                        </CalcStateWrapper>
                        <Bold>{name}님이 포함된 지출 내역</Bold>
                        <ExpenditureList2 data={expenditures} />
                        <BlackButton 
                            text="정산 완료하기"
                            width={343}
                            ready={false}
                            image={MoneyDark}
                            style={{
                                marginBottom: 10
                            }}
                            onPress={handleFinish}
                        />
                    </CalcWrapper>                
                )}
            >
            </FlatList>
            { isOpen && bottom==='amount' && (
                <CustomBottomSheet
                    ref={bottomSheetRef}
                    snapPoints={['70%']}
                    isOpen={isOpen}
                >
                    <BottomWrapper contentContainerStyle={{ flexGrow: 1 }}>
                        <BottomBold>사전에 보낸 금액을 알려주세요</BottomBold>
                        <BottomDesc>누구에게 얼마를 보냈었나요?</BottomDesc>
                        <ProfileSlide />
                        <MoneyInput
                            height={50}
                            width={320}
                        />
                        <BlackButton
                            text="확인"
                            width={343}
                            height={50}
                            onPress={() => openBottomSheet()}
                            style={{
                                marignTop: 32
                            }}
                        />  
                    </BottomWrapper>
                </CustomBottomSheet>
                )
            }
            { isOpen && bottom==='account' && (
                <CustomBottomSheet
                    ref={bottomSheetRef}
                    snapPoints={['50%']}
                    isOpen={isOpen}
                >
                    <BottomWrapper>
                        <RowWrapper>
                            <BlackExtra>{selectedUser}님에게</BlackExtra>
                            <BlueExtra> {selectedAmount}원 </BlueExtra>
                            <BlackExtra>송금하세요</BlackExtra>
                        </RowWrapper>
                        <BottomDesc style={{marginTop: 16}}>계좌번호 복사 후 송금하고, ‘송금 완료’를 클릭 하세요.</BottomDesc>
                        <AccountWarpper onPress={copyAccount}>
                            <AccountMent>{selectedUser}님의 계좌번호 복사하기</AccountMent>
                            <ChackImage
                                source={clickedAccount ? CheckBlue : CheckGray}
                            />
                        </AccountWarpper>
                            <TwoButton
                                width={349}
                                height={45}
                                textLeft="송금 완료"
                                textRight="취소"
                                onPressLeft={() => openBottomSheet()}
                                onPressRight={() => openBottomSheet()}
                            />
                    </BottomWrapper>
                </CustomBottomSheet>
                )
            }
            { isOpen && bottom==='finish' && (
                <CustomBottomSheet
                    ref={bottomSheetRef}
                    snapPoints={['30%']}
                    isOpen={isOpen}
                >
                    <BottomWrapper>
                        <BottomBold>정산을 완료하시겠어요?</BottomBold>
                            <BlackButton
                                text="여행 종료하기"
                                width={343}
                                height={50}
                                onPress={() => navigation.navigate('Finish')}
                            />
                    </BottomWrapper>
                </CustomBottomSheet>
                )
            }
            {clickedAccount && (
                <CopyAccount
                    name={selectedUser}
                    account={selectedAccount}
                    style={{
                        top: -300
                    }}
                />
            )}
        </>
    )
}

export default Calculation
