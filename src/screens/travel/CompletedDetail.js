import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import {
  BlackButton,
  ImgSlide,
  OpenToggle,
  ProfileImgDump,
  ExpenditureList,
} from "../../components";
import { theme } from '../../theme';
import { FlatList } from 'react-native-gesture-handler';
import { useTabBarVisibility } from '../../utils';
import axiosInstance from '../../utils/axiosInstance';

const CompletedDetail = ({ route, navigation }) => {
  //tabbar 삭제
  useTabBarVisibility(false);

  const { id } = route.params; // 여행 id

  // 각종 상태
  const [loading, setLoading] = useState(true);
  const [travelDetail, setTravelDetail] = useState(null);
  const [expenditures, setExpenditures] = useState([]);
  const [images, setImages] = useState([]);
  const [memberImages, setMemberImages] = useState([]);
  const [dateDiff, setDateDiff] = useState({ nights: 0, days: 0 });
  const [selectedSort, setSelectedSort] = useState("최신순");
  const sortOptions = ["최신순", "오래된순", "적은지출", "많은지출"];
  const [isOpen, setIsOpen] = useState(false);

  // 바텀시트
  const bottomSheetRef = useRef(null);

  // 날짜포맷/차이 구하기
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = String(d.getFullYear()).slice(2);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  const calcDateDiff = (start, end) => {
    if (!start || !end) return { nights: 0, days: 0 };
    const s = new Date(start);
    const e = new Date(end);
    const nights = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return { nights, days: nights + 1 };
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/trip/${id}`);
        const result = res.data?.result;
        setTravelDetail(result);

        // 경비
        if (result.expenses) {
          setExpenditures(
            result.expenses.map(exp => ({
              id: exp.id,
              title: exp.expenseName,
              category: exp.category === 'TRANSPORTATION' ? '교통' : exp.category,
              cost: `${exp.price?.toLocaleString() ?? 0}원`,
              date: formatDate(exp.expenseDate),
            }))
          );
          // 이미지 모으기 (imageUrls 배열 펼치기)
          const allImageUrls = result.expenses
            .flatMap(exp => exp.imageUrls)
            .filter(u => !!u);
          setImages(allImageUrls);
        }

        // 멤버 프로필
        if (result.members) {
          setMemberImages(result.members.map((mem, idx) => ({
            id: idx,
            source: { uri: mem.profileImageLink },
          })));
        }

        // 날짜 차이 계산
        setDateDiff(calcDateDiff(result.startDate, result.endDate));
      } catch (err) {
        Alert.alert('오류', '여행 상세정보를 불러오는 데 실패했습니다');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // 하단(리포트) 이동
  const openBottomSheet = () => {
    navigation.navigate('Report', { completed: true, id: id });
  };
  // 상세 정보(멤버페이지) 이동
  const movePage = () => {
    navigation.navigate("CompletedProfile", { id: id });
  };

  // 이미지 줌인
  const handleImagePress = (index) => {
    navigation.navigate("ImgZoomIn", {
      imageIndex: index,
      images: images, // URL 배열로 전달
    });
  };

  if (loading || !travelDetail) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fbfbfb' }}>
        <Text style={{ color:'#888' }}>로딩 중...</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <>
            {/* 여행 상세 정보 */}
            <View style={styles.travelDetails}>
              <View style={styles.travelInfo}>
                <View style={styles.leftInfo}>
                  <Text style={styles.travelTitle}>
                    {travelDetail.name}
                  </Text>
                  <Text style={styles.travelLong}>
                    {dateDiff.nights}박 {dateDiff.days}일
                  </Text>
                </View>
                <Text style={styles.travelDate}>
                  {formatDate(travelDetail.startDate)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.travelMemo}>
                  {travelDetail.introduce}
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.profileImageContainer}>
                  <ProfileImgDump images={memberImages} />
                </View>
                <TouchableOpacity onPress={movePage} style={styles.manageButton}>
                  <Text style={styles.manageButtonText}>상세보기</Text>
                </TouchableOpacity>
              </View>
              
              <ImgSlide
                images={images}
                itemsToShow={3}
                scale={94}
                style={styles.imgSlide}
                onImagePress={handleImagePress}
              />
            </View>
            {/* 지출 정보 */}
            <View style={styles.expenditure}>
              <View style={styles.expenditureHeader}>
                <View style={styles.expenditureInfo}>
                  <Text style={styles.expenditureLabel}>현재 지출</Text>
                  <Text style={styles.expenditureAmount}>
                    | {Number(travelDetail.totalExpense ?? 0).toLocaleString()}원
                  </Text>
                </View>
                <OpenToggle
                  options={sortOptions}
                  defaultOption={selectedSort}
                  onSelect={setSelectedSort}
                />
              </View>
              {/* 지출 내역 */}
              <View style={styles.expenditureWrap}>
                <ExpenditureList data={expenditures} navigation={navigation} completed={true} />
              </View>
              {/* 지출 리포트 보러가기*/}
              <View style={styles.blackButtonText}>
                <BlackButton text="여행 결과 보기" width={360} height={0} onPress={openBottomSheet} />
              </View>
            </View>
          </>
        }
        data={expenditures}
        keyExtractor={(item, idx) => item.id?.toString() ?? idx.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
    marginTop:-20,
  },
  leftInfo:{
    flexDirection: "row",
  },
  travelTitle: {
    fontFamily: theme.fonts.extrabold,
    color: "#1D1D1F",
    fontSize: 22,
    marginRight:10,
  },
  travelLong: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 17,
    marginTop:3,
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

export default CompletedDetail;
