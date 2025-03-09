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
  height: ${(props) => props.height || '50px'};
  width: ${(props) => props.width}px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
  position: relative;
  gap: 4px;
  font-weight: bold;
  font-size: 16px;
  border-width: 1px;
  border-color: #1D1D1F;
  border-style: solid;
`;

const Title = styled.Text`
  font-size: 17px;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  font-family: 'SUIT-Bold';
  line-height: 23.8px;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const BigTwoButton = ({ width, height, textLeft, textRight, imageLeft, imageRight, bgColorLeft, bgColorRight, RightOnpress,LeftOnpress }) => {
  const leftWidth = (width / 2) - 10;
  const rightWidth = (width / 2) - 10;

  return (
    <ButtonContainer width={width}>
      <Button width={leftWidth} bgColor={bgColorLeft || '#1D1D1F'} height={height} onPress={LeftOnpress}>
        <Title color="#FFFFFF">{textLeft}</Title>
        {imageLeft && <IconContainer>{imageLeft}</IconContainer>}
      </Button>
      <Button width={rightWidth} bgColor={bgColorRight || '#FFFFFF'} height={height} onPress={RightOnpress}>
        <Title color="#1D1D1F">{textRight}</Title>
        {imageRight && <IconContainer>{imageRight}</IconContainer>}
      </Button>
    </ButtonContainer>
  );
};

BigTwoButton.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.string,
  textLeft: PropTypes.string.isRequired,
  textRight: PropTypes.string.isRequired,
  imageLeft: PropTypes.node,
  imageRight: PropTypes.node,
  bgColorLeft: PropTypes.string,
  bgColorRight: PropTypes.string,
};

export default BigTwoButton;
