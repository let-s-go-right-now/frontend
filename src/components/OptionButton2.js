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
    background-color: #363638;
    border: 1px solid ${({isSelected}) => (isSelected ? '#FFFFFF' : '#555555')};
    border-radius: 2px;
`

const Title = styled.Text`
    font-size: 13px;
    font-family: "SUIT-SemiBold";
    color: ${({isSelected}) => (isSelected ? '#FFFFFF' : '#838383')};
    font-family: ${({isSelected}) => (isSelected ? 'SUIT-SemiBold' : 'SUIT-Medium')};
`

const OptionButton2 = ({ text, OptionImage, onPress, isSelected}) => {
    return (
        <Container onPress={onPress} isSelected={isSelected}>
            <Image source={OptionImage} style={{ width: 14, height: 14, marginRight: 3 }} />
            <Title isSelected={isSelected}>{text}</Title>
        </Container>
    )
}

const TransportOptionButton = () => {
    const [selectedId, setSelectedId] = useState(1);

    const Category = [
        {
            id: 1,
            text: "대중교통",
            image: require('../assets/icons/spending/transport.png'),
            image_clicked: require('../assets/icons/spending/transport_clicked.png'),
        },
        {
            id: 2,
            text: "자가용",
            image: require('../assets/icons/ai/handle.png'),
            image_clicked: require('../assets/icons/ai/handle_clicked.png'),
        },
    ]

    return (
        <OptionButtonWarpper>
            {Category.map((option) => (
                <OptionButton2
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

export { OptionButton2, TransportOptionButton };