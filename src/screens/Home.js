import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image } from 'react-native';
import { theme } from '../theme';
import {AiInput, AiButton,TravelCard,BorderWhiteButton, CustomBottomSheet, MyCalendar, AiInputButton} from '../components'
import carrierImage from '../assets/icons/main/carrier01.png';
import moneyIcon from '../assets/icons/main/money-icon.png';
import calenderIcon from '../assets/icons/main/calender-icon.png';
import mapIcon from '../assets/icons/main/map-icon.png';
import TransportIcon from '../assets/icons/main/TransportIcon.png';
import handleIcon from '../assets/icons/main/handleIcon.png';
import nextButton from '../assets/icons/main/nextButton.png';

const Home = ({navigation}) => {
  const [isPressed, setIsPressed] = useState(false);
      const [isOpen, setIsOpen] = useState(false); // BottomSheet의 열림/닫힘 상태 관리
      const [topComponentWidth, setTopComponentWidth] = useState(0); // 상단 컴포넌트의 너비 상태
      const bottomSheetRef = useRef(null); 
      const snapPoints = ['70%']; // 첫번째 요소는 가장 처음 보이는 높이, 나머지는 스와이프하면 늘어나는 정도
      const [selectedDates, setSelectedDates] = useState(null); // 선택된 날짜 상태 관리
      const handleSheetChanges = useCallback((index) => {
          console.log('handleSheetChanges', index);
      }, []);

  const [travelInfo, setTravelInfo] = useState({
    itinerary: '',
    budget: '',
    StartPlace: '',
    transportInfo: '',
  });

  const handleChange = (field, value) => {
    setTravelInfo(prevState => ({ ...prevState, [field]: value }));
  };
  
  const [travelData, setTravelData] = useState([
    {
      id: '1',
      title: '부산바캉스',
      days: 3,
      cost: 98,
      image: require('../assets/icons/main/exImage.png'),
      profileImage: require('../assets/icons/main/ProfileImage.png'),
      participant: '김보영',
      extraCount: 2,
      startDate: '24.08.12',
    },
    {
      id: '2',
      title: '부산바캉스',
      days: 3,
      cost: 98,
      image: require('../assets/icons/main/exImage.png'),
      profileImage: require('../assets/icons/main/ProfileImage.png'),
      participant: '김보영',
      extraCount: 2,
      startDate: '24.08.12',
    },
    {
      id: '3',
      title: '부산바캉스',
      days: 3,
      cost: 98,
      image: require('../assets/icons/main/exImage.png'),
      profileImage: require('../assets/icons/main/ProfileImage.png'),
      participant: '김보영',
      extraCount: 2,
      startDate: '24.08.12',
    },
  ]);
  

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0'); // 월
    const day = String(d.getDate()).padStart(2, '0'); // 일
    return `${month}.${day}`; // 'MM.DD' 형식 반환
  };

  // 상위 컴포넌트에서 날짜 선택 완료 버튼 클릭 시 호출되는 함수
  const handleButtonPress = (startDate, endDate) => {
    // 날짜가 유효한지 체크하고, 유효하지 않으면 빈 문자열 설정
    const formattedStartDate = startDate ? formatDate(startDate) : '';
    const formattedEndDate = endDate ? formatDate(endDate) : '';
  
    // 선택된 날짜를 상태에 반영
    setSelectedDates({ startDate: formattedStartDate, endDate: formattedEndDate });
  
    // travelInfo.itinerary에 날짜가 있으면 날짜 범위로, 없으면 빈 문자열 설정
    setTravelInfo(prevState => ({
      ...prevState,
      itinerary: formattedStartDate && formattedEndDate ? `${formattedStartDate}-${formattedEndDate}` : ''
    }));
  
    // BottomSheet 상태 변경
    setIsOpen(!isOpen);
    bottomSheetRef.current?.expand();
  };
  

  return (<>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.titleContainer}>
            <Image source={carrierImage} style={styles.titleImage} />
            <Text style={styles.title}>지금 당장 떠나는 여행</Text>
          </View>
          <Text style={styles.subtitle}>계획부터 정산까지, 한번에 해결하세요</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('TravelCreate')} >
          <Text style={styles.profileButtonText}>여행만들기</Text>
        </TouchableOpacity>
      </View>

      {/* AI 여행 계획 */}
      <View style={styles.aiPlanContainer}>
        <Text style={styles.aiPlanTitle}>AI 여행 계획 짜기</Text>
        <View style={styles.buttonGroup}>
        <AiInput
          label="예산을 알려주세요"
          placeholder="인당 예산"
          value={travelInfo.budget}
          onChangeText={(value) => handleChange('budget', value)}
          icon ={moneyIcon}
        />
        <AiInputButton
          label="일정이 어떻게 되나요?"
          placeholder="여행 기간 선택"
          text={travelInfo.itinerary||"여행 기간 선택"} 
          onChangeText={(value) => handleChange('itinerary', value)}
          icon={calenderIcon}
          onPress={() => setIsOpen(!isOpen)}  // 버튼 클릭 시 BottomSheet 열기
        />


        <AiInput
          label="어디에서 출발하세요?"
          placeholder="출발 지역 선택"
          value={travelInfo.StartPlace}
          onChangeText={(value) => handleChange('StartPlace', value)}
          icon ={mapIcon}
        />
          </View>
          <Text style={styles.aiSubtitle}>이용할 이동수단을 선택하세요</Text>
        <View style={styles.buttonGroup}>
          <View style={styles.aiButtonGroup}>
            <AiButton 
              label="대중교통" 
              icon={TransportIcon} 
              onPress={() => console.log("음식 추천 클릭됨")} 
            />
            <AiButton 
              label="자가용" 
              icon={handleIcon} 
              onPress={() => console.log("교통 정보 클릭됨")} 
              width={78}
            />
          </View>
          <BorderWhiteButton
            isPressed={isPressed}
            onPressIn={() => setIsPressed(true)}  // 버튼이 눌렸을 때
            onPressOut={() => setIsPressed(false)} // 버튼에서 손을 뗄 때
            onPress={() => navigation.navigate('AiRecommend')} // 버튼 클릭 시 동작
          >
            AI 계획 확인하기
          </BorderWhiteButton>
          </View>
      </View>

      {/* 여행 기록 */}
      <View style={styles.travelRecordContainer}>
        <View style={styles.travelHeader}>
          <Text style={styles.travelTitle}>여행 기록</Text>
          <TouchableOpacity>
            <Image source={nextButton} style={styles.nextImage}/>
          </TouchableOpacity>
        </View>
        <FlatList
            data={travelData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TravelCard{...item} />}
            showsHorizontalScrollIndicator={false}
          />
      </View>
    </ScrollView>
    {isOpen ? (
        <CustomBottomSheet ref={bottomSheetRef} onSheetChange={handleSheetChanges} snapPoints={snapPoints} isOpen={isOpen}>
            <MyCalendar onButtonPress={handleButtonPress} /> 
        </CustomBottomSheet>
    ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor:'#FBFBFB' },

  // 상단 컴포넌트
  header: {
    height: 92,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titleContainer: { paddingTop:'0',flexDirection: 'row', alignItems: 'center' }, 
  titleImage: { width: 26, height: 26, marginRight: 8 },
  title: { fontSize: 22, fontFamily: theme.fonts.extrabold },
  subtitle: { fontSize: 13, color: '#838383' },
  profileButton: {
    width: 110,
    height: 37,
    borderRadius: 32,
    backgroundColor: '#1D1D1F',
    justifyContent: 'center',
    alignItems: 'center',
    // iOS 전용 그림자
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 }, // 그림자 방향
  shadowOpacity: 0.3, // 그림자 투명도
  shadowRadius: 4, // 그림자 퍼짐 정도

  // Android 전용 그림자
  elevation: 20, 
  },
  profileButtonText: { fontSize: 15, fontWeight: 'bold', color: 'white' },

  // AI 여행 계획
  aiPlanContainer: {
    width: '100%', 
    height: 220,
    backgroundColor: '#1D1D1F',
    paddingHorizontal: 15,
    flex:1,
    justifyContent: 'center',
  },
  aiPlanTitle: { fontSize: 16, fontFamily: theme.fonts.extrabold, color: 'white', marginBottom: 10 },
  buttonGroup: { flexDirection: 'row',justifyContent: 'space-between', },
  aiButtonGroup: { flexDirection: 'row' }, 
  aiButton: {
    width:89,
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  aiButtonText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  aiSubtitle: {    fontSize: 13,
    fontWeight: 'regular', 
    color: '#E8E8E8',
    marginTop: 15,
    marginBottom: 10,
  },
  aiLastButton: {
    width:130,
    height:37,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  aiLastButtonText: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  // 여행 기록
  travelRecordContainer: { height: 342, paddingHorizontal: 20, marginTop: 20, },
  travelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  travelTitle: { fontSize: 20, fontWeight: 'bold' },

  nextImage:{width:30.16, height:13.74},

    // FlatList 카드 스타일
    travelCard: {
      width: 232,
      height: 232,
      backgroundColor: 'white',
      borderColor: '#1D1D1F',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    cardText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});

export default Home;
