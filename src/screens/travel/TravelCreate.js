import React, { useState, useCallback, useRef } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, ScrollView, Button } from 'react-native';
import { CustomBottomSheet, MyCalendar, TwoButton } from '../../components';
import {useTabBarVisibility} from '../../utils';
import { theme } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../utils/axiosInstance';

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

    const [invitePopupVisible, setInvitePopupVisible] = useState(false); // 팝업 상태

    const handleCreateTravel = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
    
      if (!token) {
        alert('로그인 상태가 아닙니다.');
        return;
      }
    
      const requestBody = {
        name: travelName,
        introduce: travelIntroduce,
        startDate: selectedDates?.startDate,
        endDate: selectedDates?.endDate,
      };
    
      try {
        const response = await axiosInstance.post('/api/trip', requestBody);
        const tripId = response.data?.result?.tripId;
        if (!tripId) throw new Error('tripId 없음');
    
        // tripId 저장
        await AsyncStorage.setItem('tripId', String(tripId));
    
        // 여기서 초대 링크 생성
        const inviteRes = await axiosInstance.post(`/api/trip/${tripId}/invite`, {});
        if (inviteRes.data.isSuccess) {
          console.log('초대 링크:', inviteRes.data.result.invitelink);
          setInvitePopupVisible(true);
          setTimeout(() => setInvitePopupVisible(false), 3000); // 3초 후 닫기
        } else {
          console.warn('초대 링크 생성 실패:', inviteRes.data.message);
        }
    
    
      } catch (error) {
        console.error('여행 만들기 실패:', error);
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

                            {/* 초대 링크 복사 팝업 */}
                {invitePopupVisible && (
                    <View style={styles.invitePopup}>
                        <Text style={styles.invitePopupTextBold}>멤버 초대 링크가 복사되었습니다</Text>
                        <Text style={styles.invitePopupTextMedium}>친구에게 링크를 공유하세요</Text>
                    </View>
                )}
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
    invitePopup: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: 343,
        height: 61,
        backgroundColor: '#6E6E6E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    invitePopupTextBold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    invitePopupTextMedium: {
        fontSize: 13,
        fontWeight: '500',
        color: '#CCCCCC',
    },
});
