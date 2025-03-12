import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CustomBottomSheet, Profile, TwoButton } from '../../components';
import CalendarIcon from "../../assets/icons/calender-black.png";
import profileImage1 from "../../assets/profileImgs/profileImg01.png";
import profileImage2 from "../../assets/profileImgs/profileImg02.png";
import profileImage3 from "../../assets/profileImgs/profileImg03.png";
import ProfileManageIcon from "../../assets/icons/travel/ProfileManageIcon.png";
import memberInvite from "../../assets/icons/travel/memberInvite.png";
import { theme } from '../../theme';
import { TextInput } from 'react-native-gesture-handler';
import { useTabBarVisibility } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const TravelManage = (navigation) => {
        useTabBarVisibility(false);
    // 바텀시트
    const [isOpen, setIsOpen] = useState(false); // BottomSheet의 열림/닫힘 상태 관리
    const bottomSheetRef = useRef(null); 
    const snapPoints = ['60%']; // 첫번째 요소는 가장 처음 보이는 높이, 나머지는 스와이프하면 늘어나는 정도
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [selectedMember, setSelectedMember] = useState(null); //선택된 멤버
    const [nextBottomsheet, setNextBottomsheet] = useState('기본'); // 바텀시트 상태 관리
    
    // tabbar 삭제
    useTabBarVisibility(false);

    const [invitePopupVisible, setInvitePopupVisible] = useState(false);
 //특정 여행 id로 보내기
 const [travelDetailData, setTravelDetailData] = useState([]);  
 const [tripName, setTripName] = useState('');
 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);
 const [members, setMembers] = useState([]);
     const [ownerEmail,setOwnerEmail] = useState('');
 
  // 날짜 포맷을 MM.DD 형식으로 변경하는 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr); // 날짜 문자열을 Date 객체로 변환
    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
    const day = date.getDate(); // 일
    return `${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`; // 12.20 형태로 반환
  };
const calculateDays = (startDate, endDate) => {
 const start = new Date(startDate);
 const end = new Date(endDate);
 const timeDifference = end - start;
 const days = timeDifference / (1000 * 3600 * 24);
 return days;
};

  const [loading, setLoading] = useState(true);

   //selectedId가 변경될때마다 asyncstorage에
   // selectedId가 변경될 때마다 호출되는 fetchTravelData 함수
   const fetchTravelData = async () => {
     try {
       const token = await AsyncStorage.getItem('jwtToken');
       if (!token) {
         console.log('토큰이 없습니다.');
         return;
       }

       // selectedId 값이 변경될 때마다 AsyncStorage에 'tripId'로 저장
       const selectedId = await AsyncStorage.getItem('tripId');


       // API 호출 URL을 selectedId에 맞춰 동적으로 설정
       const response = await fetch(`https://letsgorightnow.shop/api/trip/${selectedId}`, {
         method: 'GET',
         headers: {
           'Authorization': `${token}`,
           'Content-Type': 'application/json',
         },
       });

       const result = await response.json();
       console.log('서버 응답:', result);
       if (result.isSuccess) {
         const expenses = result.result.expenses.map(expense => ({
           title: expense.expenseName,
           category: expense.category === 'TRANSPORTATION' ? '교통' : expense.category, // 예시로 'TRANSPORTATION'을 '교통'으로 변환
           cost: `${expense.price.toLocaleString()}원`,  // 가격을 원 단위로 표시
           date: formatDate(expense.expenseDate),  // 날짜 포맷
         }));
         setTravelDetailData(result.result);
         console.log(travelDetailData);
         setTripName(result.result.name)
        setStartDate(formatDate(result.result.startDate)); // startDate 포맷 변경
          setEndDate(formatDate(result.result.endDate));
       } else {
         console.error('데이터 가져오기 실패:', result.message);
       }
     } catch (error) {
       console.error('에러 발생:', error);
     } finally {
       setLoading(false);
     }
   };


    // 여행 참여자 목록을 가져오는 함수
    const fetchTripMembers = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
                console.log('토큰이 없습니다.');
                return;
            }

            const tripId = await AsyncStorage.getItem('tripId');
            if(!tripId){
                console.log('tripID가 없습니다');
            }
            console.log("여행번호"+tripId)

            const response = await axios.get(
                `https://letsgorightnow.shop/api/trip/${tripId}/trip-member`,
                {
                    headers: {
                        'Authorization': `${token}`,
                    },
                }
            );

            if (response.data.isSuccess) {
                setOwnerEmail(response.data.result.owner.email); 
                // response에서 멤버 목록을 가져와서 원하는 형태로 변환
                const updatedMembers = response.data.result.tripMembers.map((member) => ({
                    email: member.email, // email을 id로 사용
                    name: member.name,
                    image: member.profileImageUrl || 'default_image_url', // profileImageUrl이 없으면 기본 이미지 URL 사용
                }));
                setMembers(updatedMembers); // 상태에 멤버 목록 업데이트
            } else {
                console.log('여행 참여자 목록을 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching trip members:', error);
            // 상태 코드 확인을 위해 오류 응답의 상태 코드도 출력
            
                console.log('Error Status 멤버:', error.status); // 오류 상태 코드 출력
            
            
        }
    };

    //이름 같은 멤버 색 부여
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#F8FF33', '#FF33F6',
        '#33FFF2', '#F433FF', '#FF8333', '#F3FF33', '#33F6FF'
    ];
    
    // 멤버 목록에서 이름이 같은 멤버에게 색상 부여하기
    const assignColors = (members) => {
        const nameCount = {}; // 각 이름의 등장 횟수 저장
        const updatedMembers = members.map((member, index) => {
            if (member.sameName) {
                // 이름이 같은 멤버가 있을 때 색상 순서대로 부여
                if (nameCount[member.name]) {
                    nameCount[member.name]++;
                } else {
                    nameCount[member.name] = 0;
                }
                // 색상은 순서대로 10개만 사용
                member.color = colors[nameCount[member.name] % colors.length];
            }
            return member;
        });
    
        return updatedMembers;
    };
    
    // 화면이 포커스될 때마다 fetchTripMembers 호출
    useFocusEffect(
        React.useCallback(() => {
            fetchTravelData();
            fetchTripMembers(); // 화면이 다시 포커스될 때마다 참여자 목록을 가져옵니다.
            if (members.length > 0) {
                const updatedMembers = assignColors(members);
                setMembers(updatedMembers);  // 색상 부여된 멤버 목록을 상태에 업데이트
                console.log("멤버sms"+members);
            }
        }, [])
    );

    const handleInvitePress = async () => {
        try {
            // 사용자 토큰 가져오기
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
                console.log('토큰이 없습니다.');
                return;
            }
    
            const tripId = await AsyncStorage.getItem('tripId');
            if (!tripId) {
                console.log('tripId가 없습니다');
                return;
            }
    
            // 초대 링크 API 요청
            const response = await axios.post(
                `https://letsgorightnow.shop/api/trip/${tripId}/invite`, 
                {}, // RequestBody가 필요 없으므로 빈 객체 전달
                {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (response.data.isSuccess) {
                // 초대 링크 생성 성공
                console.log('초대 링크:', response.data.result.invitelink);
                setInvitePopupVisible(true); // 초대 링크 팝업을 표시
                console.log(response.data);
                setTimeout(() => {
                    setInvitePopupVisible(false); // 3초 후 팝업을 닫음
                }, 3000);
            } else {
                console.log('초대 링크 생성 실패:', response.data.message);
            }
        } catch (error) {
            console.error('초대 링크 생성 중 에러 발생:', error);
        }
    };
    

    // 멤버 선택, 팝업열기
    const handleProfilePress = (member) => {
        setSelectedMember(member); // 선택된 멤버 설정
        setIsOpen(true); // BottomSheet 열기
        bottomSheetRef.current?.expand(); // BottomSheet 확장
    };

    // 바텀시트 닫기
    const closeBottomSheet = () => {
        setIsOpen(false);
        setNextBottomsheet('기본');
    };

    // 방장 위임하기 함수
    const fetchMandate = () => {
        // 여기에 방장 위임 로직을 작성
        setIsOpen(false);
        setNextBottomsheet('기본');
    };

    //내보내기 관리함수
    const fetchKickout = () => {
        // 여기에 방장 위임 로직을 작성
        setIsOpen(false);
        setNextBottomsheet('기본');
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
                onPressRight={() => setNextBottomsheet('내보내기')} // 변경된 부분
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
