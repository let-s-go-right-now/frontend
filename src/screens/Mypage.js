import React, { useState, useCallback, useRef } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';
import { CustomBottomSheet, TwoButton } from '../components';

const Mypage = () => {
  const [isOpen, setIsOpen] = useState(false); // BottomSheet의 열림/닫힘 상태 관리
  const [topComponentWidth, setTopComponentWidth] = useState(0); // 상단 컴포넌트의 너비 상태
  const bottomSheetRef = useRef(null); 
  const snapPoints = ['40%', '50%']; // 첫번째 요소는 가장 처음 보이는 높이, 나머지는 스와이프하면 늘어나는 정도

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = () => {
    setIsOpen(!isOpen);
    bottomSheetRef.current?.expand();
  };

  // 상단 컴포넌트의 크기를 측정
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTopComponentWidth(width); // 상단 컴포넌트의 너비 상태 업데이트
  };

  return (
    <>
      <View style={styles.topComponent} onLayout={onLayout}>
        <Button title="열기버튼" onPress={openBottomSheet} />
      </View>
      {isOpen ? (
        <CustomBottomSheet ref={bottomSheetRef} onSheetChange={handleSheetChanges} snapPoints={snapPoints} isOpen={isOpen}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          {/* 상단 컴포넌트의 width를 TwoButton에 전달 */}
          <TwoButton 
            onPress={openBottomSheet} 
            width={topComponentWidth - 20}
            height={50}
            textLeft="왼쪽 버튼" 
            textRight="오른쪽 버튼" 
          />
          <Button title="닫기버튼" onPress={openBottomSheet} />
        </CustomBottomSheet>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  topComponent: {
    padding: 10,
    backgroundColor: 'lightgray',
  },
});

export default Mypage;
