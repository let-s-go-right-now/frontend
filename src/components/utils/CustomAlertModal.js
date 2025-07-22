import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 80%;
  max-width: 340px;
  min-width: 260px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  align-items: center;
  elevation: 6;
`;

const Msg = styled.Text`
  font-size: 16px;
  color: #222;
  margin-bottom: 24px;
`;

const ConfirmBtn = styled.TouchableOpacity`
  padding: 10px 28px;
  background: #222;
  border-radius: 8px;
`;

const ConfirmTxt = styled.Text`
  color: #fff;
  font-weight: bold;
`;
const DimmedBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;


const CustomAlertModal = ({ visible, onClose, message }) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={onClose}
    >
        <DimmedBackground>
        <Container>
            <Msg>{message}</Msg>
            <ConfirmBtn onPress={onClose}>
            <ConfirmTxt>확인</ConfirmTxt>
            </ConfirmBtn>
        </Container>
        </DimmedBackground>
    </TouchableOpacity>
  </Modal>
);

export default CustomAlertModal;
