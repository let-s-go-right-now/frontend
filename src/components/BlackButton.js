import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const BlackButton = ({ text, width, image, onPress, style, ready = true }) => {
    const [isPressed, setIsPressed] = useState(false); // 눌렸는지 상태 관리

    return (
        <TouchableOpacity
            style={[styles.container, { width }, isPressed && styles.pressed, style]} // 스타일 적용
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}  // 버튼 눌렸을 때
            onPressOut={() => setIsPressed(false)} // 버튼에서 손 뗄 때
        >
            {image && <Image style={styles.image} source={image}/>}
            <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
    );
};

BlackButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    image: PropTypes.node,
    onPress: PropTypes.func,
    style: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ${({ready}) => ready ? 'rgba(29, 29, 31, 1)' : 'rgba(29, 29, 31, 0.2)'};
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    pressed: {
        backgroundColor: 'rgba(29, 29, 31, 0.1)',  // 눌렸을 때 배경색 변화
    },
    title: {
        fontSize: 17,
        color: '#FFFFFF',
        fontFamily: 'SUIT-Bold',
        lineHeight: 23.8,
    },
    image: {
        height: 18,
        width: 18,
        marginRight: 4,
    }
});

export default BlackButton;
