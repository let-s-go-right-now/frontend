import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const LineTab = ({ tabs, selectedTab, onSelect }) => {
  return (
    <View style={styles.lineTabWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.containerWrapper}>
          {tabs.map((text, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(text)} // 부모 상태 업데이트
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
