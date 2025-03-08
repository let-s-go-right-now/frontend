import React, { useState, useCallback, useRef } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { CustomBottomSheet, GeneralOptionButton, ImgSlide, ImgSlideUpload, MyCalendar, OptionList, PlusButton, Profile, TwoButton } from '../../components';
import { useTabBarNone} from '../../utils';
import { theme } from '../../theme';
import { launchImageLibrary } from 'react-native-image-picker'; // 이미지 선택 기능 추가
import profileImage1 from "../../assets/profileImgs/profileImg01.png";
import profileImage2 from "../../assets/profileImgs/profileImg02.png";
import profileImage3 from "../../assets/profileImgs/profileImg03.png";
import image1 from "../../assets/slides/image1.png";
import image2 from "../../assets/slides/image2.png";
import image3 from "../../assets/slides/image3.png";
import image4 from "../../assets/slides/image4.png";
import image5 from "../../assets/slides/image5.png";
import image6 from "../../assets/slides/image6.png";

const WCompletedExpense = ({ route, navigation }) => {
    useTabBarNone(false);
    const { expenditureId } = route.params; //수정할 id
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState(null);
    const [imageUris, setImageUris] = useState([]); // 여러 이미지를 관리하기 위한 상태
    const bottomSheetRef = useRef(null);
    const snapPoints = ['70%'];
    const [tripData, setTripData] = useState({
        title: "부산바캉스",
        startDate: "08. 12",
        endDate: "08. 15",
        memo: "해운대에서 걸스나잇",
        leader: true,
        members: [
            { id: 1, name: "홍길동", leader: true, sameName: false, image: profileImage1, color: "blue", onPress: () => {} },
            { id: 2, name: "김철수", leader: false, sameName: false, image: profileImage2, color: "red", onPress: () => {} },
            { id: 3, name: "이영희", leader: false, sameName: true, image: profileImage3, color: "green", onPress: () => {} },
        ],
    images: [
        { id: 1, image: image1 },
        { id: 2, image: image2 },
        { id: 3, image: image3 },
        { id: 4, image: image4 },
        { id: 5, image: image5 },
        { id: 6, image: image6 }
      ],
        selectedOption: 6,  // 기존 selectedOption
        money: '24000',  // 기존 money
    });
        const { title, money, memo, members,selectedOption,leader,startDate,endDate,images } = tripData;



    const [selectedMember, setSelectedMember] = useState(1); //선택된 멤버
    const [excludedMember, setExcludedMember] = useState(1); // 제외 멤버 관리
    const options = [
        { 
          id: 1, 
          text: "교통", 
          image: require('../../assets/icons/travel/completedOptions/TraficIcon.png'), 
        },
        { 
          id: 2, 
          text: "식사", 
          image: require('../../assets/icons/travel/completedOptions/FoodIcon.png'), 
        },
        { 
          id: 3, 
          text: "관광", 
          image: require('../../assets/icons/travel/completedOptions/AmuseIcon.png'),
        },
        { 
            id: 4, 
            text: "쇼핑", 
            image: require('../../assets/icons/travel/completedOptions/ShopIcon.png'),
          },
          { 
            id: 5, 
            text: "숙소", 
            image: require('../../assets/icons/travel/completedOptions/RentIcon.png'),
          },
          { 
            id: 6, 
            text: "기타", 
            image: require('../../assets/icons/travel/completedOptions/etc.png'),
          },
      ];
        // selectedOptionData를 tripData에서 가져오기
        const selectedOptionData = options.find(option => option.id === selectedOption);
        // tripData 객체의 값을 업데이트하려면 setTripData 사용
        const updateTripData = (newData) => {
            setTripData(prevData => ({
                ...prevData,
                ...newData,
            }));
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
    
// 멤버 선택 핸들러
const handleProfilePress = (member) => {
    setSelectedMember(member.id); // 선택된 멤버의 name 저장
};
//제외 멤버 핸들러
const excludeProfilePress = (member) => {
    setExcludedMember(member.id); // 선택된 멤버의 name 저장
};

  // 이미지 클릭 시 상세 이미지로 이동
  const handleImagePress = (index) => {
    navigation.navigate("ImgZoomIn", {
      imageIndex: index,
      images: images, // 전체 이미지 배열을 전달
    });
  };
  

    const renderContent = () => (
        <View style={styles.contentWrapper}>
            <View style={styles.optionContainer}>
                 <Image source={selectedOptionData?.image} style={styles.optionImage} resizeMode='contain'/>
                 <Text style={styles.optionText}>{selectedOptionData?.text}</Text>
            </View>
            <Text style={styles.travelNameInput}>{title}</Text>
            <View style={styles.dateInputWrapper}>
                    <Text style={styles.dateText}>{money}</Text>
                    <Text style={styles.dateText}> 원</Text>
                </View>
            <Text style={styles.travelMemo}>{memo}</Text>
            {/* 선택된 이미지 미리보기 */}
            <View style={styles.imgSlide} >
                <ImgSlide images={images} itemsToShow={2} scale={85} onImagePress={handleImagePress}  />
            </View>

            {/*결제인 */}
            <Text style={styles.categoryText}>결제한 멤버</Text>
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
                            normal={true}
                        />
                    
                ))}
            </View>
            {/*지출 제외멤버 */}
            <Text style={styles.categoryText}>지출에 포함된 멤버</Text>
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
                            normal={true}
                            onPress={() => excludeProfilePress(member)}
                        />
                    
                ))}
            </View>
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

export default WCompletedExpense;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        
        marginTop:-20,
    },
    sectionText: {
        fontSize: 15,
        color: '#1D1D1F',
        marginBottom: 10,
    },
    dateInputWrapper: {
        flexDirection: 'row',
        paddingLeft:20,
        marginTop:-40,
        width: 350,
        height: 50,
    },
    dateText: {
        fontSize: 19,
        color: '#1D1D1F',
        fontFamily: 'SUIT-SemiBold', 
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
        marginTop:-15,
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
        marginTop:10,
        marginBottom:40,
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
