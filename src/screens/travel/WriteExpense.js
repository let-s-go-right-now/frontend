import React, { useState, useCallback, useRef } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { CustomBottomSheet, ImgSlide, ImgSlideUpload, MyCalendar, OptionList, PlusButton, Profile, TwoButton } from '../../components';
import { useTabBarVisibility } from '../../utils';
import { theme } from '../../theme';
import { launchImageLibrary } from 'react-native-image-picker'; // 이미지 선택 기능 추가
import profileImage1 from "../../assets/profileImgs/profileImg01.png";
import profileImage2 from "../../assets/profileImgs/profileImg02.png";
import profileImage3 from "../../assets/profileImgs/profileImg03.png";
import DeleteButtonForReal from '../../assets/icons/travel/DeleteButton-forReal.png';
import DeleteButton from '../../assets/icons/travel/DeleteButton.png';

const WriteExpense = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState(null);
    const [imageUris, setImageUris] = useState([]); // 여러 이미지를 관리하기 위한 상태
    const bottomSheetRef = useRef(null);
    const snapPoints = ['70%'];
        const tripData = {
            tripName: "부산바캉스",
            startDate: "08. 12",
            endDate: "08. 15",
            memo: "해운대에서 걸스나잇",
            leader: true,
            members: [
                { id:1,name: "홍길동", leader: true, sameName: false, image: profileImage1, color: "blue", onPress: () => {} },
                { id:2,name: "김철수", leader: false, sameName: false, image: profileImage2, color: "red", onPress: () => {} },
                { id:3,name: "이영희", leader: false, sameName: true, image: profileImage3, color: "green", onPress: () => {} },
            ],
        };
        const { tripName, startDate, endDate, memo, members } = tripData;

    const [selectedMember, setSelectedMember] = useState(1); //선택된 멤버
    const [excludedMember, setExcludedMember] = useState(1); // 제외 멤버 관리
    const options = [
        { 
          id: 1, 
          text: "교통", 
          image: require('../../assets/icons/travel/options/TraficIcon.png'), 
          image_clicked: require('../../assets/icons/travel/options/TraficIcon-selected.png'), 
        },
        { 
          id: 2, 
          text: "식사", 
          image: require('../../assets/icons/travel/options/FoodIcon.png'), 
          image_clicked: require('../../assets/icons/travel/options/FoodIcon-selected.png'), 
        },
        { 
          id: 3, 
          text: "관광", 
          image: require('../../assets/icons/travel/options/AmuseIcon.png'),
          image_clicked: require('../../assets/icons/travel/options/AmuseIcon-selected.png'), 
        },
        { 
            id: 4, 
            text: "쇼핑", 
            image: require('../../assets/icons/travel/options/ShopIcon.png'),
            image_clicked: require('../../assets/icons/travel/options/ShopIcon-selected.png'), 
          },
          { 
            id: 5, 
            text: "숙소", 
            image: require('../../assets/icons/travel/options/RentIcon.png'),
            image_clicked: require('../../assets/icons/travel/options/RentIcon-selected.png'), 
          },
      ];
      
      

    useTabBarVisibility(false);

    const openBottomSheet = () => {
        setIsOpen(!isOpen);
        bottomSheetRef.current?.expand();
    };

    const handleSaveExpense = () => {
        navigation.replace('TravelOngoing');
    };

    const handleReplaceTravel = () => {
        navigation.replace('TravelOngoing');
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
// 멤버 선택 핸들러
const handleProfilePress = (member) => {
    setSelectedMember(member.id); // 선택된 멤버의 name 저장
};
//제외 멤버 핸들러
const excludeProfilePress = (member) => {
    setExcludedMember(member.id); // 선택된 멤버의 name 저장
};

    const renderContent = () => (
        <View style={styles.contentWrapper}>
            <View style={styles.inputWrapper}>
                <TextInput style={styles.travelNameInput} placeholder="지출 제목을 입력하세요" />
                <View style={styles.dateInputWrapper}>
                    <TextInput style={styles.dateInputwon} placeholder="지출 금액을 입력하세요" />
                    <Text style={styles.dateText}>원</Text>
                </View>
            </View>
            <TextInput style={styles.memoInput} placeholder="메모를 입력하세요" multiline />
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
                <OptionList options={options} Buttonwidth={64}/>
            </View>
            {/*결제인 */}
            <Text style={styles.categoryText}>누가 결제했나요?</Text>
            <View style={styles.profileContainer}>
                {members.map((member, index) => (
                        <Profile
                            key={index}
                            name={member.name}
                            leader={member.leader}
                            sameName={member.sameName}
                            image={member.image}
                            color={member.color}
                            selected={selectedMember === member.id}
                            normal={false}
                            onPress={() => handleProfilePress(member)}
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
                            leader={member.leader}
                            sameName={member.sameName}
                            image={member.image}
                            color={member.color}
                            selected={excludedMember === member.id}
                            normal={false}
                            onPress={() => excludeProfilePress(member)}
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
        marginBottom:40,
    },    
    leaderSubText:{
        fontFamily: 'SUIT-SemiBold', 
        marginTop:10,
        fontSize: 12,
        color: '#AAAAAA',
    },  
});
