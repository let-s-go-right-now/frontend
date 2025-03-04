import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, Image } from 'react-native';
import MoneyLight from '../assets/icons/spending/money_light.png';
import NextGray from '../assets/icons/spending/next_gray.png';
import { BlackButton } from '../components';
import MoneyDark from '../assets/icons/spending/money_dark.png';
import { ExpenditureList2 } from '../components';

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

const Back = styled.View`
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

const Calculation = () => {
    const [name, setName] = useState('이우경');

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
    ]

    const expenditures = [
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
                        <GraySemiBold>사전에 보낸 돈이 있나요?</GraySemiBold>
                        <Image source={NextGray} />
                    </MidWrapper>
                    <GrayWrapper>
                        <MiniGraySemiBold>프로필을 클릭</MiniGraySemiBold>
                        <MiniGrayMedium>하여 정산을 완료하세요</MiniGrayMedium>
                    </GrayWrapper>
                    <ResWrapper>
                        {CalcResList.map((data) => {
                            return (
                                data.sender === name ? 
                                <SendWrapper key={data.id}>
                                    <RowWrapper>
                                        <Back>
                                            <SendImg source={data.image !== null ? data.image : require('../assets/icons/user/profile.png')} />
                                            <SendName>{data.receiver}</SendName>
                                        </Back>
                                        <Ment>님에게 송금하세요</Ment>
                                    </RowWrapper>
                                    <ResPrice color='#1E5EFF'>{data.amount.toLocaleString()}원</ResPrice>
                                </SendWrapper> :
                                <ReceiveWrapper key={data.id}>
                                    <RowWrapper>
                                        <ReceiveImg source={data.image !== null ? data.image : require('../assets/icons/user/profile.png')} />
                                        <ReceiveName>{data.sender}</ReceiveName>
                                        <Ment>님에게 받으세요</Ment>
                                    </RowWrapper>
                                    <ResPrice color='#FF1E1E'>{data.amount.toLocaleString()}원</ResPrice>
                                </ReceiveWrapper>
                            )
                        })}
                    </ResWrapper>
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
                    />
                </CalcWrapper>                
            )}
        >
        </FlatList>
    )
}

export default Calculation
