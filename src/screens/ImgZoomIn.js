import React, { useCallback, useRef } from 'react';
import { StyleSheet,View, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CloseGray from '../assets/icons/user/close_gray.png';

const ImgZoomIn = ({ navigation,image}) => {

  return (
    <GestureHandlerRootView style={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={()=>navigation.goback()} style={{ position: 'absolute', right: 16 }}>
              <Image source={CloseGray} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>   
          <Image source={image} resizeMode='contain'/>
        </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // 화면 전체 덮기
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경 추가
    justifyContent: 'flex-end', // 바텀시트가 아래쪽에 오도록 설정
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default ImgZoomIn;