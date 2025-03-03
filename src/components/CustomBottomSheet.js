import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types'; 

const CustomBottomSheet = ({ children, onSheetChange, snapPoints, isOpen }) => {
  const bottomSheetRef = useRef(null);

  // Callback to handle sheet changes
  const handleSheetChanges = useCallback((index) => {
    if (onSheetChange) {
      onSheetChange(index);
    }
  }, [onSheetChange]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {isOpen && ( // isOpen이 true일 때만 BottomSheet를 렌더링
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints || ['50%']}
          enablePanDownToClose={true} // 스와이프 시 닫히도록 설정
        >
          <BottomSheetView style={styles.contentContainer}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // 화면 전체 덮기
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경 추가
    justifyContent: 'flex-end', // 바텀시트가 아래쪽에 오도록 설정
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

// PropTypes 정의
CustomBottomSheet.propTypes = {
  children: PropTypes.node.isRequired, // children은 반드시 전달되어야 함
  onSheetChange: PropTypes.func, // onSheetChange는 함수형 prop
  snapPoints: PropTypes.arrayOf(PropTypes.string), // snapPoints는 문자열 배열
  isOpen: PropTypes.bool.isRequired, // isOpen은 boolean 타입, 반드시 전달되어야 함
};

export default CustomBottomSheet;
