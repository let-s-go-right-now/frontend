import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import More from '../../assets/icons/spending/more.png';

const ExpenditureList2 = ({ data }) => {
  const page = 3;
  const [visiblePage, setVisiblePage] = useState(page);

  const addPage = () => {
    setVisiblePage((prev) => Math.min(prev+page, data.length));
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.slice(0, visiblePage)}
        renderItem={({ item }) => (
          <View style={styles.expenditureItem}>
            <View style={styles.row}>
              <Text style={styles.expenditureTitle}>{item.title}</Text>
              <Text style={styles.expenditureCategory}>{item.category}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.expenditureCost}>{item.cost.toLocaleString()}원</Text>
              <Text style={styles.expenditureDate}>{item.date}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {visiblePage < data.length && (
        <TouchableOpacity style={styles.button} onPress={addPage}>
          <Image source={More} style={styles.image}/>
          <Text source={styles.buttonText}>더 보기</Text>
        </TouchableOpacity>        
      )}      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  expenditureItem: {
    backgroundColor: "#FBFBFB",
    width: 343,
    padding: 16,
    marginBottom: 10,
    gap: 9,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  button: {
    backgroundColor: '#FBFBFB',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderColor: '#BBBBBB',
    borderWidth: 0.5,
    width: 343,
    height: 45,
    marginBottom: 10,
  },
  image: {
    width: 18,
    height: 18,
  },
  buttonText: {
    fontFamily: "SUIT-SemiBold",
    fontSize: 15,
    color: '#363638',
  }
});

export default ExpenditureList2;
