import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ImgSlide } from '../components';

import image1 from '../assets/slides/image1.png';
import image2 from '../assets/slides/image2.png';
import image3 from '../assets/slides/image3.png';
import image4 from '../assets/slides/image4.png';
import image5 from '../assets/slides/image5.png';
import image6 from '../assets/slides/image6.png';

const TravelOngoing = () => {
  const [images] = useState([image1, image2, image3, image4, image5, image6]);
  const [itemsToShow] = useState(3); // 한 번에 보여줄 이미지 개수
  const [scale] = useState(100);

  return (
    <View style={styles.slideContainer}>
      <Text>진행중</Text>
      <ImgSlide images={images} itemsToShow={itemsToShow} scale={scale} />
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default TravelOngoing;
