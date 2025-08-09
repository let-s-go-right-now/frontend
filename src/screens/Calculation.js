import React, { useState, useRef, useEffect } from 'react';
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
import { axiosInstance } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Calculation = ({ navigation, route }) => {
    const [name, setName] = useState('');
    console.log('route.params',route.params);
    const { id } = route.params;
    console.log('전달받은 id',id); // 여행 id
    const [isSettlementFinish, setIsSettlementFinish] = useState();
    // 바텀 시트
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ['70%'];
    const bottomSheetRef = useRef(null);
    const [myAmount, setMyAmount] = useState(0);
    const [bottom, setBottom] = useState('amount');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedAmount, setSelectAmount] = useState(null);
    const [selectedAccount, setSelectAccount] = useState('국민 123-45A-678901');
    const [clickedAccount, setClickedAccount] = useState(false);
    // 받아오는 데이터들
    const [expenditures, setExpenditures] = useState([]); // 사용자가 포함된 지출 내역
    const [calcStatus, setCalcStatus] = useState([]); // 정산 현황 데이터
    const [calcRes, setCalcRes] = useState([]); // 정산 결과 데이터
    const [members, setMembers] = useState([]);

    // 미리 걷은 금액 데이터
    const [email, setEmail] = useState('');
    const [money, setMoney] = useState();
    console.log('-----------', id, email, money);

    const handleEmail = (newEmail) => {
        setEmail(newEmail);
    }
    
    const handleMoney = (newMoney) => {
        setMoney(newMoney);
    }

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

    // 정산 결과
    const handleCalcResult = async () => {
        try {
            const response = await axiosInstance.get(`/api/settlement/${id}/result`);
            console.log('여행 정산 결과 가져오기 성공??????', response.data);
            setCalcRes(response.data.result.settlementResults);
        } catch (error) {
            console.log('여행 정산 결과 가져오기 에러', error.response);
        }
    }

    // 정산 현황
    const handleCalcStatus = async () => { 
        try {
            const response = await axiosInstance.get(`/api/settlement/${id}/status`);
            console.log('정산 현황 가져오기', response);
            setCalcStatus(response.data.result);
        } catch (error) {
            if (error.status===403) {
                setIsSettlementFinish(false);
            } else {
                console.log('정산 현황 가져오기 에러', error.response);
                setIsSettlementFinish(false);
            }
        }
    }

    // 내가 포함된 지출 내역
    const handleMyExpenditure = async () => {
        try {
            const response = await axiosInstance(`api/expense/${id}/mine?page=0&size=4`);
            console.log('내가 포함된 지출 내역 가져오기 성공', response.data.result);
            setExpenditures(response.data.result);
        } catch (error) {
            console.log('내가 포함된 지출 내역 가져오기 에러', error);
        }
    }

    const getMyAmount = async () => {
        try {
            const response = await axiosInstance.get(`/api/expense/${id}/member-expenses`);
            // 나의 총 지출액
            const name = await AsyncStorage.getItem('name');
            setName(name);
            for (let i=0;i<response.data.result.memberCount;i++) {
                if (response.data.result.memberTotalExpenses[i].memberProfile.name === name) {
                    setMyAmount(response.data.result.memberTotalExpenses[i].amount);
                    console.log('나의 총 지출액', response.data.result.memberTotalExpenses[i].amount);
                    break;
                } else {
                    console.log('나의 총 지출액 에러');
                }
            }
        } catch (error) {
            console.log('나의 총 지출액 에러', error.response);
        }
    }

    const getMember = async () => {
        try {
            const response = await axiosInstance.get(`/api/trip/${id}/trip-member`);
            console.log('여행 멤버 불러오기 성공', response.data.result);
            const members = response.data.result.tripMembers.map((member, index) => ({
                id: index,
                name: member.name,
                leader: index===0,
                image: member.profileImageUrl && { uri: member.profileImageUrl },
                email: member.email
            }));
            setMembers(members);
        } catch (error) {
            console.log('여행 멤버 불러오기 실패', error);
        }
    }

    const handlePrepayment = async () => {
        try {
            console.log('미리 보낸 금액 요청 데이터', email, money);
            console.log(`/api/settlement/${id}/prepayment`);
            const response = await axiosInstance.put(`api/settlement/${id}/prepayment`, {
                receiverEmail: email,
                amount: money,
            });
            console.log('미리 보낸 금액 요청 성공', response);
            openBottomSheet();
        } catch (error) {
            console.log('미리 보낸 금액 요청 실패',error.response);
        }
    }

    useEffect(() => {
        getMyAmount();
        handleCalcResult();
        handleCalcStatus();
        handleMyExpenditure();
        getMember();
    }, [])

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
                                <TotalMoney>{myAmount > 10000 ? `${Math.floor(myAmount/10000)}만원` : `${myAmount}원`}</TotalMoney>
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
                            {calcRes.map((data, index) => {
                                return (
                                    data.sender.name === name && data.settlementStatus === 'PROGRESS' ?
                                    <SendWrapper key={index}>
                                        <RowWrapper>
                                            <Back onPress={() => handleAccount(data.receiver.name, data.amount.toLocaleString())}>
                                                <SendImg source={data.receiver.profileImageUrl !== null ? { uri: data.receiver.profileImageUrl } : require('../assets/icons/user/profile.png')} />
                                                <SendName>{data.receiver.name}</SendName>
                                            </Back>
                                            <Ment>님에게 송금하세요</Ment>
                                        </RowWrapper>
                                        <ResPrice color='#1E5EFF'>{data.amount.toLocaleString()}원</ResPrice>
                                    </SendWrapper> :
                                    data.sender.name === name && data.settlementStatus !== 'PROGRESS' ? 
                                    <ReceiveWrapper key={index}>
                                        <RowWrapper>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <ReceiveImg source={data.receiver.profileImageUrl !== null ? { uri: data.receiver.profileImageUrl } : require('../assets/icons/user/profile.png')} />
                                                <ReceiveName>{data.sender.name}</ReceiveName>
                                            </View>
                                            <Ment>님에게 송금했어요</Ment>
                                        </RowWrapper>
                                        <ResPrice color='#1E5EFF'>{data.amount.toLocaleString()}원</ResPrice>
                                    </ReceiveWrapper> :
                                    <ReceiveWrapper key={index}>
                                        <RowWrapper>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <ReceiveImg source={data.sender.profileImageUrl !== null ? { uri: data.sender.profileImageUrl } : require('../assets/icons/user/profile.png')} />
                                                <ReceiveName>{data.sender.name}</ReceiveName>
                                            </View>
                                            <Ment>{data.settlementStatus==='PROGRESS' ? '님에게 받으세요' : '님에게 받았어요'}</Ment>
                                        </RowWrapper>
                                        <ResPrice color='#FF1E1E'>{data.amount.toLocaleString()}원</ResPrice>
                                    </ReceiveWrapper>
                                )
                            })}
                        </ResWrapper>
                        {isSettlementFinish && (
                            <>
                                <Bold>정산 현황</Bold>
                                <CalcStateWrapper>
                                    {calcStatus.map((data) => {
                                        let receive = 0;
                                        let receiver = '';
                                        let receiverNum = 0;
                                        let send = 0;
                                        let sender = '';
                                        let senderNum = 0;

                                        data.settlementStatuses.forEach((item) => {
                                            if (item && item.status === "RECEIVED") {
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
                                            data.settlementStatuses.length>0 && (
                                                <CalcStateContainer
                                                    key={data.id}
                                                    name={data.tripMemberProfile.name}
                                                    image={data.profileImageUrl}
                                                    receive={receive}
                                                    receiver={receiver}
                                                    receiverNum={receiverNum}
                                                    send={send}
                                                    sender={sender}
                                                    senderNum={senderNum}
                                                />
                                            )
                                        )
                                    })}
                                </CalcStateWrapper>
                            </>
                        )}
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
                        <ProfileSlide members={members} onDataChange={handleEmail}/>
                        <MoneyInput // 미리 보낸 금액 입력창
                            height={50}
                            width={320}
                            onDataChange={handleMoney}
                        />
                        <BlackButton // 미리 보낸 금액 전송 버튼
                            text="확인"
                            width={343}
                            height={50}
                            onPress={() => handlePrepayment()}
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
