import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TravelCard = ({ title, days, cost, image, profileImage, participant, extraCount, startDate }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.days}>{days}박 {days + 1}일</Text>
      <Text style={styles.costLabel}>총지출</Text>
      <Text style={styles.cost}>| {cost}원</Text>
      <Image source={image} style={styles.travelImage} />
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.participant}>{participant}</Text>
        <Text style={styles.extraCount}> 외 {extraCount}인</Text>
        <Text style={styles.startDate}>{startDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 232,
    height: 232,
    backgroundColor: 'white',
    borderColor: '#1D1D1F',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  days: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  costLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
  },
  cost: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555555',
  },
  travelImage: {
    width: 208,
    height: 110,
    marginVertical: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 5,
  },
  participant: {
    fontSize: 12,
    fontWeight: '500',
    color: '#363638',
  },
  extraCount: {
    fontSize: 12,
    fontWeight: '500',
    color: '#363638',
  },
  startDate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999999',
    marginLeft: 'auto',
  },
});

export default TravelCard;