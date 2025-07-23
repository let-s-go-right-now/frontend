import React, { useState, useRef, useEffect } from 'react';
import { FlatList, TextInput, Text, View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../utils/axiosInstance';
import { Dimensions } from 'react-native';
import { CustomBottomSheet, ImgSlideUpload, MyCalendar, OptionList, PlusButton, Profile, TwoButton } from '../../components';
import { useTabBarVisibility } from '../../utils';
import { theme } from '../../theme';
import { launchImageLibrary } from 'react-native-image-picker';


// 색상 배열 & 할당 함수는 그대로 사용
const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#F8FF33', '#FF33F6',
  '#33FFF2', '#F433FF', '#FF8333', '#F3FF33', '#33F6FF'
];

function assignColors(members) {
  const nameCount = {};
  return members.map(member => {
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
}

// API 호출 함수
const fetchTripMembersAPI = async () => {
  const tripId = await AsyncStorage.getItem('tripId');
  if (!tripId) throw new Error('tripId 가 없습니다');

  const response = await axiosInstance.get(`/api/trip/${tripId}/trip-member`);
  if (!response.data.isSuccess) throw new Error('여행 참여자 목록 불러오기 실패');

  return response.data.result;
};

const WriteExpense = ({ navigation }) => {
  useTabBarVisibility(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);
  const [imageUris, setImageUris] = useState([]);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['70%'];

  // React Query 데이터 패칭
  const { data, isLoading, error } = useQuery({
    queryKey: ['tripMembers'],
    queryFn: fetchTripMembersAPI,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });

  const [members, setMembers] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [excludedMember, setExcludedMember] = useState(null);

  // 데이터 변경 시 처리
  useEffect(() => {
    if (data) {
      setOwnerEmail(data.owner.email);
      let updatedMembers = data.tripMembers.map(m => ({
        ...m,
        sameName: false,
      }));
      updatedMembers = assignColors(updatedMembers);
      setMembers(updatedMembers);
    }
  }, [data]);
  
    
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
        // selectedMember ID로 이메일 찾아서 저장
        const payerEmail = members.find(member => member.id === selectedMember)?.email;
        if (payerEmail) {
            formData.append('payerEmail', payerEmail);
        } else {
            console.log('결제자를 찾을 수 없습니다.');
        }

        // excludedMembers ID 목록을 이메일 목록으로 변환하여 저장
        const excludedEmails = excludedMembers
            .map(excludedId => members.find(member => member.id === excludedId)?.email)
            .filter(email => email);  // 이메일이 존재하는 경우만 필터링
        formData.append('excludedMember', excludedEmails.join(',')); // 제외할 멤버들 이메일 목록

            

        // 이미지를 업로드
        imageUris.forEach((uri, index) => {
            const imageFile = {
                uri,
                name: `image_${index}.jpg`,
                type: 'image/jpeg',
            };
            formData.append('images', imageFile);
        });
            // 이미지 업로드 포함 폼데이터 전송 부분 수정 예시
            try {
                const tripId = await AsyncStorage.getItem('tripId');
                if (!tripId) {
                console.log('tripId가 없습니다.');
                return;
                }
            
                const response = await axiosInstance.post(
                `/api/expense/${tripId}`, 
                formData,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data', // multipart/form-data 꼭 명시
                    },
                }
                );
            
                if (response.data.isSuccess) {
                console.log('지출 기록이 생성되었습니다.' + tripId);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TravelOngoing' }],
                });
                } else {
                console.log('지출 기록 작성 실패');
                }
            } catch (error) {
                console.error('Error saving expense:', error);
                alert('에러가 발생했습니다. 다시 시도해 주세요.');
            }
}
  

    const handleReplaceTravel = () => {
        navigation.reset({
            index:0,
            routes: [{name:'TravelOngoing'}]
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
    const handleProfilePress = (member) => {
        setSelectedMember(prev => (prev === member.id ? null : member.id));
      };
      
      const excludeProfilePress = (member) => {
        setExcludedMember(prev => (prev === member.id ? null : member.id));
      };
      
      const windowWidth = Dimensions.get('window').width;
      const containerWidth = windowWidth - 40;


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
                <OptionList options={options} Buttonwidth={64} 
                containerWidth={containerWidth} 
                selectedId={selectedCategory} setSelectedId={setSelectedCategory} 
                />
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
                            selected={selectedMember === member.id}
                            normal={false}
                            onPress={() => handleProfilePress(member)}
                            email ={member.email}
                        />
                    
                ))}
            </View>
            {/*지출 제외멤버 */}
            <Text style={styles.categoryText}>지출에서 제외할 멤버가 있나요?</Text>
            <Text style={styles.leaderSubText}>해당 금액 정산 시 제외됩니다</Text>
            <View style={styles.profileContainer2}>
                {members.map((member, index) => (
                        <Profile
                            key={index}
                            name={member.name}
                            leader={member.email == ownerEmail}
                            sameName={member.sameName}
                            image={member.image}
                            color={member.color}
                            selected={excludedMember === member.id}
                            normal={false}
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
                keyExtractor={item => item.key}
                contentContainerStyle={styles.container}
                removeClippedSubviews={false} // 임시로 클리핑 제거해보기
                initialNumToRender={1} // 최소 렌더링 아이템수
                maxToRenderPerBatch={1}
                windowSize={3}
                scrollEventThrottle={16}
                onScrollToIndexFailed={() => {}}
            />

            {isOpen && (
                <CustomBottomSheet ref={bottomSheetRef} snapPoints={snapPoints} isOpen={isOpen}>
                    <MyCalendar onButtonPress={handleButtonPress} />
                </CustomBottomSheet>
            )}
        </>
    );
};

export default WriteExpense;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop:-20,
    },
    contentWrapper: {
        flex: 1,
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
        marginLeft:10,
        marginBottom:40,
    },    
    profileContainer2:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginLeft:10,
        marginBottom:40,
        marginTop:15,
    },    
    leaderSubText:{
        fontFamily: 'SUIT-SemiBold', 
        marginTop:-5,
        marginLeft:1,
        fontSize: 12,
        color: '#AAAAAA',
    },  
});
