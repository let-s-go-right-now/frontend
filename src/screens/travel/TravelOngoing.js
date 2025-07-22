import React, { useState, useCallback, useRef, useEffect,  } from 'react';
import { Image,View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Alert } from "react-native";
import { BlackButton, ImgSlide, OpenToggle, PlusButton, ProfileImgDump, GeneralOptionButton, CustomBottomSheet, TwoButton, ExpenditureList, OptionList } from "../../components";
import { theme } from '../../theme';
import image1 from "../../assets/slides/image1.png";
import image2 from "../../assets/slides/image2.png";
import image3 from "../../assets/slides/image3.png";
import image4 from "../../assets/slides/image4.png";
import image5 from "../../assets/slides/image5.png";
import image6 from "../../assets/slides/image6.png";
import loadImg from "../../assets/loadingOngoing.png";
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../utils/axiosInstance';

const TravelOngoing = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null); 
  const ongoingid = 1;  //현재 진행중인 여행의 id
  const [images, setImages] = useState([]); 
  
  const [itemsToShow] = useState(3); // 한 번에 보여줄 이미지 개수
  const [scale] = useState(94);

  
  const [expenditures,setExpenditures] = useState([])


  //최신순
  const [selectedSort, setSelectedSort] = useState("최신순");

  const sortOptions = ["최신순", "오래된순", "적은지출", "많은지출"];

  //바텀시트
  const [isOpen, setIsOpen] = useState(false); // BottomSheet의 열림/닫힘 상태 관리
  const [topComponentWidth, setTopComponentWidth] = useState(0); // 상단 컴포넌트의 너비 상태
  const bottomSheetRef = useRef(null); 
  const snapPoints = ['35%']; // 첫번째 요소는 가장 처음 보이는 높이, 나머지는 스와이프하면 늘어나는 정도

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = () => {
    setIsOpen(!isOpen);
    bottomSheetRef.current?.expand();
  };

  // 상단 컴포넌트의 크기를 측정
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTopComponentWidth(width); // 상단 컴포넌트의 너비 상태 업데이트
  };
  const closeBottomSheet = () => {
    setIsOpen(false);
  };

  //새여행 떠나기 함수
  const handleCreateTravel = () => {
    navigation.navigate('TravelCreate');
};

  //여행 관리하기
  const handleManageTravel = () => {
    navigation.navigate('TravelManage');
};


  //지출기록하기
  const handleWriteExpense = () => {
    navigation.navigate('WriteExpense');
};
//지출리포트로 이동하기
const MoveExpenseReport = () => {
  navigation.navigate('Report', { completed: false, id: selectedId });
}

  // 이미지 클릭 시 상세 이미지로 이동
  const handleImagePress = (index) => {
    navigation.navigate("ImgZoomInTab", {
      imageIndex: index,
      images: images, // 전체 이미지 배열을 전달
    });
  };
  


  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);

  //진행중인 여행 목록
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          console.log('토큰이 없습니다.');
          return;
        }

        const response = await axiosInstance.get('/api/trip/ongoing');
        const result = response.data;
        console.log('서버 응답:', result);
        if (result.isSuccess) {
          setTravelData(result.result);
          if(result.result.length > 0){
            setSelectedId(result.result[0].id);}
        } else {
          console.error('데이터 가져오기 실패:', result.message);
        }
      } catch (error) {
        console.error('에러 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelData();

    const unsubscribe = navigation.addListener('focus', fetchTravelData);

    return () => {
      unsubscribe();
    };
  }, [navigation]); 

  //특정 여행 id로 보내기
  const [travelDetailData, setTravelDetailData] = useState([]);  
  const [date,setDate] = useState(0);
  const [memberImages,setMemberImages] = useState(); 
  
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = String(d.getFullYear()).slice(2); // 연도의 마지막 두 자리 추출
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
};
const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  const days = timeDifference / (1000 * 3600 * 24);
  return days;
};

//특정 여행 상세 정보 요청
useEffect(() => {
  const fetchTravelData = async () => {
    if (selectedId === null) {
      console.log("selectedId가 null이므로 여행 데이터를 조회하지 않습니다.");
      return;
    }
    try {
      await AsyncStorage.setItem('tripId', selectedId.toString());

      const response = await axiosInstance.get(`/api/trip/${selectedId}`);
      const result = response.data;

      if (result.isSuccess) {
        const expenses = result.result.expenses.map(expense => ({
          title: expense.expenseName,
          category: expense.category === 'TRANSPORTATION' ? '교통' : expense.category,
          cost: `${expense.price.toLocaleString()}원`,
          date: formatDate(expense.expenseDate),
        }));
        const imagesFromExpenses = result.result.expenses.reduce((acc, expense) => {
          return [...acc, ...expense.imageUrls];
        }, []);
        setImages(imagesFromExpenses); 
        setExpenditures(expenses);
        setTravelDetailData(result.result);
        setDate(calculateDays(result.result.startDate, result.result.endDate));
        setMemberImages(result.result.members.map((member, index) => ({
          id: index,
          source: { uri: member.profileImageLink },
        })));
      } else {
        console.error('데이터 가져오기 실패:', result.message);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchTravelData();
}, [selectedId]);




  return (
    <>
        {travelData.length === 0  ? (
      <View style={styles.loadingContainer}>
        <PlusButton width={350} height={38} text="새 여행 떠나기" onPress={handleCreateTravel} style={styles.plusloadingButton} />
        <Image source={loadImg} style={styles.loadingImage} />
      </View>
    ) : (
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <>
            {/* 옵션 목록 */}
            <View style={styles.optionsContainer}>
              <OptionList options={travelData.map((travel) => ({
                  id: travel.id,
                  text: travel.name,
                }))}  containerWidth={200} Buttonwidth={80}
                selectedId={selectedId} 
                setSelectedId={setSelectedId} 
                
                />
              {/* 새 여행 떠나기 버튼 */}
              <PlusButton width={130} height={38} text="새 여행 떠나기" onPress={handleCreateTravel} style={styles.plusButton} />
            </View>

            {/* 여행 상세 정보 */}
            <View style={styles.travelDetails}>
              <View style={styles.travelInfo}>
                <View style={styles.travelTitleWrp}><Text style={styles.travelTitle}>{travelDetailData.name}</Text><Text style={styles.travelLong}>{date}박 {date+1}일</Text></View>
                <Text style={styles.travelDate}>{formatDate(travelDetailData.startDate)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.travelMemo}>{travelDetailData.introduce}</Text>
                <TouchableOpacity onPress={() => {}} style={styles.finishButton}>
                  <Text style={styles.finishButtonText}>여행 끝내기</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <View style={styles.profileImageContainer}>
                  <ProfileImgDump images={memberImages}/>
                </View>
                <TouchableOpacity onPress={handleManageTravel} style={styles.manageButton}>
                  <Text style={styles.manageButtonText}>관리하기</Text>
                </TouchableOpacity>
              </View>
              <ImgSlide images={images} itemsToShow={itemsToShow} scale={scale} style={styles.imgSlide} onImagePress={handleImagePress}  />
            </View>

            {/* 지출 정보 */}
            <View style={styles.expenditure}>
              <View style={styles.expenditureHeader}>
                <View style={styles.expenditureInfo}>
                  <Text style={styles.expenditureLabel}>현재 지출</Text>
                  <Text style={styles.expenditureAmount}>| {travelDetailData.totalExpense}원</Text>
                </View>
                <OpenToggle
                  options={sortOptions}
                  defaultOption={selectedSort}
                  onSelect={(option) => setSelectedSort(option)}
                />
              </View>
                {/* 지출 내역 */}
                
              <PlusButton onPress={handleWriteExpense} text="지출기록 추가하기" width={358} height={42} />
                <View style={styles.expenditureWrap}>
                  <ExpenditureList data={expenditures} navigation={navigation} completed={false}/>
                </View>
                {/* 지출 리포트 보러가기*/}
                <View style={styles.blackButtonText}><BlackButton text="지출 리포트 보러가기" width={360} height={0} onPress={openBottomSheet}/></View>
            </View>
          </>
        }
        data={expenditures}
      />
    )}
    {/*바텀시트*/}
    {isOpen ? (
        <CustomBottomSheet ref={bottomSheetRef} onSheetChange={handleSheetChanges} snapPoints={snapPoints} isOpen={isOpen}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.sheetText}>일정을 모두 마무리 하셨나요?</Text>
            <Text style={styles.sheetText2}>더 이상 지출 기록을 추가할 수 없어요</Text>
            <BlackButton text="여행 끝내고 지출리포트&정산결과 보기" width={343} height={50} onPress={MoveExpenseReport}/>
          </View>
        </CustomBottomSheet>
      ) : null}
          </>
  );
};

const styles = StyleSheet.create({
  loadingContainer:{
    marginTop:20,
    height:370,
    justifyContent: "space-between",
    alignItems: 'center', 
    
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor:'#FBFBFB',
    paddingTop:20,
    position:'relative',
    borderTopColor:'#F4F4F4',
    borderTopWidth:2,
  },
  optionsScrollContainer: {
    width: 200,
    marginRight: 40,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  plusButton: {
    color: "white",
    fontWeight: "medium",
    fontSize: 14,
  },
  travelDetails: {
    marginTop: 20,
  },
  travelInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  travelTitleWrp:{
    flexDirection: 'row',
  },
  travelTitle: {
    fontFamily: theme.fonts.extrabold,
    color: "#1D1D1F",
    fontSize: 22,
  },
  travelLong: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 17,
    marginLeft:20,
    marginTop:2,
  },
  travelDate: {
    fontFamily: "SUIT-SemiBold",
    color: "#999999",
    fontSize: 12,
  },
  travelMemo: {
    fontWeight: "medium",
    color: "#555555",
    fontSize: 15,
    marginBottom: 10,
  },
  finishButton: {
    backgroundColor: "#1D1D1F",
    borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    width:89,
    height:30,
  },
  finishButtonText: {
    color: "white",
    fontWeight: "medium",
    fontSize: 14,

  },
  profileImageContainer: {
    marginBottom: 20,
    marginLeft:8,
    marginRight:8
  },
  manageButton: {
    color: "#838383",
    fontWeight: "medium",
    fontSize: 15,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  manageButtonText: {
    width:69,
    height:31,
    padding:6,
    backgroundColor: '#F7F7F7',
    color: "#838383",
    fontWeight: "medium",
    fontSize: 15,
  },
  expenditure: {
    marginTop: 20,
    alignItems: 'center', justifyContent: 'center',
    
    paddingBottom:50,
   position:"relative"
  },
  expenditureWrap:{
    marginTop:10,
  },
  expenditureHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft:8,
    marginRight:8,
    marginBottom:10,
  },
  expenditureInfo: {
    flexDirection: "row",
    marginBottom: 10,
    width:320,
  },
  expenditureLabel: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#555555",
  },
  expenditureAmount: {
    fontWeight: "medium",
    fontSize: 15,
    color: "#555555",
  },
  sortButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  sortButtonText: {
    fontWeight: "bold",
    color: "#1D1D1F",
  },
  expenditureDetails: {
    marginTop: 10,
  },
  expenditureItem: {
    backgroundColor: "#FFFFFF",
    width:362,
    padding: 10,
    marginBottom: 10,
  },
  expenditureTitle: {
    fontWeight: "bold",
    color: "#363638",
    fontSize: 17,
  },
  expenditureCategory: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 15,
    color: "#838383",
    marginRight:5,
  },
  expenditureCost: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 15,
    color: "#838383",
  },
  expenditureDate: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 12,
    color: "#AAAAAA",
    marginRight:5,
  },
  imgSlide: {
    marginTop: 20,
  },

  bottomSheetContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetText: {
    fontSize: 19,
    fontFamily: theme.fonts.extrabold,
    marginBottom: 10,
    color:'#1D1D1F',
  },
  sheetText2: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 20,
    color:'#838383',
  },
});

export default TravelOngoing;
