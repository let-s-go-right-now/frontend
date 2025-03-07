import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ImgSlide from '../ImgSlide';

const TravelComponent = ({ data, navigation }) => {
    return (
      <FlatList
        style={styles.flatcards}
        data={data}
        keyExtractor={(item) => item.id.toString()}  // id를 고유 키로 사용
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CompletedDetail', { id: item.id })}
          >
            {/* 제목 & 여행 기간 */}
            <View style={styles.header}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.duration}>{item.days}</Text>
            </View>
  
            {/* 총 지출 */}
            <View style={styles.costContainer}>
              <Text style={styles.costLabel}>총 지출</Text>
              <Text style={styles.costValue}>| {item.cost}원</Text>
            </View>
  
            {/* 이미지 슬라이드 */}
            <View style={styles.imgslidePad}>
              <ImgSlide images={item.images} itemsToShow={3} scale={82} style={styles.imgslidePad} />
            </View>
  
            {/* 하단 정보 (프로필 & 작성일) */}
            <View style={styles.footer}>
              <View style={styles.profileContainer}>
                <Image source={item.profileImage} style={styles.profileImage} />
                <Text style={styles.participants}>
                  {item.name} 외 {item.people}인
                </Text>
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

const styles = StyleSheet.create({
    flatcards:{
        paddingHorizontal:23,
    },
    card: {
    width: 343,
    height: 232,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderBlockColor:'#1D1D1F',
    borderWidth: 0.8,
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

export default TravelComponent;
