import React from 'react';
import { View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import DeleteButton from '../assets/icons/travel/DeleteButton.png'; // 삭제 버튼 이미지

const ImgSlideUpload = ({ images, itemsToShow, scale = 100, handleDeleteImage }) => {
    const screenWidth = Dimensions.get('window').width;
    const baseSize = screenWidth / itemsToShow - 10; // 기본 크기에서 간격 고려
    const imageSize = (baseSize * scale) / 100; // 비율 적용하여 크기 조정

    // marginRight 값 설정: itemsToShow가 2일 때만 10, 아니면 5
    const getMarginRight = () => (itemsToShow === 2 ? 10 : 5);

    const renderItem = ({ item }) => (
        <View
            style={{
                width: imageSize,
                height: imageSize,
                marginRight: getMarginRight(), // 조건에 맞는 marginRight 값 적용
                position: 'relative', // 삭제 버튼을 이미지 위에 위치시키기 위해 사용
            }}
        >
            <Image
                source={{ uri: item.uri }} // 이미지 URI를 직접 참조
                style={{
                    width: imageSize,
                    height: imageSize,
                    resizeMode: 'contain',
                }}
            />
            {/* 삭제 버튼 추가 */}
            <TouchableOpacity
                onPress={() => handleDeleteImage(item.uri)} // 이미지 삭제 함수 호출
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 35,
                    width: 25,
                    height: 25,
                }}
            >
                <Image
                    source={DeleteButton}
                    style={{
                        width: '50',
                        height: '100%',
                        resizeMode: 'contain',
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

export default ImgSlideUpload;
