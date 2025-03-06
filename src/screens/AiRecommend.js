import React, { useState, useRef } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import { BlackButton, AiConditionBlack } from '../components';
import AiDetail from './AiDetail';
import heartWhite from '../assets/icons/ai/heart_white.png';
import moneyBlack from '../assets/icons/ai/money_black.png';
import transportBlack from '../assets/icons/ai/transport_black.png';

const AiWrapper = styled.View`
    width: 375px;
`

const SlideWrapper = styled.View`
    width: 343px;
    height: 480px;
    padding: 14px;
    margin: 31px 12px 0 0;
    border: 0.5px solid #1D1D1F;
`

const Img = styled(Image)`
    width: 310px;
    height: 300px;
    object-fit: cover;
`

const Top = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 11px;
`

const Title = styled.Text`
    font-size: 21px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
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
    font-family: 'SUIT-Rehular';
    color: #AAAAAA;
`

const Desc = styled.Text`
    margin-top: 11px;
    font-size: 15px;
    font-family: 'SUIT-Regular';
    color: #4E4E4E;
`

const IndicatorWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 29px;
    gap: 13px;
    margin-bottom: 51px;
`

const Indicator = styled.View`
    width: 8px;
    height: 8px;
    background-color: ${({active}) => active ? '#1D1D1F' : '#EEEEEE'};
`

const AiRecommend = ({ navigation }) => {
    const [date, useDate] = useState('12.12 - 12.14');
    const [money, setMoney] = useState(50);
    const [location, setLocation] = useState('서울시 중동');
    const [transport, setTransport] = useState('대중교통');

    // 슬라이드
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(0);
    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / 355); // 현재 페이지 인덱스 계산
        setCurrentIndex(index);
    }

    const RecommendList = [
        {
            title: "강원도 속초 힐링 여행",
            description: "자연 경관이 아름다운 속초에서 여유로운 시간을 보내기",
            transportation: "자가용",
            cost: 12345,
            itinerary: "",
            imageUrl: require('../assets/icons/ai/sokcho.png'),
        },
        {
            title: "전북 전주 한옥마을 탐방",
            description: "전주의 전통과 현대를 동시에 느낄 수 있는 여행",
            transportation: "자가용",
            cost: 350000,
            itinerary: "",
            imageUrl: require('../assets/icons/ai/sokcho.png'),
        },
        {
            title: "경북 경주 역사 탐험",
            description: "경주에서 역사적인 유적지를 탐방하며 과거로의 여행",
            transportation: "자가용",
            cost: 450000,
            itinerary: "",
            imageUrl: require('../assets/icons/ai/sokcho.png'),
        },
        {
            title: "제주도 자연 속 힐링",
            description: "아름다운 자연 경관을 자랑하는 제주도에서의 힐링 여행",
            transportation: "자가용+렌터카",
            cost: 500000,
            itinerary: "",
            imageUrl: require('../assets/icons/ai/sokcho.png'),
        },
        {
            title: "전남 여수 바다 여행",
            description: "여수에서 바다를 만끽하며 여유롭게 보내는 여행",
            transportation: "자가용",
            cost: 380000,
            itinerary: "",
            imageUrl: require('../assets/icons/ai/sokcho.png'),
        }
    ]

    return (
        <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
            <AiWrapper>
                <AiConditionBlack 
                    date={date}
                    money={money}
                    location={location}
                    transport={transport}
                />
                <FlatList
                    ref={flatListRef}
                    data={RecommendList}
                    horizontal
                    pagingEnabled
                    snapToAlignment='start'
                    snapToInterval={355}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => (
                        <SlideWrapper>
                            <Img source={item.imageUrl} />
                            <Top>
                                <Title>{item.title}</Title>
                                <Heart source={heartWhite}/>
                            </Top>
                            <RowWrapper>
                                <RowWrapper>
                                    <Icon source={moneyBlack} />
                                    <BlackText>{item.cost > 10000 ? `${Math.floor(item.cost/10000)}만원` : `${item.cost}원`}</BlackText>
                                    <GrayText>/인</GrayText>
                                </RowWrapper>
                                <RowWrapper>
                                    <Icon source={transportBlack} />
                                    <BlackText>{item.transportation}</BlackText>
                                </RowWrapper>
                            </RowWrapper>
                            <Desc>{item.description}</Desc>
                        </SlideWrapper>
                    )}
                />
                {/* 인디케이터 */}
                <IndicatorWrapper>
                    {RecommendList.map((_, index) => (
                        <Indicator key={index} active={index===currentIndex} />
                    ))}
                </IndicatorWrapper>
                <BlackButton
                    text="새로 추천받기"
                    width={343}
                    style={{
                        alignSelf: 'center',
                        marginBottom: 10,
                    }}
                />
            </AiWrapper>

        </View>

    )
}

export default AiRecommend
