import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import profileImg01 from '../assets/profileImgs/profileImg01.png';
import profileImg02 from '../assets/profileImgs/profileImg02.png';
import profileImg03 from '../assets/profileImgs/profileImg03.png';

const ProfileImgDump = () => {
  const images = [
    { source: profileImg01, id: 1 },
    { source: profileImg02, id: 2 },
    { source: profileImg03, id: 3 },
  ];

  return (
    <View style={styles.profileImgWrapper}>
      {images.map((image, index) => (
        <Image
          key={image.id}
          source={image.source}
          style={[styles.profileImage, { left: index * 25, zIndex: images.length - index }]} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  profileImgWrapper: {
    flexDirection: 'row',
    position: 'relative',
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
  },
});

export default ProfileImgDump;
