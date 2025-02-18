import React, { useState } from 'react';
import { View, Button, StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {ImgSlide} from '../components';

import image1 from "../assets/slides/image1.png";
import image2 from "../assets/slides/image2.png";
import image3 from "../assets/slides/image3.png";
import image4 from "../assets/slides/image4.png";
import image5 from "../assets/slides/image5.png";
import image6 from "../assets/slides/image6.png";

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Travel = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [images] = useState([image1, image2, image3, image4, image5, image6]);
  const [itemsToShow] = useState(3); // 한 번에 보여줄 이미지 개수
    const [scale ] = useState(100);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Container style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top }}>
        <StyledText>Travel</StyledText>
        <View style={{ flex: 1, paddingLeft:10,paddingRight:10}}>
          <ImgSlide images={images} itemsToShow={itemsToShow} scale={scale} />
        </View>
      </Container>
    </>
  );
};

export default Travel;
