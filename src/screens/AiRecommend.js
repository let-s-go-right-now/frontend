import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { BlackButton, AiConditionBlack } from '../components';
import AiDetail from './AiDetail';
import heartWhite from '../assets/icons/ai/heart_white.png';
import moneyBlack from '../assets/icons/ai/money_black.png';
import transportBlack from '../assets/icons/ai/transport_black.png';
import { axiosInstance } from '../utils';

const AiRecommend = ({ navigation, route }) => {
    const { travelInfo } = route.params.state;
    console.log('전달받은 travelInfo',travelInfo);
    const [tripData, setTripData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRecommend = async () => {
        setLoading(true);
        console.log('요청 보낼 travelInfo',travelInfo);
        try {
            const response = await axiosInstance.post('/api/trips/recommend', {
                startDate: travelInfo.startDate,
                endDate: travelInfo.endDate,
                budget: travelInfo.budget,
                transportMode: travelInfo.transportMode,
                departure: travelInfo.departure,
            })
            console.log('ai 여행 코스 생성 성공:', response);
            console.log('제목', response.data[0].title);
            console.log('이미지 링크', response.data[0].tripImage);
            setTripData(response.data[0]);
            console.log('tripData!!!',response.data[0]);
        } catch (error) {
            console.log('ai 여행 코스 생성 실패:', error.response);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRecommend();
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
            <AiWrapper>
                <AiConditionBlack 
                    date={`${travelInfo.startDate}-${travelInfo.endDate}`}
                    money={travelInfo.budget}
                    location={travelInfo.departure}
                    transport={travelInfo.transportMode}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#000000" marginTop="50%"/>
                ) : (
                    <>
                    <SlideWrapper 
                        onPress={() => {
                            {
                            navigation.navigate("AiDetail", { 
                                travelInfo: travelInfo,
                                tripData: tripData,
                            });
                            }
                        }}
                    >
                        <Img source={{ uri: tripData.tripImage}} />
                        <Top>
                            <Title>{tripData.title}</Title>
                            <Heart source={heartWhite}/>
                        </Top>
                        <RowWrapper>
                            <RowWrapper>
                                <Icon source={moneyBlack} />
                                <BlackText>{tripData.cost > 10000 ? `${Math.floor(tripData.cost/10000)}만원` : `${tripData.cost}원`}</BlackText>
                                <GrayText>/인</GrayText>
                            </RowWrapper>
                            <RowWrapper>
                                <Icon source={transportBlack} />
                                <BlackText>{tripData.transportation}</BlackText>
                            </RowWrapper>
                        </RowWrapper>
                        <Desc>{tripData.description}</Desc>
                    </SlideWrapper>
                    <BlackButton
                        text="새로 추천받기"
                        width={343}
                        style={{
                            alignSelf: 'center',
                            marginBottom: 10,
                        }}
                        onPress={getRecommend}
                    />   
                </>
                )}
            </AiWrapper>
        </View>
    )
}

const AiWrapper = styled.View`
    width: 375px;
`

const SlideWrapper = styled(TouchableOpacity)`
    width: 343px;
    height: 480px;
    padding: 14px;
    margin: 31px auto 29px auto;
    border: 0.5px solid #1D1D1F;
`

const Img = styled(Image)`
    width: 310px;
    height: 300px;
    object-fit: cover;
`

const Top = styled.View`
    display: flex;
    align-items: start;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 11px;
`

const Title = styled.Text`
    font-size: 21px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
    max-width: 258px;
`

const Heart = styled(Image)`
    height: 26px;
    width: 26px;
`

const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 13px;
`

const Icon = styled(Image)`
    width: 14px;
    height: 14px;
    margin-right: 3px;
`

const BlackText = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Medium';
    color: #363638;
`

const GrayText = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Regular';
    color: #AAAAAA;
`

const Desc = styled.Text`
    margin-top: 11px;
    font-size: 15px;
    font-family: 'SUIT-Regular';
    color: #4E4E4E;
`

export default AiRecommend
