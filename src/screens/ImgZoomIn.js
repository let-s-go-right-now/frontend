import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet,View, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, Text } from 'react-native-gesture-handler';
import CloseGray from '../assets/icons/user/close_gray.png';
import { useTabBarNone } from '../utils';

const ImgZoomInTab = ({ navigation,route}) => {
  const {imageIndex, images} = route.params;
  useTabBarNone(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', right: 16 }}>

          <Image source={CloseGray} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text style={styles.imageText} >이미지 상세보기</Text>
        <Image 
          source={{ uri: images[imageIndex] }} 
          resizeMode="contain" 
          style={styles.imgconetent} 
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // 화면 전체 덮기
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 반투명 배경 추가
    justifyContent: 'flex-end', // 바텀시트가 아래쪽에 오도록 설정
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
    position:'relative',
  },
  imageText:{
    color: 'white',

  },
  imgconetent:{
    maxWidth:363,
    maxHeight:600,
  }
});

export default ImgZoomInTab;