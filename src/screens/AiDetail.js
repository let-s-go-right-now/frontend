import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { AiConditionWhite, DateOptionButton, AiTitle, AiTransport, AiDesc, AiHashtags, AiPlace } from '../components';
import LocationGray  from '../assets/icons/ai/location_gray.png';
import { axiosInstance } from '../utils';
import HeartEmpty from '../assets/icons/ai/heart_gray.png';
import HeartFull from '../assets/icons/ai/heart_full.png';

const Loading = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AiWrapper = styled.ScrollView`
    width: 100%;
`

// 배경부분
const BlackWrapper = styled.View` 
    background-color: #1D1D1F;
`

// 컨텐츠 들어가는 부분
const BlackContainer = styled.View` 
    width: 375px;
    align-items: start;
    padding: 0 12px;
`

const HeaderTitle = styled.Text`
    font-size: 25px;
    font-family: 'SUIT-ExtraBold';
    color: #FFFFFF;
    margin-top: 37px;
    margin-bottom: 16px;
`

const Title = styled.Text`
    font-size: 21px;
    font-family: 'SUIT-Bold';
    color: #1D1D1F;
    margin: 30px 0 0 0;
`

const Main = styled.View`
    width: 375px;
    padding: 0 14px;
    margin: 0 auto;
`

const Wrapper = styled.View`
    display: flex;
    align-items: center;
    gap: 14px;
`

const LocationWrapper = styled.View`
    display: flex;
    align-items: center;
    gap: 3px;
    flex-direction: row;
    margin-top: 14px;
`

const LocationImg = styled(Image)`
    width: 14.71px;
    height: 14.71px;
`

const LocationText = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-Mdeium';
    color: #838383;
`

const Warning = styled.Text`
    font-size: 12px;
    font-family: 'SUIT-Medium';
    color: #BBBBBB;
    margin: 26px 0 10px 0;
`

const AiDetail = ({ route, navigation }) => {
    const tripData = route.params.tripData;
    const travelInfo = route.params.travelInfo;

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isScraped, setIsScraped] = useState(false);

    const handleDay = (day) => {
        setSelectedDay(day);
        const itinerary = tripData.itinerary.find(item => item.day === day);
        setSelectedItinerary(itinerary);
        console.log('selectedDay:', selectedDay);
    };
    
    console.log('전달받은 tripData', tripData);
    console.log('전달받은 travelInfo', travelInfo);

    const handleScrap = async () => {  
        try {
            const combinedData = {
                ...travelInfo,
                ...tripData
            };
            delete combinedData.tripImage;
            delete combinedData.cost;
            delete combinedData.description;
            console.log('스크랩 요청 보낼 데이터', combinedData);
            const response = await axiosInstance.post('api/scrap', {
                startDate: combinedData.startDate,
                endDate: combinedData.endDate,
                budget: combinedData.budget,
                transportMode: combinedData.transportMode,
                departure: combinedData.departure,
                title: combinedData.title,
                transportation: combinedData.transportation,
                itinerary: combinedData.itinerary,
            });
            console.log('스크랩 성공', response);
            setIsScraped(true);
        } catch (error) {
            console.log('스크랩 실패', error.response);
        }
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <TouchableOpacity onPress={handleScrap}>
                <Image
                    source={isScraped ? HeartFull : HeartEmpty}
                    style={{ width: 26, height: 26, marginRight: 18 }}
                />
            </TouchableOpacity>
            ),
        });
    }, [navigation, isScraped]);

    useEffect(() => {
        setTimeout(() => {
            if (tripData && tripData.itinerary) {
                setSelectedDay('1일차');
                const itinerary = tripData.itinerary.find(item => item.day === '1일차') || { schedule: [] };
                setSelectedItinerary(itinerary);
                console.log('선택된 날의 계획',itinerary);
            }
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <Loading>
                <ActivityIndicator size="large" color="#363638" />
            </Loading>
        );
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
            <AiWrapper>
                <BlackWrapper>
                    <BlackContainer>
                        <HeaderTitle>{tripData.title}</HeaderTitle>
                        <AiConditionWhite 
                            startDate={tripData.itinerary[0].date}
                            endDate={tripData.itinerary[tripData.itinerary.length - 1].date}
                            money={tripData.cost}
                            location={travelInfo.departure}
                            transport={tripData.transportation}
                            style={{
                                marginBottom: 24
                            }}
                        />
                        <View>
                            <FlatList
                                data={tripData.itinerary}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    console.log(item);
                                    return (
                                    <DateOptionButton
                                        key={index}
                                        text={item.day}
                                        date={item.date}
                                        isSelected={selectedDay === item.day}
                                        onPress={() => handleDay(item.day)}
                                        day={item.day}
                                    />                                        
                                    )

                                }}
                            />                            
                        </View>
                    </BlackContainer>
                </BlackWrapper>
                {/* 여행 디테일 */}
                <Main>
                    <Title>{selectedItinerary.title}</Title>
                    {selectedItinerary.schedule.map((data, index) => (
                        <>
                            <AiTitle
                                key={index}
                                time={data.time}
                                location={data.departure}
                            />
                            <Wrapper>
                                {data.events.map((event, index) => {
                                    console.log('event 출력', event);
                                    if (event.from !== "" && event.to !== "" && event.options) {
                                        return (
                                            <AiTransport
                                                key={index}
                                                from={event.from}
                                                to={event.to}
                                                options={event.options}
                                            />
                                        );
                                    } else if (event.location && event.details && event.hashtags) {
                                        return (
                                            <AiHashtags
                                                key={index}
                                                location={event.location}
                                                details={event.details}
                                                cost={event.cost ? event.cost : null}
                                                link={event.link ? event.link : null}
                                                hashtags={event.hashtags}
                                            />
                                        )
                                    } else if (event.location !== null && event.details !== null && !event.cost) {
                                        return (
                                            <AiDesc
                                                key={index}
                                                location={event.location}
                                                details={event.details}
                                            />
                                        )
                                    } else if (event.location !== null && event.details !== null && event.cost !== null) {
                                        return (
                                            <AiPlace
                                                key={index}
                                                location={event.location}
                                                details={event.details}
                                                cost={event.cost}
                                                link={event.link ? event.link : null}
                                                type={event.type ? event.type : null}
                                            />
                                        )
                                    } else {
                                        return (
                                            <></>
                                        )
                                    }
                                }
                            )}
                            </Wrapper>
                        </>
                    ))}
                    {selectedItinerary.destination!==null && (
                        <LocationWrapper>
                            <LocationImg source={LocationGray}/>
                            <LocationText>{selectedItinerary.destination}</LocationText>
                        </LocationWrapper>
                    )}
                    <Warning>
                    *본 정보는 AI를 활용하여 생성되었으며, 정확성과 최신성이 보장되지 않을 수 있으므로 참고용으로만 사용하시기 바랍니다.
                    </Warning>
                </Main>
            </AiWrapper>
        </View>
    )
}

export default AiDetail
