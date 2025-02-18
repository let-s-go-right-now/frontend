import React, { useCallback, useRef, useState } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import CustomBottomSheet from '../components/CustomBottomSheet';  // CustomBottomSheet 컴포넌트 import

const Mypage = () => {
  const [isOpen, setIsOpen] = useState(false); // BottomSheet의 열림/닫힘 상태 관리
  const bottomSheetRef = useRef(null); 
  const snapPoints = ['40%', '50%']; //첫번째 요소는 가장 처음 보이는 높이, 나머지는 스와이프하면 늘어나는 정도

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // 버튼 클릭 시 BottomSheet를 열기/닫기
  const openBottomSheet = () => {
    setIsOpen(!isOpen);
    bottomSheetRef.current?.expand();  
  };

  return (
    <>
      <Button title="열기버튼" onPress={openBottomSheet} />
      {isOpen ? (
        <CustomBottomSheet ref={bottomSheetRef} onSheetChange={handleSheetChanges} snapPoints={snapPoints} isOpen={isOpen}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Button title="닫기 버튼" onPress={openBottomSheet}></Button>
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
});

export default Mypage;
