import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { BlackButton, ImgSlide, OpenToggle, PlusButton, ProfileImgDump } from "../components";
import { GeneralOptionButton } from "../components";
import { theme } from '../theme';
import image1 from "../assets/slides/image1.png";
import image2 from "../assets/slides/image2.png";
import image3 from "../assets/slides/image3.png";
import image4 from "../assets/slides/image4.png";
import image5 from "../assets/slides/image5.png";
import image6 from "../assets/slides/image6.png";

const TravelOngoing = () => {
  const [images] = useState([image1, image2, image3, image4, image5, image6]);
  const [itemsToShow] = useState(3); // 한 번에 보여줄 이미지 개수
  const [scale] = useState(94);

  const options = [
    { id: 1, text: "강릉뿌시기" },
    { id: 2, text: "별보러가자" },
    { id: 3, text: "캠핑하러가자" },
    { id: 4, text: "한강피크닉" },
    { id: 5, text: "여수밤바다" },
  ];

  const [selectedId, setSelectedId] = useState(1);

  
  const expenditures = [
    {
      title: "강릉까지 택시",
      category: "교통",
      cost: "12,800원",
      date: "12.22 14:29",
    },
    {
      title: "강릉까지 택시",
      category: "교통",
      cost: "12,800원",
      date: "12.22 14:29",
    },
    {
      title: "강릉까지 택시",
      category: "교통",
      cost: "12,800원",
      date: "12.22 14:29",
    },
    {
      title: "강릉까지 택시",
      category: "교통",
      cost: "12,800원",
      date: "12.22 14:29",
    },
  ];


  //최신순
  const [selectedSort, setSelectedSort] = useState("최신순");

  const sortOptions = ["최신순", "오래된순", "적은지출", "많은지출"];

  return (
    <ScrollView style={styles.container}>
      {/* 옵션 목록 */}
      <View style={styles.optionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScrollContainer}>
          {options.map((item) => (
            <GeneralOptionButton
              key={item.id}
              text={item.text}
              OptionImage={selectedId === item.id ? item.image_clicked : item.image}
              onPress={() => setSelectedId(item.id)}
              isSelected={selectedId === item.id}
              style={styles.optionButton}
            />
          ))}
        </ScrollView>
        {/* 새 여행 떠나기 버튼 */}
        <PlusButton width={130} height={38} text="새 여행 떠나기" onPress={() => {}} style={styles.plusButton} />
      </View>

      {/* 여행 상세 정보 */}
      <View style={styles.travelDetails}>
        <View style={styles.travelInfo}>
          <Text style={styles.travelTitle}>강릉뿌시기 <Text style={styles.travelLong}>2박 3일</Text></Text>
          <Text style={styles.travelDate}>24.12.20</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.travelMemo}>강릉에서 겨울바다 보고 오기!</Text>
          <TouchableOpacity onPress={() => {}} style={styles.finishButton}>
            <Text style={styles.finishButtonText}>여행 끝내기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.profileImageContainer}>
            <ProfileImgDump/>
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.manageButton}>
            <Text style={styles.manageButtonText}>관리하기</Text>
          </TouchableOpacity>
        </View>
        <ImgSlide images={images} itemsToShow={itemsToShow} scale={scale} style={styles.imgSlide} />
      </View>

      {/* 지출 정보 */}
      <View style={styles.expenditure}>
        <View style={styles.expenditureHeader}>
          <View style={styles.expenditureInfo}>
            <Text style={styles.expenditureLabel}>현재 지출</Text>
            <Text style={styles.expenditureAmount}>| 22만원</Text>
          </View>
          <OpenToggle
            options={sortOptions}
            defaultOption={selectedSort}
            onSelect={(option) => setSelectedSort(option)}
          />
        </View>
        <PlusButton onPress={() => {}} text="지출기록 추가하기" width={358} height={42}/>

        {/* 지출 내역 */}
        <ScrollView style={styles.expenditureDetails}>
          {expenditures.map((item, index) => (
            <View key={index} style={styles.expenditureItem}>
              <View style={styles.row}>
                <Text style={styles.expenditureTitle}>{item.title}</Text>
                <Text style={styles.expenditureCategory}>{item.category}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.expenditureCost}>{item.cost}</Text>
                <Text style={styles.expenditureDate}>{item.date}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.blackButtonText}><BlackButton text="지출 리포트 보러가기" width={360} height={0}/></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    marginTop: 30,
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor:'#FBFBFB',

    position:'relative'
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
  travelTitle: {
    fontFamily: theme.fonts.extrabold,
    color: "#1D1D1F",
    fontSize: 22,
  },
  travelLong: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 17,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
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
  blackButtonText: {
    position: "absolute",
    bottom: 0,
  },
});

export default TravelOngoing;
