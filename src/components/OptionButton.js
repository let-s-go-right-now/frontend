import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const OptionButtonWarpper = styled.View`
    display: flex;
    flex-direction: row;
    gap: 8px;
`

const Container = styled(TouchableOpacity)`
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: ${({isSelected}) => (isSelected ? '#1D1D1F' : '#EEEEEE')};
`

const Title = styled.Text`
    font-size: 13px;
    font-family: "SUIT-SemiBold";
    color: ${({isSelected}) => (isSelected ? '#FFFFFF ' : '#AAAAAA')};
`

const OptionButton = ({ text, OptionImage, onPress, isSelected}) => {
    return (
        <Container onPress={onPress} isSelected={isSelected}>
            <Image source={OptionImage} style={{ width: 14, height: 14, marginRight: 3 }} />
            <Title isSelected={isSelected}>{text}</Title>
        </Container>
    )
}

const CategoryOptionButton = () => {
    const [selectedId, setSelectedId] = useState(1);

    const Category = [
        {
            id: 1,
            text: "교통",
            image: require('../assets/images/transport.png'),
            image_clicked: require('../assets/images/transport_clicked.png'),
        },
        {
            id: 2,
            text: "식사",
            image: require('../assets/images/food.png'),
            image_clicked: require('../assets/images/food_clicked.png'),
        },
        {
            id: 3,
            text: "관광",
            image: require('../assets/images/tour.png'),
            image_clicked: require('../assets/images/tour_clicked.png'),
        },
        {
            id: 4,
            text: "쇼핑",
            image: require('../assets/images/shopping.png'),
            image_clicked: require('../assets/images/shopping_clicked.png'),
        },
        {
            id: 5,
            text: "숙소",
            image: require('../assets/images/acmdation.png'),
        image_clicked: require('../assets/images/acmdation_clicked.png'),
    },
        {
            id: 6,
            text: "기타",
            image: require('../assets/images/etc.png'),
            image_clicked: require('../assets/images/etc_clicked.png'),
        },
    ]

    return (
        <OptionButtonWarpper>
            {Category.map((option) => (
                <OptionButton
                    key={option.id}
                    text={option.text}
                    OptionImage={selectedId === option.id ? option.image_clicked : option.image}
                    onPress={() => setSelectedId(option.id)}
                    isSelected={selectedId === option.id}
                />
            ))}
        </OptionButtonWarpper>
    )
}

export { OptionButton, CategoryOptionButton };