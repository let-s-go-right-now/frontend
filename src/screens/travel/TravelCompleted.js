import React from 'react';
import { View, StyleSheet } from 'react-native';
import {TravelComponent} from '../../components';
import image1 from "../../assets/slides/image1.png";
import image2 from "../../assets/slides/image2.png";
import image3 from "../../assets/slides/image3.png";
import image4 from "../../assets/slides/image4.png";
import image5 from "../../assets/slides/image5.png";
import image6 from "../../assets/slides/image6.png";
import profileImg from '../../assets/profileImgs/profileImg01.png';
const travelData = [
  {
    id:1,
    title: '부산바캉스',
    days: '3박 4일',
    cost: '80만',
    images: [image1,image2,image3,image4,image5,image6],
    profileImage: profileImg,
    name: '김보영',
    people: 2,
    date: '24. 08. 12',
  },  {
    id:2,
    title: '부산바캉스',
    days: '3박 4일',
    cost: '80만',
    images: [image1,image2,image3,image4,image5,image6],
    profileImage: profileImg,
    name: '김보영',
    people: 2,
    date: '24. 08. 12',
  },
  {
    id:3,
    title: '부산바캉스',
    days: '3박 4일',
    cost: '80만',
    images: [image1,image2,image3,image4,image5,image6],
    profileImage: profileImg,
    name: '김보영',
    people: 2,
    date: '24. 08. 12',
  },
  {
    id:4,
    title: '부산바캉스',
    days: '3박 4일',
    cost: '80만',
    images: [image1,image2,image3,image4,image5,image6],
    profileImage: profileImg,
    name: '김보영',
    people: 2,
    date: '24. 08. 12',
  },
  // 추가 데이터
];

const TravelCompleted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TravelComponent data={travelData} navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 16,
    borderTopColor:'#F4F4F4',
    borderTopWidth:2,
  },
});

export default TravelCompleted;
