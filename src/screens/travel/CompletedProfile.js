import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Profile } from '../../components';
import CalendarIcon from "../../assets/icons/calender-black.png";

// 이미지 예시 (본인 이미지로 교체)
import profileImage1 from "../../assets/profileImgs/profileImg01.png";
import profileImage2 from "../../assets/profileImgs/profileImg02.png";
import profileImage3 from "../../assets/profileImgs/profileImg03.png";
import { theme } from '../../theme';

const CompletedProfile = () => {
    const tripData = {
        tripName: "부산바캉스",  // 여행 제목
        startDate: "08. 12",  // 시작 날짜
        endDate: "08. 15",  // 종료 날짜
        memo: "해운대에서 걸스나잇",  // 여행 메모
        leader: true,  // 방장 여부
        members: [  // 여행에 참여한 멤버들
          {
            name: "홍길동",  // 이름
            leader: true,  // 리더 여부
            sameName: false,  // 같은 이름 여부
            image: profileImage1,  // 프로필 이미지
            color: "blue",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },
          {
            name: "김철수",  // 이름
            leader: false,  // 리더 여부
            sameName: false,  // 같은 이름 여부
            image: profileImage2,  // 프로필 이미지
            color: "red",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },
          {
            name: "이영희",  // 이름
            leader: false,  // 리더 여부
            sameName: true,  // 같은 이름 여부
            image: profileImage3,  // 프로필 이미지
            color: "green",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },
          {
            name: "박지민",  // 이름
            leader: false,  // 리더 여부
            sameName: false,  // 같은 이름 여부
            image: profileImage1,  // 프로필 이미지
            color: "yellow",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },
          {
            name: "최은지",  // 이름
            leader: false,  // 리더 여부
            sameName: false,  // 같은 이름 여부
            image: profileImage2,  // 프로필 이미지
            color: "purple",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },          {
            name: "최은지",  // 이름
            leader: false,  // 리더 여부
            sameName: false,  // 같은 이름 여부
            image: profileImage2,  // 프로필 이미지
            color: "purple",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },          {
            name: "최은지",  // 이름
            leader: false,  // 리더 여부
            sameName: false,  // 같은 이름 여부
            image: profileImage2,  // 프로필 이미지
            color: "purple",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },          {
            name: "최은지",  // 이름
            leader: false,  // 리더 여부
            sameName: false,  // 같은 이름 여부
            image: profileImage2,  // 프로필 이미지
            color: "purple",  // 색상
            onPress: () => {}  // 클릭 시 동작
          },
        ],
      };
  const { tripName, startDate, endDate, memo, leader, members } = tripData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 여행 제목 */}
      <Text style={styles.tripName}>{tripName}</Text>

      {/* 일정 */}
      <View style={styles.dateContainer}>
        <Image source={CalendarIcon} style={styles.calendarIcon} />
        <Text style={styles.dateText}>
          {startDate} - {endDate}
        </Text>
      </View>

      {/* 여행 메모 */}
      <Text style={styles.memo}>{memo}</Text>

      {/* 방장 여부 */}
      <Text style={styles.leaderText}>이번 여행에서 방장을 맡았어요</Text>

      {/* 프로필 이미지들 */}
      <View style={styles.profileContainer}>
        {members.map((member, index) => (
          <Profile
            key={index}
            name={member.name}
            leader={member.leader}
            sameName={member.sameName}
            image={member.image}
            color={member.color}
            selected={member.leader}
            normal={true}
            onPress={member.onPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CompletedProfile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex:1
  },
  tripName: {
    fontFamily: theme.fonts.extrabold, 
    fontSize: 23,
    color: '#1D1D1F',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingVertical: 5,
    width:135,
    marginTop: 10,
  },
  calendarIcon: {
    width: 17,
    height: 17,
    marginRight: 10,
    marginLeft:5,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#363638',
  },
  memo: {
    fontFamily: 'SUIT-SemiBold', 
    fontSize: 15,
    color: '#363638',
    marginTop: 20,
    marginBottom:20,
  },
  leaderText: {
    fontFamily: theme.fonts.extrabold, // 경로에 맞게 적용
    fontSize: 17,
    color: '#1D1D1F',
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
});
