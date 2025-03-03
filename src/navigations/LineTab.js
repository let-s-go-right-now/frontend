import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LineTab = ({ tabs, selectedTab, onSelect }) => {
  const navigation = useNavigation(); 

  // 진행 중 -> 완료 페이지 이동
  const naviToCompleted = () => {
    navigation.navigate('TravelCompleted');
  };

  // 진행 중 -> ongoing 페이지 이동
  const naviToOngoing = () => {
    navigation.navigate('TravelOngoing');
  };

  // Tab 선택 시 처리 함수
  const handleTabSelect = (tab) => {
    onSelect(tab); // 부모 상태 업데이트
    if (tab === '완료') {
      naviToCompleted(); // '완료' 탭 클릭 시 TravelCompleted 페이지로 이동
    } else if (tab === '진행 중') {
      naviToOngoing(); // '진행 중' 탭 클릭 시 TravelOngoing 페이지로 이동
    }
  };

  return (
    <View style={styles.lineTabWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.containerWrapper}>
          {tabs.map((text, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabSelect(text)} // 부모 상태 업데이트 후 이동 처리
              style={[
                styles.container,
                selectedTab === text && styles.selectedContainer,
              ]}
            >
              <Text style={[styles.title, selectedTab === text && styles.selectedTitle]}>
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  lineTabWrapper: {
    height: 30,    
    width:380,
    borderBottomWidth:1,
    borderBottomColor:'#F4F4F4',
  },
  containerWrapper: {
    flexDirection: "row",
    paddingLeft:10,
    gap: 20,
  },
  container: {
    height: 28,
    justifyContent: "center",
  },
  selectedContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#363638",
  },
  title: {
    fontFamily: "SUIT-SemiBold",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: 17,
  },
  selectedTitle: {
    fontFamily: "SUIT-Bold",
    color: "#363638",
  },
});

export default LineTab;
