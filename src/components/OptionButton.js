import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const OptionButtonWarpper = styled.ScrollView.attrs(() => ({
    horizontal: true,
    contentContainerStyle: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 0,
    },
}))`
    flex: 1;
    margin: 0 auto;
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
            image: require('../assets/icons/spending/transport.png'),
            image_clicked: require('../assets/icons/spending/transport_clicked.png'),
        },
        {
            id: 2,
            text: "식사",
            image: require('../assets/icons/spending/food.png'),
            image_clicked: require('../assets/icons/spending/food_clicked.png'),
        },
        {
            id: 3,
            text: "관광",
            image: require('../assets/icons/spending/tour.png'),
            image_clicked: require('../assets/icons/spending/tour_clicked.png'),
        },
        {
            id: 4,
            text: "쇼핑",
            image: require('../assets/icons/spending/shopping.png'),
            image_clicked: require('../assets/icons/spending/shopping_clicked.png'),
        },
        {
            id: 5,
            text: "숙소",
            image: require('../assets/icons/spending/acmdation.png'),
        image_clicked: require('../assets/icons/spending/acmdation_clicked.png'),
    },
        {
            id: 6,
            text: "기타",
            image: require('../assets/icons/spending/etc.png'),
            image_clicked: require('../assets/icons/spending/etc_clicked.png'),
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