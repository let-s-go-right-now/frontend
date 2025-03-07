import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const AiInputButton = ({ text, onPress, isOpen, icon }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>일정이 어떻게 되나요?</Text>
      <TouchableOpacity
        style={[styles.button, isOpen ? styles.buttonOpen : styles.buttonClosed]}
        onPress={onPress}
      >
        {/* 아이콘이 있을 경우 왼쪽에 표시 */}
        {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 135,
    height: 60,
    flexDirection: 'column',
  },
  label: {
    paddingTop: 4,
    fontSize: 12,
    fontWeight: 'medium', 
    color: '#E8E8E8',
    marginBottom: 5,
  },
  button: {
    height: 52,
    backgroundColor: '#363638',
    fontSize: 13,
    fontWeight: 'regular', 
    color: '#E8E8E8',
    paddingLeft: 5,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'start'
  },
  buttonOpen: {
    backgroundColor: '#6C63FF', // 버튼이 활성화되었을 때 색상
  },
  buttonClosed: {
    backgroundColor: '#363638', // 버튼이 비활성화되었을 때 색상
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#E8E8E8',
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8, // 아이콘과 텍스트 사이에 여백을 추가
  },
});

export default AiInputButton;
