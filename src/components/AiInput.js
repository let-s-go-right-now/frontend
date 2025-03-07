import React from 'react';
import { TextInput, StyleSheet, View, Text, Image } from 'react-native';

const AiInput = ({ label, placeholder, value, onChangeText, icon }) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {/* 이미지 아이콘이 있을 경우 왼쪽에 표시 */}
        {icon && <Image source={icon} style={styles.icon}  resizeMode="contain"/>}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : {}]} // 아이콘이 있으면 추가 스타일 적용
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={'#E8E8E8'} // placeholder 색상 변경

        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
    width: 120,
    height: 52,
  },
  label: {
    paddingTop: 4,
    fontSize: 12,
    fontWeight: 'medium', 
    color: '#E8E8E8',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    position: 'relative',
  },
  icon: {
    width: 12,
    height: 12,
    position: 'absolute',
    left: 6, 
    zIndex: 1, 
  },
  input: {
    height: 34,
    backgroundColor: '#363638',
    fontSize: 13,
    fontWeight: 'regular', 
    color: '#E8E8E8',
    paddingLeft: 30,
    flex: 1,
    marginRight: 10, 
  },
  inputWithIcon: {
    paddingLeft: 23, // 아이콘이 있을 경우 여백 추가
  },
});

export default AiInput;
