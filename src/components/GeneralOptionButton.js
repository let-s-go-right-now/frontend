import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';


// GeneralOptionButton: 개별 옵션 버튼 컴포넌트
const GeneralOptionButton = ({ text, OptionImage, onPress, style,isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        isSelected ? styles.selectedContainer : styles.defaultContainer,
        { paddingLeft: OptionImage ? 20 : 0 }, // 이미지 유무에 따른 padding 적용
      ]}
    >
      {OptionImage && <Image source={OptionImage} style={styles.image} />}
      <Text style={[styles.title, isSelected ? styles.selectedTitle : styles.defaultTitle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButtonWrapper: {
    flexDirection: 'row'
  },
  container: {
    width: 86,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:10,
  },
  defaultContainer: {
    backgroundColor: '#EEEEEE',
  },
  selectedContainer: {
    backgroundColor: '#1D1D1F'
  },
  image: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 14,
    fontFamily: 'SUIT-SemiBold',
  },
  defaultTitle: {
    color: '#AAAAAA',
  },
  selectedTitle: {
    color: '#FFFFFF',
  },
});

export default GeneralOptionButton ;
