import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const AiButton = ({ label, icon, onPress, width = 89, isSelected }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(!isClicked);
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.button, { width }, isSelected && styles.buttonClicked]} // isSelected로 스타일 변경
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Image source={icon} style={[styles.icon, isSelected && styles.iconClicked]} />
      </View>
      <Text style={[styles.text, isSelected && styles.textClicked]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    margin: 0,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#363638',
    borderColor: '#555555',
    borderWidth: 1,
    paddingLeft: 5,
    marginRight: 10,
  },
  buttonClicked: {
    borderColor: '#fff',
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: '#838383',
  },
  iconClicked: {
    tintColor: '#fff',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#838383',
  },
  textClicked: {
    color: '#fff',
  },
});

export default AiButton;
