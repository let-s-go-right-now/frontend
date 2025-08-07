import React, { useState, useCallback, useRef } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, FlatList, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { BlackButton, CustomBottomSheet, ImgSlide, ImgSlideUpload, MyCalendar, OptionList, PlusButton, Profile, TwoButton } from '../../components';
import { useTabBarVisibility } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { theme } from '../../theme';
import { launchImageLibrary } from 'react-native-image-picker'; // 이미지 선택 기능 추가
import profileImage1 from "../../assets/profileImgs/profileImg01.png";
import profileImage2 from "../../assets/profileImgs/profileImg02.png";
import profileImage3 from "../../assets/profileImgs/profileImg03.png";
import axiosInstance from '../../utils/axiosInstance';


const WEditExpense = ({ route, navigation }) => {
  useTabBarVisibility(false);
  const { expenditureId } = route.params;
  console.log('expenditureId:', expenditureId);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['70%'];

  // 옵션리스트
  const options = [
    { id: 1, text: "교통", image: require('../../assets/icons/travel/options/TraficIcon.png'), image_clicked: require('../../assets/icons/travel/options/TraficIcon-selected.png') },
    { id: 2, text: "식사", image: require('../../assets/icons/travel/options/FoodIcon.png'), image_clicked: require('../../assets/icons/travel/options/FoodIcon-selected.png') },
    { id: 3, text: "관광", image: require('../../assets/icons/travel/options/AmuseIcon.png'), image_clicked: require('../../assets/icons/travel/options/AmuseIcon-selected.png') },
    { id: 4, text: "쇼핑", image: require('../../assets/icons/travel/options/ShopIcon.png'), image_clicked: require('../../assets/icons/travel/options/ShopIcon-selected.png') },
    { id: 5, text: "숙소", image: require('../../assets/icons/travel/options/RentIcon.png'), image_clicked: require('../../assets/icons/travel/options/RentIcon-selected.png') },
    { id: 6, text: "기타", image: require('../../assets/icons/travel/options/etc.png'), image_clicked: require('../../assets/icons/travel/options/etc-selected.png') },
  ];

  // 카테고리 문자열 -> 옵션 id 매핑 함수
  const mapCategoryToOptionId = (category) => {
    switch (category) {
      case 'TRANSPORTATION': return 1;
      case 'MEALS': return 2;
      case 'SIGHTSEEING': return 3;
      case 'SHOPPING': return 4;
      case 'ACCOMMODATION': return 5;
      case 'ETC': return 6;
      default: return 6;
    }
  };
  

  // React Query로 지출 상세 정보 조회 함수
  const fetchExpenseDetail = async () => {
    try {
      
      const res = await axiosInstance.get(`/api/expense/${expenditureId}`);
      return res.data;
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['expenseDetail', expenditureId],
    queryFn: fetchExpenseDetail,
    enabled: !!expenditureId,
  });
  

  // 로컬 상태 (서버에서 가져온 데이터가 없으면 초기 빈 값)
  const [title, setTitle] = useState('');
  const [money, setMoney] = useState('');
  const [memo, setMemo] = useState('');
  const [selectedOption, setSelectedOption] = useState(6);
  const [imageUris, setImageUris] = useState([]);
  const [members, setMembers] = useState([
    { id: 1, name: "홍길동", leader: true, sameName: false, image: profileImage1, color: "blue" },
    { id: 2, name: "김철수", leader: false, sameName: false, image: profileImage2, color: "red" },
    { id: 3, name: "이영희", leader: false, sameName: true, image: profileImage3, color: "green" },
  ]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [excludedMember, setExcludedMember] = useState([]); 

  // 서버 데이터가 불러와지면 local 상태 초기화 (한번만 실행)
  React.useEffect(() => {
    if (data && data.isSuccess && data.result) {
      const res = data.result;
      setTitle(res.name || '');
      setMoney(res.price ? String(res.price) : '');
      setMemo(res.details || '');
      setSelectedOption(mapCategoryToOptionId(res.category));
      setImageUris(
        res.expenseImages && Array.isArray(res.expenseImages)
          ? res.expenseImages.map(url => ({ uri: url }))
          : []
      );

      // members setting
      const includedMembers = res.includedMember || [];
      const payerEmails = Array.isArray(res.payer) 
        ? res.payer.map(p => p.email)
        : res.payer?.email
          ? [res.payer.email]
          : [];
      const apiMembers = includedMembers.map((m, idx) => ({
        id: idx + 1,
        name: m.name,
        leader: payerEmails.includes(m.email),    // 여러 결제자 대응
        sameName: false,
        image: m.profileImageUrl ? { uri: m.profileImageUrl } : null,
        color: '#999',
        email: m.email,
      }));
      setMembers(apiMembers);

      // === 수정 부분 시작 ===
      // 다중 결제자(배열)로 상태 세팅
      setSelectedMember(
        apiMembers
          .filter(m => payerEmails.includes(m.email))
          .map(m => m.id)
      );

      // 제외된 멤버도 배열(email 배열 또는 id 배열로 세팅)
      const excludedEmails = res.excludedMember || []; // 서버에서 email 배열로 내려줌
      setExcludedMember(
        apiMembers
          .filter(m => excludedEmails.includes(m.email))
          .map(m => m.id)
      );
        }
  }, [data]);
  

  // 이미지 선택
  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.8,
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setImageUris((prev) => [...prev, { uri: response.assets[0].uri }]);
        }
      }
    );
  };

  const handleDeleteImage = (uri) => {
    setImageUris((prev) => prev.filter(img => img.uri !== uri));
  };

  const handleProfilePress = (member) => {
    setSelectedMember(prev =>
      prev.includes(member.id)
        ? prev.filter(id => id !== member.id)
        : [...prev, member.id]
    );
  };
  const excludeProfilePress = (member) => {
    setExcludedMember(prev =>
      prev.includes(member.id)
        ? prev.filter(id => id !== member.id)
        : [...prev, member.id]
    );
  };
  

  const [isOpen, setIsOpen] = useState(false);
  const openBottomSheet = () => {
    setIsOpen(true);
    bottomSheetRef.current?.expand();
  };
  const closeBottomSheet = () => setIsOpen(false);

  const deleteExpense = () => {
    Alert.alert('알림', '지출 기록을 삭제합니다.');
    setIsOpen(false);
    navigation.goBack();
  };
  const deleteExitExpense = () => setIsOpen(false);

// 저장 함수: 다중 결제자/제외자 적용
const fetchExpense = async () => {
  try {
    const categoryMap = {
      1: 'TRANSPORTATION',
      2: 'MEALS',
      3: 'SIGHTSEEING',
      4: 'SHOPPING',
      5: 'ACCOMMODATION',
      6: 'ETC',
    };
    const categoryName = categoryMap[selectedOption] || 'ETC';

    // 결제자 다중 선택 -> email 배열
    const payerEmails = selectedMember
      .map(id => members.find(m => m.id === id)?.email)
      .filter(Boolean);
    if (!payerEmails.length) {
      Alert.alert('오류', '한 명 이상의 결제자를 선택하세요');
      return;
    }
    // 제외멤버 역시 다중 선택 -> email 배열
    const excludedEmails = excludedMember
      .map(id => members.find(m => m.id === id)?.email)
      .filter(Boolean);

    const formData = new FormData();
    formData.append('expenseName', title);
    formData.append('price', Number(money));
    formData.append('details', memo);
    formData.append('expenseDate', new Date().toISOString().split('.')[0]);
    formData.append('categoryName', categoryName);
    payerEmails.forEach(email => formData.append('payerEmail', email)); // 여러 결제자
    excludedEmails.forEach(email => formData.append('excludedMember', email)); // 여러 제외자
    imageUris.slice(0, 3).forEach((img, idx) => {
      formData.append('images', {
        uri: img.uri,
        name: `image${idx + 1}.jpg`,
        type: 'image/jpeg',
      });
    });
    const response = await axiosInstance.put(`/api/expense/${expenditureId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (response.data.isSuccess) {
      Alert.alert('성공', '지출 내역이 수정되었습니다.');
      navigation.goBack();
    } else {
      Alert.alert('실패', response.data.message || '수정 실패');
    }
  } catch (error) {
    console.error('지출 수정 에러:', error);
    if (error.response) console.log('서버응답:', error.response.data);
    Alert.alert('에러', '지출 수정 중 오류가 발생했습니다.');
  }
};

  const selectedOptionData = options.find(o => o.id === selectedOption);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>데이터 로드 중 오류가 발생했습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.travelNameInput}
          placeholder="지출 제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.dateInputWrapper}>
          <TextInput
            style={styles.dateInputwon}
            placeholder="지출 금액을 입력하세요"
            keyboardType="numeric"
            value={money}
            onChangeText={setMoney}
          />
          <Text style={styles.dateText}>원</Text>
        </View>
      </View>
      <TextInput
        style={styles.memoInput}
        placeholder="메모를 입력하세요"
        multiline
        value={memo}
        onChangeText={setMemo}
      />

      <View style={styles.imgSlide}>
        {imageUris.length > 0 && (
          <ImgSlideUpload images={imageUris} itemsToShow={2} scale={85} handleDeleteImage={handleDeleteImage} />
        )}
      </View>
      <View style={styles.picup}>
        <PlusButton onPress={handleImagePick} text="사진 추가하기" width={358} height={42} NoBorder={true} />
      </View>

      <Text style={styles.categoryText}>카테고리를 선택하세요</Text>
      <View style={styles.optionsContainer}>
        <OptionList options={options}  setSelectedId={setSelectedOption} selectedId={selectedOption} onSelect={setSelectedOption} Buttonwidth={64} />
      </View>

      <Text style={styles.categoryText}>누가 결제했나요?</Text>
      <View style={styles.profileContainer}>
        {members.map((member, i) => (
          <Profile
          key={i}
          name={member.name}
          leader={member.leader}
          sameName={member.sameName}
          image={member.image}
          color={member.color}
          selected={selectedMember.includes(member.id)}
          onPress={() => handleProfilePress(member)}
          />
        ))}
      </View>

      <Text style={styles.categoryText}>지출에서 제외할 멤버가 있나요?</Text>
      <Text style={styles.leaderSubText}>해당 금액 정산 시 제외됩니다</Text>
      <View style={styles.profileContainer}>
        {members.map((member, i) => (
          <Profile
            key={i}
            name={member.name}
            leader={member.leader}
            sameName={member.sameName}
            image={member.image}
            color={member.color}
            selected={excludedMember.includes(member.id)}
            onPress={() => excludeProfilePress(member)}
          />
        ))}
      </View>

      <TouchableOpacity onPress={openBottomSheet} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>기록 삭제하기</Text>
      </TouchableOpacity>

      <BlackButton text="기록 수정하기" width={343} height={50} onPress={fetchExpense} ready />

      {isOpen && (
        <CustomBottomSheet ref={bottomSheetRef} snapPoints={snapPoints} isOpen={isOpen}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.sheetText}>지출기록을 삭제할까요?</Text>
            <Text style={styles.sheetText2}>더 이상 지출 기록을 추가할 수 없어요</Text>

            <View style={styles.infoContainer}>
              <View style={styles.optionContainer}>
                <Image source={selectedOptionData?.image} style={styles.optionImage} resizeMode='contain' />
                <Text style={styles.optionText}>{selectedOptionData?.text}</Text>
              </View>
              <Text style={styles.expenseTitle}>{title}</Text>
              <View style={styles.expenseMoneyWrapper}>
                <Text style={styles.expenseMoneyText}>{money}</Text>
                <Text style={styles.expenseMoneyText}> 원</Text>
              </View>
              <Text style={styles.travelMemo}>{memo}</Text>
            </View>

            <View style={styles.twobuttonwrap}>
              <TwoButton
                width={360}
                height={42}
                textLeft='삭제'
                textRight='취소'
                onPressLeft={deleteExpense}
                onPressRight={deleteExitExpense}
              />
            </View>
          </View>
        </CustomBottomSheet>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',

    },
    contentWrapper: {
        flex: 1,
        marginTop:-20,
    },
    inputWrapper: {
        justifyContent: 'center',
        marginBottom: 20,
    },
    sectionText: {
        fontSize: 15,
        color: '#1D1D1F',
        marginBottom: 10,
    },
    dateInputWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        position:'relative',
    },
    dateInputwon: {
        width: 350,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 17,
        color: '#1D1D1F',
        fontFamily: 'SUIT-SemiBold', 
        position:'absolute',
        top:15,
        right:15,
    },
    datePlaceText: {
        color: '#838383',
        fontSize: 15,
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
        fontSize: 17,
        color: 'white',
    },
    travelNameInput: {
        fontSize: 23,
        borderColor: '#BBBBBB',
        height: 50,
        marginBottom: 15,
        fontFamily: theme.fonts.extrabold,
    },
    selectedImage: {
        width: 350,
        height: 200,
        marginTop: 10,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    imgSlide:{
        marginLeft:-8,
        marginRight:-7,
        marginBottom:10,
    },
    picup:{
        marginBottom:30,
    },
    categoryText:{
        color: "#1D1D1F",
        fontFamily: theme.fonts.extrabold,
        fontSize:17,
        marginBottom:15,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
        height:34,
      },
      plusButton: {
        color: "white",
        fontWeight: "medium",
        fontSize: 14,
      },
    profileContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom:40,
    },    
    leaderSubText:{
        fontFamily: 'SUIT-SemiBold', 
        marginTop:10,
        fontSize: 12,
        color: '#AAAAAA',
        marginBottom:20,
    },  
    deleteButton:{
        width:343,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center' 
    },
    deleteButtonText:{
        color:'#838383',
        fontFamily: 'SUIT-SemiBold', 
        marginTop:5,
        fontSize:15,
        textDecorationLine: 'underline',
        marginBottom:25,
    },
    infoContainer:{
        width:343,
        backgroundColor:'#FBFBFB',
        padding:10,
        marginBottom:40,
    },
    optionContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: "center",
        marginBottom: 30,
        width:52,
        height:26,
        backgroundColor:'#F7F7F7',
      },
    optionImage:{
        width:14,
        height:14,
        marginTop:6,
    },
    optionText:{
        marginTop:7,
        marginLeft:3,
        fontFamily: 'SUIT-SemiBold', 
        fontSize: 13,
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
      expenseTitle: {
        fontSize: 23,
        borderColor: '#BBBBBB',
        height: 50,
        marginTop:-20,
        fontFamily: theme.fonts.extrabold,
    },
    expenseMoneyWrapper:{
        flexDirection: 'row',
        marginTop:-20,
        marginLeft:15,
        width: 350,
        height: 50,
    },
    expenseMoneyText: {
        fontSize: 19,
        color: '#1D1D1F',
        fontFamily: 'SUIT-SemiBold', 
        top:15,
        right:15,
    },
});

export default WEditExpense;