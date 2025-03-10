import React, { useState, useCallback, useRef } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, ScrollView, Button } from 'react-native';
import { CustomBottomSheet, MyCalendar, TwoButton } from '../../components';
import {useTabBarVisibility} from '../../utils';
import { theme } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TravelCreate = ({navigation}) => {
    const [isOpen, setIsOpen] = useState(false); // BottomSheet의 열림/닫힘 상태 관리
    const [topComponentWidth, setTopComponentWidth] = useState(0); // 상단 컴포넌트의 너비 상태
    const bottomSheetRef = useRef(null); 
    const snapPoints = ['70%']; // 첫번째 요소는 가장 처음 보이는 높이, 나머지는 스와이프하면 늘어나는 정도
    const [selectedDates, setSelectedDates] = useState(null); // 선택된 날짜 상태 관리
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    const [travelName, setTravelName] = useState(''); // 여행 이름 상태
    const [travelIntroduce, setTravelIntroduce] = useState(''); // 여행 소개 상태
    
    //tabbar 삭제
useTabBarVisibility(false);

    const openBottomSheet = () => {
        setIsOpen(!isOpen);
        bottomSheetRef.current?.expand();
    };
    
    // 상단 컴포넌트의 크기를 측정
    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setTopComponentWidth(width); // 상단 컴포넌트의 너비 상태 업데이트
    };

    const handleCreateTravel = async () => {
        const token = await AsyncStorage.getItem('jwtToken'); // JWT 토큰 가져오기
    
        if (!token) {
            // 토큰이 없다면 오류 처리
            alert('로그인 상태가 아닙니다.');
            return;
        }
    
        // 여행 생성 API 요청 본문
        const requestBody = {
            name: travelName,
            introduce: travelIntroduce,
            startDate: selectedDates?.startDate,
            endDate: selectedDates?.endDate,
        };
    
        console.log('요청 본문:', requestBody); // 요청 본문 출력
    
        try {
            const response = await axios.post(
                'https://letsgorightnow.shop/api/trip', // API 엔드포인트
                requestBody, // 요청 본문
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`, // JWT 토큰을 Authorization 헤더에 포함
                    },
                }
            );
    
            console.log('서버 응답:', response); // 응답 출력
    
            if (response.status === 200) {
                // 여행 생성 성공 시 처리
                alert('여행이 성공적으로 만들어졌습니다!');
                navigation.navigate('TravelInvite'); // 여행 초대 화면으로 이동
            } else {
                // 실패 시 오류 처리
                alert(`여행 만들기 실패: ${response.data.message}`);
            }
        } catch (error) {
            // 네트워크 오류 등 예외 처리
            console.error('여행 만들기 실패:', error); // 에러 출력
            alert('여행 만들기 중 오류가 발생했습니다.');
        }
    };
    

    // 상위 컴포넌트에서 날짜 선택 완료 버튼 클릭 시 호출되는 함수
    const handleButtonPress = (startDate, endDate) => {
        setSelectedDates({ startDate, endDate });
        setIsOpen(!isOpen);
        bottomSheetRef.current?.expand();
    };

    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear(); // 연도 추출
      const month = String(d.getMonth() + 1).padStart(2, '0'); // 월 추출 (0부터 시작하므로 1을 더하고 2자리로 포맷)
      const day = String(d.getDate()).padStart(2, '0'); // 일 추출 (2자리로 포맷)
      
      return `${year}년 ${month}월 ${day}일`; // 원하는 형식으로 반환
  };
  
  

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        style={styles.travelNameInput} 
                        placeholder="여행 이름을 입력하세요" 
                        placeholderTextColor="#BBBBBB" 
                        value={travelName}
                        onChangeText={setTravelName} 
                    />
                    <View style={styles.dateInputWrapper}>
                        <View>
                            <Text style={styles.sectionText}>출발</Text>
                            <TouchableOpacity 
                                style={styles.dateInput} 
                                onPress={openBottomSheet} 
                            >
                                {selectedDates ? 
                                <Text style={styles.dateText}>{formatDate(selectedDates.startDate)}</Text> : <Text style={styles.datePlaceText}>출발 날짜를 선택하세요</Text>}
                                <Image source={require('../../assets/icons/calender-black.png')} style={styles.calendarIcon} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.sectionText}>도착</Text>
                            <TouchableOpacity 
                                style={styles.dateInput} 
                                onPress={openBottomSheet} 
                            >
                                {selectedDates ? 
                                <Text style={styles.dateText}>{formatDate(selectedDates.endDate)}</Text> : <Text style={styles.datePlaceText}>도착 날짜를 선택하세요</Text>}
                                <Image source={require('../../assets/icons/calender-black.png')} style={styles.calendarIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionText}>어떤 여행인가요?</Text>
                <TextInput style={styles.memoInput} placeholder="메모를 입력하세요" multiline value={travelIntroduce} onChangeText={setTravelIntroduce}/>
                
                <TouchableOpacity style={styles.button} onPress={handleCreateTravel}>
                    <Text style={styles.buttonText}>여행 만들기</Text>
                </TouchableOpacity>
            </ScrollView>

            {isOpen ? (
                <CustomBottomSheet ref={bottomSheetRef} onSheetChange={handleSheetChanges} snapPoints={snapPoints} isOpen={isOpen}>
                    <MyCalendar onButtonPress={handleButtonPress} /> 
                </CustomBottomSheet>
            ) : null}
        </>
    );
};

export default TravelCreate;

const styles = StyleSheet.create({
    topComponent: {
        padding: 10,
        backgroundColor: 'lightgray',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop:-40,
    },
    inputWrapper: {
        flex: 1,
        justifyContent:'center',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    sectionText: {
        fontWeight: 'medium',
        fontSize: 15,
        color: '#1D1D1F',
        marginBottom: 10,
    },
    dateInputWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 15,
        backgroundColor: '#F8F8F8',
        flex: 1,
        paddingLeft:15,
        paddingTop:15,
        margin:-15,
    },
    dateInput: {
        width: 322,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'regular',
        fontSize: 15,
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 15,
        color: '#1D1D1F',
    },
    datePlaceText:{
      color:'#838383',
      fontWeight:'regular',
      fontSize:15,
    },
    calendarIcon: {
        width: 20,
        height: 20,
    },
    memoInput: {
        width: 351,
        height: 140,
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontWeight: 'regular',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    button: {
        width: 351,
        height: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: theme.fonts.extrabold,
        fontSize: 17,
        color: 'white',
    },
    travelNameInput: {
        fontFamily: theme.fonts.extrabold,
        fontSize: 23,
        borderColor: '#BBBBBB',
        height: 50,
        marginBottom: 20,
        marginLeft:-20
    },
});
