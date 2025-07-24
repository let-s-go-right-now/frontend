import React, { useCallback, useImperativeHandle, forwardRef, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';

// forwardRef로 감싸면서 ref를 받아 내부 BottomSheet ref에 연결합니다.
const CustomBottomSheet = forwardRef(({ children, onSheetChange, snapPoints, isOpen }, ref) => {
  const bottomSheetRef = useRef(null);

  // 부모 컴포넌트가 사용하는 메서드나 속성을 노출
  useImperativeHandle(ref, () => ({
    // 예: expand 함수 노출
    expand: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
    // 필요하면 다른 메서드 추가 가능
  }));

  const handleSheetChanges = useCallback((index) => {
    if (onSheetChange) {
      onSheetChange(index);
    }
  }, [onSheetChange]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints || ['50%']}
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.contentContainer}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      )}
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

CustomBottomSheet.propTypes = {
  children: PropTypes.node.isRequired,
  onSheetChange: PropTypes.func,
  snapPoints: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool.isRequired,
};

export default CustomBottomSheet;
