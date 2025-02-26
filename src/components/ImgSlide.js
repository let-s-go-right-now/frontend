import React from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';

const ImgSlide = ({ images, itemsToShow, scale = 100 }) => {
    const screenWidth = Dimensions.get('window').width;
    const baseSize = screenWidth / itemsToShow - 10; // 기본 크기에서 간격 고려
    const imageSize = (baseSize * scale) / 100; // 비율 적용하여 크기 조정

    const renderItem = ({ item }) => (
        <View
            style={{
                width: imageSize,
                height: imageSize,
                marginRight: 5, // 좌우 간격 유지
            }}
        >
            <Image
                source={item}
                style={{
                    width: imageSize,
                    height: imageSize,
                    resizeMode: 'contain',
                }}
            />
        </View>
    );

    return (
        <View style={{ height:imageSize, marginLeft:8, marginRight:8}}>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
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
