import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TravelCard = ({ title, days, cost, image, profileImage, participant, extraCount, startDate }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowspace}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.days}>{days}박 {days + 1}일</Text>
      </View>
      <View style={styles.rowspace}>
        <Text style={styles.costLabel}>총지출</Text>
        <Text style={styles.cost}>| {cost}원</Text>
      </View>
      <Image source={image} style={styles.travelImage} />
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.profilewrpper}>
          <View style={styles.profileTextwrpper}>
            <Text style={styles.participant}>{participant}</Text>
            <Text style={styles.extraCount}> 외 {extraCount}인</Text>
          </View>
          <Text style={styles.startDate}>{startDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 232,
    height: 230,
    backgroundColor: 'white',
    borderColor: '#1D1D1F',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'start',
    marginRight: 10,
    padding: 10,
  }, 
  rowspace:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom:10,
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
  profilewrpper:{
    width:190,
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  profileTextwrpper:{
    flexDirection:'row',
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