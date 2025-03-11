import React, { useState } from 'react';
import { View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

const ImgSlide = ({ images, itemsToShow, scale = 100, onImagePress }) => {
    const screenWidth = Dimensions.get('window').width;
    const baseSize = screenWidth / itemsToShow - 10; // 기본 크기에서 간격 고려
    const imageSize = (baseSize * scale) / 100; // 비율 적용하여 크기 조정

    // marginRight 값 설정: itemsToShow가 2일 때만 10, 아니면 5
    const getMarginRight = () => (itemsToShow === 2 ? 10 : 5);
    console.log('Images:', images);
    // 아이템을 렌더링하는 함수
    const renderItem = ({ item, index }) => (
        <View
            style={{
                width: imageSize,
                height: imageSize,
                marginRight: getMarginRight(), // 조건에 맞는 marginRight 값 적용
            }}
        >
            <TouchableOpacity onPress={() => onImagePress(index)}>
                <Image
                    source={{ uri: item }}  // 이미지 URL을 uri로 설정
                    style={{
                        width: imageSize,
                        height: imageSize,
                        resizeMode: 'cover',
                    }}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ height: imageSize, marginLeft: 8, marginRight: 8 }}>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // index 사용
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={imageSize + 10} // 간격 포함한 스크롤 간격
                decelerationRate="fast"
            />
        </View>
    );
};

export default ImgSlide;
