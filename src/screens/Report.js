import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { CategoryOptionButton, PieChartComponent, MiniPieChart, BarChartComponent, BlackButton } from '../components';
import CloseGray from '../assets/icons/user/close_gray.png';
import MoneyDark from '../assets/icons/spending/money_dark.png';
import MoneyLight from '../assets/icons/spending/money_light.png';
import PersonDark from '../assets/icons/spending/person_dark.png';
import PersonLight from '../assets/icons/spending/person_light.png';
import Trophy from '../assets/icons/spending/trophy.png';
import profile from '../assets/icons/user/profile.png';
import spark from '../assets/icons/spending/spark.png';
import LinearGradient from 'react-native-linear-gradient';
import { useTabBarVisibility, axiosInstance } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Report = ({ navigation, route }) => {
    useTabBarVisibility(false);
    const { completed, id } = route.params;
    const [mode, setMode] = useState('dark');
    const [isMvp, setIsMvp] = useState(false);
    const [mvpInfo, setMvpInfo] = useState({});
    const [mvpAmount, setMvpAmount] = useState(0);
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [memberData, setMemberData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);
    const [myAmount, setMyAmount] = useState(0);

    const backToTravelongoing = () => {
        navigation.reset({
        index: 0,
        routes: [{ name: completed ? 'TravelCompleted' : 'TravelOngoing' }],
        })
    }

    const handleInfo = async () => {
        try {
            const response = await axiosInstance.get(`/api/expense/${id}/member-expenses`);
            setTotalAmount(response.data.result.totalAmount);
            setMemberCount(response.data.result.memberCount);

            const name = await AsyncStorage.getItem('name');
            response.data.result.memberTotalExpenses.forEach((item) => {
                if (item.memberProfile.name === name) {
                setMyAmount(item.amount);
                }
            })
            if (response.data.result.memberTotalExpenses.length > 0) {
                const [top, second] = response.data.result.memberTotalExpenses;
                if (!second || top.amount > second.amount) {
                setIsMvp(true);
                setMvpInfo(top.memberProfile);
                setMvpAmount(top.amount);
                }
            }
        } catch (error) {
            console.log('회원별 총 지출액 에러', error);
        }
    }

    const handleCategoryReport = async () => {
        try {
            const response = await axiosInstance.get(`api/expense/${id}/category-report`);
            setPieData(response.data.result);
        } catch (error) {
            console.log('handleCategoryReport 실패', error);
        }
    }

    const handleDailyExpense = async () => {
        try {
        const response = await axiosInstance.get(`/api/expense/${id}/daily-expense`);
        setBarData(response.data.result);
        } catch (error) {
        console.log('handleDailyExpense 실패', error);
        }
    }

    const handleMember = async () => {
        const getCategoryId = (id) => {
        switch (id) {
            case 1:
            return 'TRANSPORTATION';
            case 2:
            return 'MEALS';
            case 3:
            return 'SIGHTSEEING';
            case 4:
            return 'SHOPPING';
            case 5:
            return 'ACCOMMODATION';
            default:
            return 'ETC';
        }
    }

        try {
            const response = await axiosInstance.get(
            `/api/expense/${id}/member-category-report?category=${getCategoryId(selectedCategoryId)}`
        )
            setMemberData(response.data.result);
        } catch (error) {
            console.log('handleMember 실패', error);
        }
    }

    const handleSettlement = async () => {
        try {
            await axiosInstance.post(`api/settlement/${id}`);
            navigation.navigate('Calculation', { id });
        } catch (error) {
            console.log('금액 정산 실패', error);
        }
    }

    useEffect(() => {
        handleInfo();
        handleCategoryReport();
        handleDailyExpense();
        handleMember();
        setMode(completed ? 'dark' : 'light');
    }, [])

    return (
        <ContainerWrapper>
            <Container1 mode={mode}>
                <Header mode={mode}>
                    <HeaderTop>
                        <HeaderText mode={mode} fontSize={15}>지출리포트</HeaderText>
                        <TouchableOpacity onPress={backToTravelongoing} style={{ position: 'absolute', right: 16 }}>
                        <Image source={CloseGray} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    </HeaderTop>
                    <HeaderBottom>
                        <HeaderText mode={mode}>총 지출액</HeaderText>
                        <InfoWrapper>
                            <Image source={mode === 'dark' ? MoneyDark : MoneyLight} style={{ marginRight: 3 }} />
                            <HeaderText mode={mode} style={{ marginRight: 9 }}>
                                {totalAmount > 10000 ? `${Math.floor(totalAmount / 10000)}만원` : `${totalAmount}원`}
                            </HeaderText>
                            <PersonWrapper mode={mode}>
                                <Image source={mode === 'dark' ? PersonDark : PersonLight} />
                                <Member mode={mode}>{memberCount}인</Member>
                            </PersonWrapper>
                        </InfoWrapper>
                    </HeaderBottom>
                </Header>
            </Container1>
            <Container2>
                <InfoWrapper style={{ marginTop: 27 }}>
                    <ExtraTitle style={{ marginRight: 20 }}>나의 총 지출액</ExtraTitle>
                    <Image source={MoneyLight} style={{ marginRight: 3 }} />
                    <SemiTitle>{myAmount > 10000 ? `${Math.floor(myAmount / 10000)}만원` : `${myAmount}원`}</SemiTitle>
                </InfoWrapper>
                {pieData.length > 0 && (
                    <>
                        <ExtraTitle style={{ marginTop: 44 }}>
                        {pieData[0].categoryName === 'TRANSPORTATION'
                            ? '교통'
                            : pieData[0].categoryName === 'MEALS'
                            ? '식사'
                            : pieData[0].categoryName === 'SHOPPING'
                            ? '쇼핑'
                            : pieData[0].categoryName === 'SIGHTSEEING'
                            ? '관광'
                            : pieData[0].categoryName === 'ACCOMMODATION'
                            ? '숙소'
                            : '기타'}
                        <Text>에 가장 많이 썼어요</Text>
                        </ExtraTitle>
                        <PieChartComponent pieData={pieData} />
                    </>
                )}
                {barData.length > 0 && <BarChartComponent barData={barData} />}
                <ExtraTitle style={{ marginTop: 60, marginBottom: 24 }}>멤버별 지출을 알려드려요</ExtraTitle>
                    <Option>
                        <CategoryOptionButton
                            style={{ paddingRight: 64 }}
                            selectedOptionId={selectedCategoryId}
                            setSelectedOptionId={setSelectedCategoryId}
                        />
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['rgba(209, 48, 48, 0)', 'rgba(255, 255, 255, 1)']}
                                style={{
                                width: 120,
                                height: 44,
                                position: 'absolute',
                                right: 0,
                                }}
                            />
                    </Option>
                <MiniPieChart memberData={memberData} />
                <MvpWrapper>
                    {isMvp && (
                        <>
                            <InfoWrapper style={{ marginRight: 'auto' }}>
                                <ExtraTitle>지출 MVP</ExtraTitle>
                                <Image source={Trophy} />
                            </InfoWrapper>
                            {mvpInfo.profileImageUrl ? (
                                <Profile source={{ uri: mvpInfo.profileImageUrl }} />
                            ) : (
                                <Profile source={profile} />
                            )}
                            <Name>{mvpInfo.name}</Name>
                            <InfoWrapper>
                                <MvpText>총</MvpText>
                                <MvpText3>{mvpAmount > 10000 ? `${Math.floor(mvpAmount / 10000)}만원` : `${mvpAmount}원`}</MvpText3>
                                <MvpText>지출</MvpText>
                            </InfoWrapper>
                            <InfoWrapper>
                                <MvpText2>이번 여행에서 가장 많이 지출하셨어요</MvpText2>
                                <SparkIcon source={spark} />
                            </InfoWrapper>
                        </>
                    )}
                {mode === 'dark' && (
                    <BlackButton
                        text="금액 정산하기"
                        width={343}
                        image={MoneyDark}
                        style={{
                            marginTop: 53,
                            marginBottom: 10,
                        }}
                        onPress={handleSettlement}
                    />
                )}
                </MvpWrapper>
            </Container2>
        </ContainerWrapper>
    )
}

const ContainerWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`

const Container1 = styled.View`
    width: 100%;
    padding: 0 16px;
    background-color: ${({mode}) => mode==='dark' ? '#1D1D1F' : '#FFFFFF'};
`

const Container2 = styled.View`
    width: 100%;
    padding: 0 16px;
`

const Header = styled.View`
    background-color: ${({mode}) => mode==='dark' ? '#1D1D1F' : '#FFFFFF'};
`

const HeaderTop = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 36px;
    margin-bottom: 12px;
`

const HeaderBottom = styled.View`
    display: flex;
    padding: 16px 0;
    gap: 20px;
    margin-bottom: 17px;
`

const HeaderText = styled.Text`
    color: ${({mode}) => mode==='dark' ? '#FFFFFF' : '#1D1D1F'};
    font-size: ${({fontSize}) => fontSize || 20}px;
    text-align: start;
`

const PersonWrapper = styled.View`
    background-color: ${({mode}) => mode==='dark' ? '#4E4E4E' : '#F7F7F7'};
    border-radius: 1px;
    padding: 4px 6px;
    gap: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const InfoWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`

const Member = styled.Text`
    font-size: 13px;
    color: ${({mode}) => mode==='dark' ? '#AAAAAA' : '#838383'};
`

const ExtraTitle = styled.Text`
    color: #000000;
    font-size: 20px;
    font-family: 'SUIT-ExtraBold';
`

const SemiTitle = styled.Text`
    color: #000000;
    font-size: 20px;
    font-family: 'SUIT-SemiBold';
`

const MvpWrapper = styled.View`
    display: flex;
    align-items: center;
`

const Profile = styled.Image`
    height: 60px;
    width: 60px;
    border-radius: 30px;
    margin: 48px 0 8px 0;
`

const Name = styled.Text`
    font-family: 'SIUT-SemiBold';
    color: #363638;
    font-size: 15px;
    margin-bottom: 20px;
`

const MvpText = styled.Text`
    font-family: 'SIUT-SemiBold';
    color: #363638;
    font-size: 15px;
    margin-bottom: 20px;
`

const MvpText2 = styled.Text`
    font-family: 'SIUT-Medium';
    color: #838383;
    font-size: 15px;
`

const MvpText3 = styled.Text`
    font-family: 'SUIT-ExtraBold';
    color: #363638;
    font-size: 15px;
    margin-bottom: 20px;
`

const SparkIcon = styled.Image`
    width: 16px;
    height: 16px;
    margin-left: 4px;
`

const Option = styled.View`
    position: relative;
`

export default Report
