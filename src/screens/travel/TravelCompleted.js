import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ImgSlide } from '../../components';
import { FlatList, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TravelCompleted = ({ navigation }) => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          console.log('토큰이 없습니다.');
          return;
        }

        const response = await fetch('https://letsgorightnow.shop/api/trip/ended', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        console.log('서버 응답:', result);
        if (result.isSuccess) {
          setTravelData(result.result);
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

  const handleImagePress = (travelId, index) => {
    const selectedTravel = travelData.find((travel) => travel.id === travelId);
    if (selectedTravel) {
      navigation.navigate('ImgZoomInTab', {
        imageIndex: index,
        images: selectedTravel.images,
        pretabVisible: true,
      });
    }
  };

  return (
    <FlatList
      style={styles.flatcards}
      data={travelData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const days = calculateDays(item.startDate, item.endDate);
        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CompletedDetail', { id: item.id })}
          >
            {/* 제목 & 여행 기간 */}
            <View style={styles.header}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.duration}>{days}박 {days + 1}일</Text>
            </View>

            {/* 총 지출 */}
            <View style={styles.costContainer}>
              <Text style={styles.costLabel}>총 지출</Text>
              <Text style={styles.costValue}>| {item.totalExpense}원</Text>
            </View>

            {/* 이미지 슬라이드 */}
            <View style={styles.imgslidePad}>
              <ImgSlide
                images={item.expenseImageUrls}
                itemsToShow={3}
                scale={82}
                style={styles.imgslidePad}
                onImagePress={(index) => handleImagePress(item.id, index)}
              />
            </View>

            {/* 하단 정보 (프로필 & 작성일) */}
            <View style={styles.footer}>
              <View style={styles.profileContainer}>
                <Image source={{ uri: item.members[0]?.profileImageLink }} style={styles.profileImage} />
                <Text style={styles.participants}>
                  {item.name} 
                  {item.people > 0 ? ` 외 ${item.people}인` : ''}
                </Text>
              </View>
              <Text style={styles.date}>{formatDate(item.startDate)}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 16,
    borderTopColor:'#F4F4F4',
    borderTopWidth:2,
  },
  flatcards:{
    paddingHorizontal:23,
},
card: {
width: 343,
height: 232,
backgroundColor: '#FFFFFF',
padding: 16,
borderBlockColor:'#1D1D1F',
borderWidth: 0.8,
marginTop:20,
},
header: {
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 8,
},
title: {
fontSize: 15,
fontFamily: 'SUIT-SemiBold',
color: '#1D1D1F',
},
duration: {
fontSize: 12,
fontFamily: 'SUIT-SemiBold',
color: '#1D1D1F',
},
costContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 12,
},
costLabel: {
fontSize: 12,
fontWeight: 'bold',
color: '#555555',
},
costValue: {
fontSize: 12,
fontWeight: '500',
color: '#555555',
marginLeft: 4,
},
footer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginTop: 12,
},
profileContainer: {
flexDirection: 'row',
alignItems: 'center',
},
profileImage: {
width: 14,
height: 14,
borderRadius: 7,
marginRight: 6,
},
participants: {
fontSize: 12,
fontWeight: '500',
color: '#363638',
},
date: {
fontSize: 12,
fontFamily: 'SUIT-SemiBold',
color: '#BBBBBB',
},
imgslidePad:{
marginLeft:-10,
marginRight:-10,
}
});

export default TravelCompleted;
