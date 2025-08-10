import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#1D1D1F')};
  height: ${(props) => props.height || '50px'};  /* height 설정 */
  width: ${(props) => props.width}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  font-weight: bold;
  font-size: 16px;
  border-width: 1px;
  border-color: ${(props) => props.disableLeft ? '#1D1D1F' : '#E4E4E4' };
  border-style: solid;
`;

const Title = styled.Text`
  font-size: 17px;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  font-family: 'SUIT-Bold';
  line-height: 23.8px;
`;

const TwoButton = ({ width, height, textLeft, textRight, imageLeft, imageRight, bgColorLeft, bgColorRight, onPressLeft, onPressRight, disableLeft=true }) => {
  const leftWidth = (width / 2) - 10;
  const rightWidth = (width / 2) - 10;

  return (
    <ButtonContainer width={width}>
      <Button width={leftWidth} bgColor={ disableLeft  ? (bgColorLeft || '#1D1D1F') : '#E4E4E4'} height={height} onPress={disableLeft ? onPressLeft : undefined}>
        {imageLeft && imageLeft}
        <Title color="#FFFFFF">{textLeft}</Title>
      </Button>
      <Button width={rightWidth} bgColor={bgColorRight || '#FFFFFF'} height={height} onPress={onPressRight}>
        {imageRight && imageRight}
        <Title color="#1D1D1F">{textRight}</Title>
      </Button>
    </ButtonContainer>
  );
};

TwoButton.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number, // height prop 추가
  textLeft: PropTypes.string.isRequired,
  textRight: PropTypes.string.isRequired,
  imageLeft: PropTypes.node,
  imageRight: PropTypes.node,
  bgColorLeft: PropTypes.string,
  bgColorRight: PropTypes.string,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  disableLeft: PropTypes.bool,
};

export default TwoButton;
