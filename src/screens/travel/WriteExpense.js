import React, { useState, useCallback, useRef } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { CustomBottomSheet, ImgSlide, MyCalendar, OptionList, PlusButton, TwoButton } from '../../components';
import { useTabBarVisibility } from '../../utils';
import { theme } from '../../theme';
import { launchImageLibrary } from 'react-native-image-picker'; // 이미지 선택 기능 추가
import TraficIcon from '../../assets/icons/travel/options/TraficIcon.png';
import FoodIcon from '../../assets/icons/travel/options/FoodIcon.png';
import AmuseIcon from '../../assets/icons/travel/options/AmuseIcon.png';
import ShopIcon from '../../assets/icons/travel/options/ShopIcon.png';
import RentIcon from '../../assets/icons/travel/options/RentIcon.png';

const WriteExpense = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState(null);
    const [imageUris, setImageUris] = useState([]); // 여러 이미지를 관리하기 위한 상태
    const bottomSheetRef = useRef(null);
    const snapPoints = ['70%'];

    const options = [
        { 
          id: 1, 
          text: "교통", 
          image: require('../../assets/icons/travel/options/TraficIcon.png'), 
        },
        { 
          id: 2, 
          text: "식사", 
          image: require('../../assets/icons/travel/options/FoodIcon.png'), 
        },
        { 
          id: 3, 
          text: "관광", 
          image: require('../../assets/icons/travel/options/AmuseIcon.png'), 
        },
        // 다른 옵션들 추가...
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
                <ImgSlide images={imageUris.map(uri => ({ uri }))} itemsToShow={2} scale={85} />
            )}
            </View>
            {/* 이미지 선택 버튼 */}
            <PlusButton onPress={handleImagePick} text="사진 추가하기" width={358} height={42} NoBorder={true} />
            {/* 카테고리 선택*/}
            <View style={styles.optionsContainer}>
                <OptionList options={options}/>
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
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        height:34,
      },
      plusButton: {
        color: "white",
        fontWeight: "medium",
        fontSize: 14,
      },
});
