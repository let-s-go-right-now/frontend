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

const ManageForInvite = (navigation) => {
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

    const tripData = {
        tripName: "부산바캉스",
        startDate: "08. 12",
        endDate: "08. 15",
        memo: "해운대에서 걸스나잇",
        leader: true,
        members: [
            { name: "홍길동", leader: true, sameName: false, image: profileImage1, color: "blue", onPress: () => {} },
            { name: "김철수", leader: false, sameName: false, image: profileImage2, color: "red", onPress: () => {} },
            { name: "이영희", leader: false, sameName: true, image: profileImage3, color: "green", onPress: () => {} },
        ],
    };
    const { tripName, startDate, endDate, memo, members } = tripData;

    const handleInvitePress = () => {
        setInvitePopupVisible(true);
        setTimeout(() => {
            setInvitePopupVisible(false);
        }, 3000);
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
            <Text style={styles.leaderText}>이번 여행에서 방장을 맡았어요</Text>
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
        <Text style={styles.description}>함께 떠날 멤버를 초대하세요</Text>
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

export default ManageForInvite;

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
