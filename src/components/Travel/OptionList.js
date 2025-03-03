import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { GeneralOptionButton } from '..';

const OptionList = ({ options }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={styles.optionsScrollContainer}>
 <FlatList
      data={options}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()} // id를 문자열로 변환
      renderItem={({ item }) => (
        <GeneralOptionButton
          key={item.id}
          text={item.text}
          OptionImage={selectedId === item.id ? item.image_clicked : item.image}
          onPress={() => setSelectedId(item.id)}
          isSelected={selectedId === item.id}
          style={styles.optionButton}
        />
      )}
    />
        
    </View>
   
  );
};

const styles = StyleSheet.create({
  optionsScrollContainer: {
    width: 200,
    marginRight: 40,
  },
  optionButton: {
    // 버튼 스타일 정의
  },
});

export default OptionList;
