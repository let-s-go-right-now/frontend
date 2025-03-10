import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BorderWhiteButton = ({ onPressIn, onPressOut, onPress, isPressed, children, ready }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPressed ? styles.buttonPressed : styles.buttonUnpressed,
      ]}
      // onPressIn={onPressIn}  // 부모에서 받은 함수 실행
      // onPressOut={onPressOut} // 부모에서 받은 함수 실행
      onPress={ready ? onPress : null}
      disabled={!ready}
    >
      <Text
        style={[
          styles.buttonText,
          ready ? styles.buttonTextPressed : styles.buttonTextUnpressed,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 37,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
  },
  buttonUnpressed: {
    backgroundColor: 'transparent', // 눌리지 않았을 때 배경을 투명하게
    borderColor: '#555555', // border 색상
  },
  buttonPressed: {
    backgroundColor: '#363638', // 눌렸을 때 배경색
    borderColor: '#FFFFFF', // 눌렸을 때 border 색상
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonTextUnpressed: {
    color: '#555555', // 눌리지 않았을 때 텍스트 색상
  },
  buttonTextPressed: {
    color: '#FFFFFF', // 눌렸을 때 텍스트 색상
  },
});

export default BorderWhiteButton;
