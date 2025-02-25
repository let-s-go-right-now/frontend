import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TravelCompleted = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>완료된 여행</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363638',
  },
});

export default TravelCompleted;
