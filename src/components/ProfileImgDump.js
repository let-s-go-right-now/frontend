import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import profileImg01 from '../assets/profileImgs/profileImg01.png';
import profileImg02 from '../assets/profileImgs/profileImg02.png';
import profileImg03 from '../assets/profileImgs/profileImg03.png';

const ProfileImgDump = ({ images = [] }) => {
  // images가 배열이거나 빈 배열일 경우에만 map 실행
  if (!Array.isArray(images)) {
    console.error('images는 배열이어야 합니다.', images);
    return null;  // images가 배열이 아니면 아무것도 렌더링하지 않음
  }

  const num = images.length;

  return (
    <>
      <View style={styles.profileImgWrapper}>
        {images.map((image, index) => (
          <Image
            key={image.id}
            source={image.source} // 변경됨
            style={[
              styles.profileImage,
              { left: index * 25, zIndex: images.length - index },
            ]}
          />
        ))}
      </View>
      
      {/* 이미지 개수가 3개 이상일 때만 num 표시 */}
      {num >= 3 && <Text style={styles.num}>{num}/10</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  profileImgWrapper: {
    flexDirection: 'row',
    position: 'relative',
    marginTop:10,
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
  },
  num: {
    position: 'absolute',
    top: 20,
    left: 80,
    fontSize: 12,
    color: '#CCCCCC',
  },
});

export default ProfileImgDump;
