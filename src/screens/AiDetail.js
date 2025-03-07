import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { AiConditionWhite, DateOptionButton, AiTitle, AiTransport, AiDesc, AiHashtag, AiPlace } from '../components';
import LocationGray  from '../assets/icons/ai/location_gray.png';

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

const AiDetail = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleDay = (day) => {
        setSelectedDay(day);
        const itinerary = AiDetailData.itinerary.find(item => item.day === day);
        setSelectedItinerary(itinerary);
        console.log('selectedDay1:', selectedDay);
    };
    
    const AiDetailData = {
        startDate: "2025-12-12",
        endDate: "2025-12-14",
        budget: 500000,
        transportMode: "대중교통",
        departure: "인천광역시",
        
        title: "자연과 전통의 조화, 전주 여행",
        place: "전주 한옥마을",
        description: "전주는 전통과 현대가 어우러진 도시로, 한옥마을과 맛있는 전통 음식으로 유명합니다.",
        transportation: "자동차",
        cost: 350000,
        tripImage: "https://places.googleapis.com/v1/places/ChIJS73uEmIjcDURjoTQxhu-9I4/photos/AUy1YQ2Jv-ppySvE2xe-hXqg36nQwXRJCTPHY-7Pmtk7RVY3hUa0p2Km69FT1Osqze0LwL2ULAKJ9i410x9nyNv2hoJ4QaDw7BPUlIuziSarzIXdpQQDHuREcMCrh6JIfm-7Z3flXDJkKacawagoJ8hbmzyuxn_cnN21floUUbVogKDKDsmbnq6G_Cmk91Jka1ZuoOZgw_6hosO07x6xE8EXdfmb3i7XtC3Wk3rX8KdlwA-gXQnB_IAQydmYCARHNU34wqGOzbMZWVzBs3ZRxnl0gVVw0vLJ20KQHReg-6cmRc_4hEAn0dYw9SDrRX6Ujrtv5GeHWmwoIVv3q5FVpTAMA7vKjiECqCwfh-dOPXxuzOTSMv92hz7YEbXE19aCLUpIXh_BLxzbqIgQqrPbIzaFa_WFzyu4FuLm/media?key=AIzaSyAK2USRAKtoRv26oAaL4qHGpiTY_wqBNV4&max_height_px=500&max_width_px=500",
        itinerary: [
            {
                day: "1일차",
                date: "2025-04-22",
                title: "전주 한옥마을과 전통 음식 탐방",
                schedule: [
                    {
                        time: "오전",
                        departure: "서울시 압구정동",
                        events: [
                            {
                                location: "압구정동 → 전주",
                                transportOptions: [
                                    {
                                        mode: "자동차",
                                        duration: "3시간",
                                        cost: 50000
                                    }
                                ],
                                details: null,
                                cost: null,
                                link: null,
                                hashtags: null
                            },
                            {
                                location: "전주 한옥마을 입구 근처 식당",
                                transportOptions: null,
                                details: "여행 출발 전, 압구정동에서 간단한 아침 식사를 마치고 전주로 출발하세요.",
                                cost: null,
                                link: null,
                                hashtags: null
                            },
                            {
                                location: "전주 한옥마을",
                                transportOptions: null,
                                details: "전통 한옥 건축물과 골목길이 어우러진 전주 한옥마을을 탐방합니다.",
                                cost: 0,
                                link: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=3f31221a-7b8c-4d4e-9bac-00b69c1e6f06",
                                hashtags: null
                            }
                        ],
                        destination: null
                    },
                    {
                        "time": "오후",
                        "departure": "전주 한옥마을",
                        "events": [
                            {
                                "location": "전주 한옥마을 → 전주 남부시장",
                                "transportOptions": [
                                    {
                                        "mode": "도보",
                                        "duration": "15분",
                                        "cost": null
                                    }
                                ],
                                "details": null,
                                "cost": null,
                                "link": null,
                                "hashtags": null
                            },
                            {
                                "location": "전주 남부시장",
                                "activity": null,
                                "transportOptions": null,
                                "details": "전주 남부시장에서 다양한 전통 음식을 즐기며, 전주 비빔밥과 다양한 전통 음식을 맛봅니다.",
                                "cost": 15000,
                                "link": "https://www.jeonju.go.kr/nambu/planweb/board/view.9is?dataUid=9be517a76c3c2e1b016c3c4c1aac0005&boardUid=9be517a76c3c2e1b016c3c4c1aa40004&contentUid=9be517a74f72e96b014f7325f3e50004",
                                "hashtags": null
                            },
                            {
                                "location": "전주 남부시장 → 전주 경기전",
                                "transportOptions": [
                                    {
                                        "mode": "도보",
                                        "duration": "10분",
                                        "cost": null
                                    }
                                ],
                                "details": null,
                                "cost": null,
                                "link": null,
                                "hashtags": null
                            },
                            {
                                "location": "전주 경기전",
                                "transportOptions": null,
                                "details": "조선 왕조의 역사를 느낄 수 있는 경기전을 방문하여 역사적 유적을 탐방합니다.",
                                "cost": 3000,
                                "link": "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=3d7d4a5e-5f7c-11e2-a1b5-002655c4c745",
                                "hashtags": null
                            }
                        ],
                        destination: null
                    },
                    {
                        time: "저녁",
                        departure: "전주 경기전",
                        events: [
                            {
                                location: "전주 경기전 → 전주 중앙시장",
                                transportOptions: [
                                    {
                                        mode: "도보",
                                        duration: "15분",
                                        cost: null
                                    }
                                ],
                                details: null,
                                cost: null,
                                link: null,
                                hashtags: null
                            },
                            {
                                location: "전주 중앙시장",
                                transportOptions: null,
                                details: "전주 중앙시장에서 저녁 식사로 다양한 지역 특산품과 음식을 즐깁니다.",
                                cost: 20000,
                                link: "https://www.jeonju.go.kr/index.9is?contentUid=9be517a74f72e96b014f7325f3e50004",
                                hashtags: null
                            },
                            {
                                location: "전주 중앙시장 → 전주 라한호텔",
                                transportOptions: [
                                    {
                                        mode: "자동차",
                                        duration: "10분",
                                        cost: 5000
                                    }
                                ],
                                details: null,
                                cost: null,
                                link: null,
                                hashtags: null
                            },
                            {
                                location: "전주 라한호텔",
                                transportOptions: null,
                                details: "전주 한옥마을 근처에 위치한 호텔로, 깔끔한 시설과 편안한 휴식을 제공합니다.",
                                cost: 100000,
                                link: "https://www.lahanhotels.com/jeonju/",
                                hashtags: null
                            }
                        ],
                        destination: "전주 라한호텔"
                    }
                ]
            },
            {
                day: "2일차",
                date: "2025-04-23",
                title: "전주의 자연과 문화 탐방",
                schedule: [
                    {
                        time: "오전",
                        departure: "전주 라한호텔",
                        events: [
                            {
                                location: "전주 라한호텔 → 전주 덕진공원",
                                transportOptions: [
                                    {
                                        mode: "자동차",
                                        duration: "15분",
                                        cost: 5000
                                    }
                                ],
                                details: null,
                                cost: null,
                                link: null,
                                hashtags: null
                            },
                            {
                                location: "전주 덕진공원",
                                transportOptions: null,
                                details: "아름다운 자연을 감상할 수 있는 덕진공원에서 산책과 휴식을 취합니다.",
                                cost: 0,
                                link: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=3f31221a-7b8c-4d4e-9bac-00b69c1e6f06",
                                hashtags: null
                            }
                        ],
                        destination: null
                    },
                    {
                        time: "오후",
                        departure: "전주 덕진공원",
                        events: [
                            {
                                location: "전주 덕진공원 → 전주 향교",
                                transportOptions: [
                                    {
                                        mode: "자동차",
                                        duration: "10분",
                                        cost: 3000
                                    }
                                ],
                                details: null,
                                cost: null,
                                link: null,
                                hashtags: null
                            },
                            {
                                location: "전주 향교",
                                transportOptions: null,
                                details: "전주 향교에서 전통 교육과 문화의 역사를 배우며 유적지를 탐방합니다.",
                                cost: 2000,
                                link: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=3f31221a-7b8c-4d4e-9bac-00b69c1e6f06",
                                hashtags: null
                            },
                            {
                                location: "전주 향교 → 전주 비빔밥 거리",
                                transportOptions: [
                                    {
                                        mode: "자동차",
                                        duration: "15분",
                                        cost: 5000
                                    }
                                ],
                                details: null,
                                cost: null,
                                link: null,
                                hashtags: null
                            },
                            {
                                location: "전주 비빔밥 거리",
                                transportOptions: null,
                                details: "전주의 대표 음식인 비빔밥을 즐기며 여행을 마무리합니다.",
                                cost: 15000,
                                link: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=3f31221a-7b8c-4d4e-9bac-00b69c1e6f06",
                                hashtags: null
                            }
                        ],
                        destination: null
                    },
                    {
                        time: "저녁",
                        departure: "전주 비빔밥 거리",
                        events: [
                            {
                                location: "전주 → 서울시 압구정동",
                                transportOptions: [
                                    {
                                        mode: "자동차",
                                        duration: "3시간",
                                        cost: 50000
                                    }
                                ],
                                details: null,
                                cost: null,
                                link: null,
                                hashtags: null
                            }
                        ],
                    destination: "서울시 압구정동"
                }
                ]
            },
        ]
    }
    useEffect(() => {
        setTimeout(() => {
            if (AiDetailData && AiDetailData.itinerary) {
                setSelectedDay('1일차');
                const itinerary = AiDetailData.itinerary.find(item => item.day === '1일차') || { schedule: [] };
                setSelectedItinerary(itinerary);
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
                        <HeaderTitle>{AiDetailData.title}</HeaderTitle>
                        <AiConditionWhite 
                            startDate={AiDetailData.startDate}
                            endDate={AiDetailData.endDate}
                            money={AiDetailData.budget}
                            location={AiDetailData.departure}
                            transport={AiDetailData.transportMode}
                            style={{
                                marginBottom: 24
                            }}
                        />
                        <View>
                            <FlatList
                                data={AiDetailData.itinerary}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <DateOptionButton
                                        text={item.day}
                                        date={item.date}
                                        isSelected={selectedDay === item.day}
                                        onPress={() => handleDay(item.day)}
                                        day={item.day}
                                    />
                                )}
                            />                            
                        </View>
                    </BlackContainer>
                </BlackWrapper>
                {/* 여행 디테일 */}
                <Main>
                    <Title>{AiDetailData.description}</Title>
                    {selectedItinerary.schedule.map((data) => (
                        <>
                            <AiTitle
                                time={data.time}
                                location={data.departure}
                            />
                            <Wrapper>
                                {data.events.map((event, index) => {
                                    if (event.location !== null && event.transportOptions !== null && event.details === null && event.cost === null && event.link === null && event.hashtags === null) {
                                        return (
                                            <AiTransport
                                                key={index}
                                                location={event.location}
                                                mode={event.transportOptions[0].mode}
                                                duration={event.transportOptions[0].duration}
                                                cost={event.transportOptions[0].cost}
                                            />
                                        );
                                    } else if (event.location !== null && event.details !== null && event.transportOptions===null && event.cost === null && event.link === null && event.hashtags === null) {
                                        return (
                                            <AiDesc
                                                location={event.location}
                                                details={event.details}
                                            />
                                        )
                                    } else if (event.location !== null && event.details !== null && event.cost !== null && event.transportOptions===null && event.hashtags === null) {
                                        return (
                                            <AiPlace
                                                location={event.location}
                                                details={event.details}
                                                cost={event.cost}
                                                link={event.link}
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
                            {data.destination!==null && (
                                <LocationWrapper>
                                    <LocationImg source={LocationGray}/>
                                    <LocationText>{data.destination}</LocationText>
                                </LocationWrapper>
                            )}
                        </>
                    ))}
                    <Warning>
                    *본 정보는 AI를 활용하여 생성되었으며, 정확성과 최신성이 보장되지 않을 수 있으므로 참고용으로만 사용하시기 바랍니다.
                    </Warning>
                </Main>
            </AiWrapper>
        </View>
    )
}

export default AiDetail
