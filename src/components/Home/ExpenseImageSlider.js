import React from 'react';
import { FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ExpenseImageSlider = ({ imageUrls }) => {
  return (
    <FlatList
      data={imageUrls}
      horizontal
      pagingEnabled // 스냅 효과(한 번에 한 아이템씩 넘김)
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image 
          source={{ uri: item }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 200, // 원하는 높이로 조절
  },
});

export default ExpenseImageSlider;
