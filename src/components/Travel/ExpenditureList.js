import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const ExpenditureList = ({ data }) => {
  return (
    <FlatList
      data={data} // data로 받은 항목을 FlatList의 데이터로 사용
      renderItem={({ item }) => (
        <View style={styles.expenditureItem}>
          <View style={styles.row}>
            <Text style={styles.expenditureTitle}>{item.title}</Text>
            <Text style={styles.expenditureCategory}>{item.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.expenditureCost}>{item.cost}</Text>
            <Text style={styles.expenditureDate}>{item.date}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()} // 고유 key 생성
    />
  );
};

const styles = StyleSheet.create({
  expenditureItem: {
    backgroundColor: "#FFFFFF",
    width: 362,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 항목들 사이 간격 조정
  },
  expenditureTitle: {
    fontWeight: "bold",
    color: "#363638",
    fontSize: 17,
  },
  expenditureCategory: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 15,
    color: "#838383",
    marginRight: 5,
  },
  expenditureCost: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 15,
    color: "#838383",
  },
  expenditureDate: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 12,
    color: "#AAAAAA",
    marginRight: 5,
  },
});

export default ExpenditureList;
