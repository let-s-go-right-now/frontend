import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const OpenToggle = ({ options, defaultOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity onPress={toggleOpen} style={[styles.toggleButton]}>
        <Text style={styles.toggleButtonText}>{selectedOption}</Text>
        <Image
          source={require('../assets/icons/toggleIcon.png')}
          style={[styles.toggleIcon, isOpen && styles.iconRotated]}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleSelectOption(option)}
            >
              <Text style={styles.optionButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    position: "relative",
    flex: 1,
  },
  toggleButton: {
    position: "absolute",
    right: 0,
    top: -5,
    flexGrow: 0,
    width: 82,
    height: 32,
    justifyContent: "center",
    paddingLeft: 8,
    alignItems: "left",
    shadowColor: "#1D1D1F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    backgroundColor: "#fff",
    
  },
  toggleButtonText: {
    color: "#1D1D1F",
    fontFamily: "SUIT-SemiBold", // 폰트 적용
    fontSize: 13, // 폰트 크기 적용
  },
  optionsContainer: {
    position: "absolute",
    top: "90%", // 위치 조정
    left: -45,
    width: 82,
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
    maxHeight: 200,
  },
  optionButton: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft:8
  },
  optionButtonText: {
    color: "#1D1D1F",
    fontFamily: "SUIT-SemiBold", // 폰트 적용
    fontSize: 13, // 폰트 크기 적용
  },
  toggleIcon: {
    position: "absolute",
    right: 5,
    transition: "transform 0.3s ease", // 애니메이션 추가
  },
  iconRotated: {
    transform: [{ rotate: "180deg" }], // 토글 상태에 따라 180도 회전
  },
});

export default OpenToggle;
