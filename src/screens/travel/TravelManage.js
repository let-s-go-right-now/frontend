import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CustomBottomSheet, Profile, TwoButton } from '../../components';
import CalendarIcon from "../../assets/icons/calender-black.png";
import ProfileManageIcon from "../../assets/icons/travel/ProfileManageIcon.png";
import memberInvite from "../../assets/icons/travel/memberInvite.png";
import { theme } from '../../theme';
import { TextInput } from 'react-native-gesture-handler';
import { useTabBarVisibility } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axiosInstance from '../../utils/axiosInstance';
import Clipboard from '@react-native-clipboard/clipboard';


const COLORS = [
    '#FF5733', '#33FF57', '#3357FF', '#F8FF33', '#FF33F6',
    '#33FFF2', '#F433FF', '#FF8333', '#F3FF33', '#33F6FF'
  ];

const TravelManage = ({ navigation }) => {
  useTabBarVisibility(false);

  const [isOpen, setIsOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false); 
  const bottomSheetRef = useRef(null);
  const snapPoints = ['60%'];

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [selectedMember, setSelectedMember] = useState(null);
  const [nextBottomsheet, setNextBottomsheet] = useState('기본');
  const [invitePopupVisible, setInvitePopupVisible] = useState(false);

  const [travelDetailData, setTravelDetailData] = useState([]);
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [members, setMembers] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [loading, setLoading] = useState(true);


  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
  };

  // 여행 상세 데이터
  const fetchTravelData = useCallback(async () => {
    try {
      const selectedId = await AsyncStorage.getItem('tripId');
      if (!selectedId) {
        console.log("tripId가 없습니다.");
        return;
      }
  
      const response = await axiosInstance.get(`/api/trip/${selectedId}`);
      const result = response.data;
      console.log('서버 응답:', result);
  
      if (result.isSuccess) {
        const trip = result.result;
  
        // 여행 기본 정보
        setTravelDetailData(trip);
        setTripName(trip.name);
        setStartDate(formatDate(trip.startDate));
        setEndDate(formatDate(trip.endDate));
  
        // 여행 멤버 목록
        if (trip.members) {
          const nameCount = {};
          const updatedMembers = trip.members.map((member) => {
            let color;
            if (nameCount[member.name]) {
              nameCount[member.name]++;
            } else {
              nameCount[member.name] = 0;
            }
            color = COLORS[nameCount[member.name] % COLORS.length];
  
            return {
              id: member.id, // 그대로 사용
              name: member.name,
              leader: member.id === trip.ownerId, // ownerId로 판별
              sameName: nameCount[member.name] > 0,
              image: member.profileImageLink || null,
              email: member.email || null, // 응답에 없으면 null
              color
            };
          });
  
          setMembers(updatedMembers);
        }
  
      } else {
        console.error('데이터 가져오기 실패:', result.message);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  

  // 포커스될 때마다 데이터 갱신
  useFocusEffect(
    useCallback(() => {
      fetchTravelData();
    }, [fetchTravelData])
  );

  // 초대 링크 생성
  const handleInvitePress = async () => {
    try {
      const tripId = await AsyncStorage.getItem('tripId');
      if (!tripId) {
        console.log('tripId가 없습니다');
        return;
      }
      const response = await axiosInstance.post(`/api/trip/${tripId}/invite`, {});
      if (response.data.isSuccess) {
        const inviteLink = response.data.result.invitelink;
        Clipboard.setString(inviteLink);
        setInvitePopupVisible(true);
        setTimeout(() => setInvitePopupVisible(false), 3000);
      } else {
        console.log('초대 링크 생성 실패:', response.data.message);
      }
    } catch (error) {
      console.error('초대 링크 생성 중 에러 발생:', error);
    }
  };

  const handleProfilePress = (member) => {
    setSelectedMember(member);
    setIsOpen(true);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    setIsOpen(false);
    setNextBottomsheet('기본');
  };

  const fetchMandate = async () => {
    try {
      const tripId = await AsyncStorage.getItem('tripId');
      if (!tripId) {
        console.log('tripId가 없습니다.');
        return;
      }
  
      if (!selectedMember?.id) {
        console.log(selectedMember);
        console.log('위임할 멤버 ID가 없습니다.');
        return;
      }
  
      const response = await axiosInstance.put(
        `/api/trip/${tripId}/delegate`,
        { newOwnerId: selectedMember.id } // RequestBody
      );
  
      if (response.data.isSuccess) {
        console.log('방장 위임 성공:', response.data);
        // 필요 시 UI 업데이트
        closeBottomSheet();
      } else {
        console.log('방장 위임 실패:', response.data.message);
      }
    } catch (error) {
      console.error('방장 위임 요청 중 에러:', error);
    }
    closeBottomSheet();
  };
  
  //멤버 내보내기
  const fetchKickout = async () => {
    try {
      const tripId = await AsyncStorage.getItem('tripId');
      if (!tripId) {
        console.log('tripId가 없습니다.');
        return;
      }
  
      if (!selectedMember?.id) {
        console.log('삭제할 멤버 ID가 없습니다.');
        return;
      }
  
      // API 호출
      const response = await axiosInstance.delete(
        `/api/trip/${tripId}/members/${selectedMember.id}`
      );
  
      if (response.data.isSuccess) {
        console.log('멤버 삭제 성공:', response.data.result);
  
        // 삭제 후 멤버 목록 갱신
        fetchTravelData();
  
      } else {
        console.log('멤버 삭제 실패:', response.data.message);
      }
  
    } catch (error) {
      console.error('멤버 삭제 중 에러 발생:', error);
    } finally {
      closeBottomSheet();
    }
  };
  

    
    return (<>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.tripName}>{tripName}</Text>
            <View style={styles.dateContainer}>
                <Image source={CalendarIcon} style={styles.calendarIcon} />
                <Text style={styles.dateText}>{startDate} - {endDate}</Text>
            </View>
            <TextInput style={styles.memoInput} placeholder="메모를 입력하세요" multiline />
            <Text style={styles.leaderText}>함꼐하는 멤버를 관리하세요</Text>
            <Text style={styles.leaderSubText}>방장은 함께하는 멤버를 수락하거나 퇴장시키는 권한을 가져요</Text>
            <View style={styles.profileContainer}>
                {members.map((member, index) => (
                    member.leader ? (
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
                    ) : (
                        <TouchableOpacity key={index}  style={styles.profileWrapper}>
                            <Profile
                                name={member.name}
                                leader={member.leader}
                                sameName={member.sameName}
                                image={member.image}
                                color={member.color}
                                selected={member.leader}
                                normal={true}
                                onPress={() => handleProfilePress(member)}
                            />
                            <Image source={ProfileManageIcon} style={styles.manageIcon} />
                        </TouchableOpacity>
                    )
                ))}
                <TouchableOpacity style={styles.addButton} onPress={handleInvitePress}>
                    <Image source={memberInvite} style={styles.memeberInvite}/>
                    <Text style={styles.textInvite}>멤버 초대</Text>
                </TouchableOpacity>
            </View>

            {/* 초대 링크 복사 팝업 */}
            {invitePopupVisible && (
                <View style={styles.invitePopup}>
                    <Text style={styles.invitePopupTextBold}>멤버 초대 링크가 복사되었습니다</Text>
                    <Text style={styles.invitePopupTextMedium}>친구에게 링크를 공유하세요</Text>
                </View>
            )}
        </ScrollView>

        {isOpen ? (
            <CustomBottomSheet ref={bottomSheetRef} onSheetChange={handleSheetChanges} snapPoints={snapPoints} isOpen={isOpen}>
                <View style={styles.bottomSheetContainer}>{nextBottomsheet === '기본' ? (
    <>
        <Text style={styles.title}>멤버 관리</Text>
        <Text style={styles.description}>방장 역할을 위임하거나 여행에서 내보낼 수 있어요</Text>
        <Profile
            name={selectedMember?.name}
            leader={selectedMember?.leader}
            sameName={selectedMember?.sameName}
            image={selectedMember?.image}
            color={selectedMember?.color}
            selected={selectedMember?.leader}
            normal={true}
        />
        <View style={styles.twobuttonwrap}>
            <TwoButton 
                width={360} 
                height={42} 
                textLeft='방장 위임하기' 
                textRight='내보내기'
                onPressLeft={() => setNextBottomsheet('방장 위임하기')}
                onPressRight={() => setNextBottomsheet('내보내기')} 
            />
        </View>
    </>
) : nextBottomsheet === '방장 위임하기' ? (
    <>
        <Text style={styles.title}>{selectedMember?.name}님에게 방장을 위임할까요?</Text>
        <Text style={styles.description}></Text>
        <Profile
            name={selectedMember?.name}
            leader={selectedMember?.leader}
            sameName={selectedMember?.sameName}
            image={selectedMember?.image}
            color={selectedMember?.color}
            selected={selectedMember?.leader}
            normal={true}
        />
        <View style={styles.twobuttonwrap}>
            <TwoButton 
                width={360} 
                height={42} 
                textLeft='확인' 
                textRight='취소'
                onPressLeft={fetchMandate}
                onPressRight={closeBottomSheet}
            />
        </View>
    </>
) : (
    <>
        <Text style={styles.title}>{selectedMember?.name}님을 내보낼까요?</Text> 
        <Text style={styles.description}></Text>
        <Profile
            name={selectedMember?.name}
            leader={selectedMember?.leader}
            sameName={selectedMember?.sameName}
            image={selectedMember?.image}
            color={selectedMember?.color}
            selected={selectedMember?.leader}
            normal={true}
        />
        <View style={styles.twobuttonwrap}>
            <TwoButton 
                width={360} 
                height={42} 
                textLeft='내보내기' 
                textRight='취소'
                onPressLeft={fetchKickout} // 내보내기 로직 추가 가능
                onPressRight={closeBottomSheet}
            />
        </View>
    </>
)}

                </View>
            </CustomBottomSheet>
        ) : null}
    </>);
};

export default TravelManage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex:1,
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
        width: 135,
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
    memoInput: {
        width: 351,
        height: 140,
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginTop: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    leaderText: {
        fontFamily: theme.fonts.extrabold,
        fontSize: 17,
        color: '#1D1D1F',
        marginTop: 20,
    },
    leaderSubText:{
        fontFamily: 'SUIT-SemiBold', 
        marginTop:10,
        fontSize: 12,
        color: '#AAAAAA',
    },
    profileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 20,
    },
    profileWrapper: {
        position: 'relative',
    },
    manageIcon: {
        position: 'absolute',
        top: 0,
        right: -5,
        width: 20,
        height: 20,
    },
    addButton: {
        width: 76,
        height: 87,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    memeberInvite:{
        width:20,
        height:20,
    },
    textInvite: {
        fontFamily: 'SUIT-SemiBold', 
        fontSize: 12,
        color: '#999999',
        marginTop:8,
    },
    invitePopup: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: 343,
        height: 61,
        backgroundColor: '#6E6E6E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    invitePopupTextBold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    invitePopupTextMedium: {
        fontSize: 13,
        fontWeight: '500',
        color: '#CCCCCC',
    },
    bottomSheetContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: theme.fonts.extrabold,
        fontSize: 19,
        color: '#1D1D1F',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        color: '#838383',
        marginBottom: 25,
        marginLeft:-20,
        marginRight:-20,
    },
    twobuttonwrap:{
        marginTop:30,
        marginLeft:10,
    }
});
