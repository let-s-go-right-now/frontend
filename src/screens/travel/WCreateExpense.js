import React, { useState, useCallback, useRef } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { BlackButton, CustomBottomSheet, ImgSlide, ImgSlideUpload, MyCalendar, OptionList, PlusButton, Profile, TwoButton } from '../../components';
import { useTabBarVisibility } from '../../utils';
import { theme } from '../../theme';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axiosInstance';
    //이름 같은 멤버 색 부여
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#F8FF33', '#FF33F6',
        '#33FFF2', '#F433FF', '#FF8333', '#F3FF33', '#33F6FF'
    ];

    function assignColors(members) {
        const nameCount = {};
        const updatedMembers = members.map((member, index) => {
          if (member.sameName) {
            if (nameCount[member.name]) {
              nameCount[member.name]++;
            } else {
              nameCount[member.name] = 0;
            }
            member.color = colors[nameCount[member.name] % colors.length];
          }
          return member;
        });
        return updatedMembers;
      }
          // 여행 참여자 목록을 가져오는 함수
          const fetchTripMembersAPI = async () => {
            try {
              const token = await AsyncStorage.getItem('jwtToken');
              if (!token) throw new Error('토큰이 없습니다.');
          
              const tripId = await AsyncStorage.getItem('tripId');
              if (!tripId) throw new Error('tripId가 없습니다.');
          
              const requestUrl = `/api/trip/${tripId}/trip-member`;
          
              const response = await axiosInstance.get(requestUrl);
          
              if (!response.data.isSuccess) throw new Error(response.data.message || '불러오기 실패');
              return response.data.result;
            } catch (error) {
              throw error; // 에러는 다시 던져 react-query에서 잡도록
            }
          };
          
          

const WCreateExpense = ({ route, navigation }) => {
    console.log('[WCreateExpense] 컴포넌트 렌더링됨');
    useTabBarVisibility(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState(null);
    const [imageUris, setImageUris] = useState([]);
    const bottomSheetRef = useRef(null);
    const snapPoints = ['70%'];
  
    // react-query 훅으로 서버 데이터 패칭 (기존 useFocusEffect + fetchTripMembers 부분 대체)
    const fetchTripMembersWrapper = async () => {
        console.log('[fetchTripMembersWrapper] 호출됨');
        const result = await fetchTripMembersAPI();
        console.log('[fetchTripMembersWrapper] 호출 완료');
        return result;
      };
      
      const { data, error, isLoading } = useQuery({
        queryKey: ['tripMembers'],
        queryFn: fetchTripMembersWrapper,
        refetchOnWindowFocus: true,
        retry: 1,
        enabled: true, 
        onError: (error) => console.log('[useQuery] fetch error:', error),
        onSuccess: (data) => console.log('[useQuery] fetch success:', data),
      });
      
      
  
    // API 데이터가 로딩 완료되면 members 배열 생성 및 색 지정
    const members = data
    ? assignColors(
        data.tripMembers.map((member, idx) => ({
          id: idx,
          email: member.email,
          name: member.name,
          image: member.profileImageUrl || 'default_image_url',
          sameName: false,
        })),
      )
    : [];
  
  const ownerEmail = data?.owner?.email || '';

  // 상태 및 함수 초기화 (기존 코드 유지)
  const [selectedMember, setSelectedMember] = useState([]); 
  const [excludedMember, setExcludedMember] = useState([]);
    
    const options = [
        { 
            id: 'TRANSPORTATION', 
            text: "교통", 
            image: require('../../assets/icons/travel/options/TraficIcon.png'), 
            image_clicked: require('../../assets/icons/travel/options/TraficIcon-selected.png'), 
        },
        { 
            id: 'MEALS', 
            text: "식사", 
            image: require('../../assets/icons/travel/options/FoodIcon.png'), 
            image_clicked: require('../../assets/icons/travel/options/FoodIcon-selected.png'), 
        },
        { 
            id: 'SIGHTSEEING', 
            text: "관광", 
            image: require('../../assets/icons/travel/options/AmuseIcon.png'),
            image_clicked: require('../../assets/icons/travel/options/AmuseIcon-selected.png'), 
        },
        { 
            id: 'SHOPPING', 
            text: "쇼핑", 
            image: require('../../assets/icons/travel/options/ShopIcon.png'),
            image_clicked: require('../../assets/icons/travel/options/ShopIcon-selected.png'), 
        },
        { 
            id: 'ACCOMMODATION', 
            text: "숙소", 
            image: require('../../assets/icons/travel/options/RentIcon.png'),
            image_clicked: require('../../assets/icons/travel/options/RentIcon-selected.png'), 
        },
        { 
            id: 'ETC', 
            text: "기타", 
            image: require('../../assets/icons/travel/options/etc.png'),
            image_clicked: require('../../assets/icons/travel/options/etc-selected.png'), 
        },
    ];
      
      

    const openBottomSheet = () => {
        setIsOpen(!isOpen);
        bottomSheetRef.current?.expand();
    };

    const formatDate = (date) => {
        const isoString = new Date(date).toISOString(); // ISO 8601 형식
        return isoString.slice(0, 19); // "YYYY-MM-DDTHH:MM:SS" 형식으로 자르기
      };
    const [expenseName, setExpenseName] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('MEALS');
    const [excludedMembers, setExcludedMembers] = useState([]);

    const handleSaveExpense = async () => {
        const formData = new FormData();
        formData.append('expenseName', expenseName);
        formData.append('price', price);
        formData.append('details', details);
        formData.append('expenseDate', formatDate(new Date()));
        formData.append('categoryName', selectedCategory);

        // multiple payerEmail (결제자)
        const payerEmails = selectedMember
          .map(id => members.find(member => member.id === id)?.email)
          .filter(email => !!email);
        
        if (!payerEmails.length) {
          alert('결제자를 최소 1명 선택하세요!');
          return;
        }
        payerEmails.forEach(email => formData.append('payerEmail', email));

        // multiple excludedMembers
        const excludedEmails = excludedMembers
            .map(excludedId => members.find(member => member.id === excludedId)?.email)
            .filter(email => email);  // 이메일이 존재하는 경우만 필터링
        excludedEmails.forEach(email => formData.append('excludedMember', email));

        // 이미지를 업로드
        imageUris.forEach((uri, index) => {
            const imageFile = {
                uri,
                name: `image_${index}.jpg`,
                type: 'image/jpeg',
            };
            formData.append('images', imageFile);
        });

        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const tripId = await AsyncStorage.getItem('tripId');
            if (!token) {
              console.log('토큰이 없습니다.');
              return;
            }
            const response = await axiosInstance.post(
                `/api/expense/${tripId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.data.isSuccess) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                alert('지출 기록 작성 실패');
            }
        } catch (error) {
            console.error('Error saving expense:', error);
            console.log(formData)
            alert('에러가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const handleReplaceTravel = () => {
        navigation.reset({
            index:0,
            routes: [{name:'Home'}]
        });
    };

    const handleButtonPress = (startDate, endDate) => {
        setSelectedDates({ startDate, endDate });
        setIsOpen(!isOpen);
        bottomSheetRef.current?.expand();
    };


    // 이미지 선택 함수
    const handleImagePick = () => {
        launchImageLibrary(
            {
                mediaType: 'photo', // 사진만 선택
                maxWidth: 600,
                maxHeight: 600,
                quality: 0.8,
            },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setImageUris((prevUris) => [...prevUris, response.assets[0].uri]); // 기존 배열에 새 이미지 URI 추가
                }
            }
        );
    };

    // 이미지 삭제 함수
    const handleDeleteImage = (uri) => {
        setImageUris((prevUris) => prevUris.filter((item) => item !== uri)); // 해당 이미지 삭제
    };
    
    // 멤버(결제자) 다중 선택 핸들러
    const handleProfilePress = (member) => {
      setSelectedMember(prev =>
        prev.includes(member.id)
          ? prev.filter(id => id !== member.id)
          : [...prev, member.id]
      );
    };
    // 제외 멤버 다중 선택 핸들러
    const excludeProfilePress = (member) => {
      setExcludedMembers(prev =>
        prev.includes(member.id)
          ? prev.filter(id => id !== member.id)
          : [...prev, member.id]
      );
    };



    const renderContent = () => (
        <View style={styles.contentWrapper}>
            <View style={styles.inputWrapper}>
                <TextInput style={styles.travelNameInput} placeholder="지출 제목을 입력하세요" 
                    value={expenseName} onChangeText={setExpenseName}
                />
                <View style={styles.dateInputWrapper}>
                    <TextInput style={styles.dateInputwon} placeholder="지출 금액을 입력하세요" 
                    value={price} onChangeText={setPrice}
                    />
                    <Text style={styles.dateText}>원</Text>
                </View>
            </View>
            <TextInput style={styles.memoInput} placeholder="메모를 입력하세요" multiline value={details} onChangeText={setDetails}/>
            {/* 선택된 이미지 미리보기 */}
            <View style={styles.imgSlide} >
            {imageUris.length > 0 && (
                <ImgSlideUpload images={imageUris.map(uri => ({ uri }))} itemsToShow={2} scale={85} handleDeleteImage={handleDeleteImage}/>
            )}
            </View>
            {/* 이미지 선택 버튼 */}
            <View style={styles.picup}>
                <PlusButton onPress={handleImagePick} text="사진 추가하기" width={358} height={42} NoBorder={true} />
            </View>
            {/* 카테고리 선택*/}
            <Text style={styles.categoryText}>카테고리를 선택하세요</Text>
            <View style={styles.optionsContainer}>
                <OptionList options={options} Buttonwidth={64} selectedId={selectedCategory}   setSelectedId={setSelectedCategory} />
            </View>
            {/*결제인 */}
            <Text style={styles.categoryText}>누가 결제했나요?</Text>
            <View style={styles.profileContainer}>
                {members.map((member, index) => (
                        <Profile
                            key={index}
                            name={member.name}
                            leader={member.email == ownerEmail}
                            sameName={member.sameName}
                            image={member.image}
                            color={member.color}
                            selected={selectedMember.includes(member.id)}
                            onPress={() => handleProfilePress(member)}
                            email ={member.email}
                        />
                    
                ))}
            </View>
            {/*지출 제외멤버 */}
            <Text style={styles.categoryText}>지출에서 제외할 멤버가 있나요?</Text>
            <Text style={styles.leaderSubText}>해당 금액 정산 시 제외됩니다</Text>
            <View style={styles.profileContainer}>
                {members.map((member, index) => (
                        <Profile
                            key={index}
                            name={member.name}
                            leader={member.email == ownerEmail}
                            sameName={member.sameName}
                            image={member.image}
                            color={member.color}
                            selected={excludedMembers.includes(member.id)}
                            onPress={() => excludeProfilePress(member)}
                            email ={member.email}
                        />
                    
                ))}
            </View>
            <TwoButton 
                width={360} 
                height={42} 
                textLeft='저장' 
                textRight='취소'
                onPressLeft={handleSaveExpense}
                onPressRight={handleReplaceTravel} 
            />
        </View>
    );

    return (
        <>
            <FlatList
                data={[{ key: 'form' }]} 
                renderItem={renderContent}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.container}
            />

            {isOpen && (
                <CustomBottomSheet ref={bottomSheetRef} snapPoints={snapPoints} isOpen={isOpen}>
                    <MyCalendar onButtonPress={handleButtonPress} />
                </CustomBottomSheet>
            )}
        </>
    );
};


export default WCreateExpense;

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
