import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { GeneralOptionButton } from '..';

const OptionList = ({ options, selectedId, setSelectedId, Buttonwidth, containerWidth }) => {
  console.log(options);
  return (
    <View style={[styles.optionsScrollContainer, { width: containerWidth }]}>
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
            onPress={() => setSelectedId(item.id)} // 선택된 아이템 ID 업데이트
            isSelected={selectedId === item.id}
            style={{ width: Buttonwidth }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  optionsScrollContainer: {
    marginRight: 40,
  },
});

export default OptionList;
