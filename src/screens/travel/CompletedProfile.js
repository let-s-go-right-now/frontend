import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Profile } from '../../components';
import CalendarIcon from "../../assets/icons/calender-black.png";
import { theme } from '../../theme';
import { useTabBarNone } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from "../../utils/axiosInstance";

const CompletedProfile = ({ navigation, route }) => {
  useTabBarNone(false);
  const { id } = route.params; // 여행 id

  // 상태
  const [loading, setLoading] = useState(true);
  const [ownerId, setOwnerId] = useState(null);     // ownerId 저장
  const [members, setMembers] = useState([]);       // 여행 멤버들

  // 여행 정보
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [memo, setMemo] = useState("");

  // 날짜 포맷 함수
  const formatToMonthDay = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${month}. ${day}`;
  };

  // API 호출
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          Alert.alert("오류", "로그인 정보를 찾을 수 없습니다.");
          return;
        }
        // API 호출
        const response = await axiosInstance.get(`/api/trip/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log("📌 API 응답 데이터:", data);
        if (!data.isSuccess || !data.result) {
          Alert.alert("오류", data.message || "정보를 불러오지 못했습니다.");
          return;
        }

        // 여행 기본 정보 필드명 주의!
        setTripName(data.result.name || "여행명");
        setStartDate(formatToMonthDay(data.result.startDate));
        setEndDate(formatToMonthDay(data.result.endDate));
        setMemo(data.result.introduce || "");

        setOwnerId(data.result.ownerId || null);

        // 멤버 배열 세팅 (profileImageLink)
        setMembers(Array.isArray(data.result.members) ? data.result.members : []);

      } catch (err) {
        console.error(err);
        Alert.alert("오류", "네트워크 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTravelData();
  }, [id]);

  // 멤버 중복 이름 처리
  const nameCounts = {};
  (members || []).forEach(m => {
    nameCounts[m.name] = (nameCounts[m.name] || 0) + 1;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Text style={{ marginTop: 20, color: '#aaa' }}>불러오는 중...</Text>
      ) : (
        <>
          {/* 여행 제목 */}
          <Text style={styles.tripName}>{tripName}</Text>

          {/* 일정 */}
          <View style={styles.dateContainer}>
            <Image source={CalendarIcon} style={styles.calendarIcon} />
            <Text style={styles.dateText}>{startDate} - {endDate}</Text>
          </View>

          {/* 여행 메모 */}
          <Text style={styles.memo}>{memo}</Text>

          {/* 멤버 프로필 리스트 */}
          <View style={styles.profileContainer}>
            {(members || []).map((m, i) => (
              <Profile
                key={i}
                name={m.name}
                leader={m.id === ownerId}
                sameName={nameCounts[m.name] > 1}
                image={m.profileImageLink
                  ? { uri: m.profileImageLink }
                  : require("../../assets/profileImgs/default.png")}
                color={m.id === ownerId ? "#4383FF" : "blue"}
                selected={m.id === ownerId}
                normal={true}
                onPress={() => {}}
              />
            ))}
          </View>
        </>
      )}
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
