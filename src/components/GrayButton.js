import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  background-color: ${(props) => props.bgColor || '#EEEEEE'}; /* 기본 배경색은 #EEEEEE */
  height: ${(props) => props.height || '50px'}; /* 기본 높이는 50px, height prop을 사용 */
  width: ${(props) => props.width}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
`;

const Title = styled.Text`
  font-size: ${(props) => props.fontSize || '17px'};
  color: ${(props) => props.fontColor || '#AAAAAA'}; /* 기본 폰트 색상은 #AAAAAA */
  font-family: 'SUIT-Bold';
  font-weight: ${(props) => props.fontWeight || 'bold'}; /* 기본 폰트 두께는 bold */
  line-height: 23.8px;
`;

const GrayButton = ({ text, width, icon, bgColor, fontColor, fontSize, fontWeight, height }) => {
  return (
    <Container width={width} bgColor={bgColor} height={height}>
      {icon && icon}
      <Title fontColor={fontColor} fontSize={fontSize} fontWeight={fontWeight}>
        {text}
      </Title>
    </Container>
  );
};

GrayButton.propTypes = {
  text: PropTypes.string.isRequired, // 버튼에 표시할 텍스트
  width: PropTypes.number.isRequired, // 버튼의 너비
  icon: PropTypes.node, // 아이콘은 선택적
  bgColor: PropTypes.string, // 배경 색상 (선택적, 기본 #EEEEEE)
  fontColor: PropTypes.string, // 폰트 색상 (선택적, 기본 #AAAAAA)
  fontSize: PropTypes.number, // 폰트 크기 (선택적, 기본 17px)
  fontWeight: PropTypes.string, // 폰트 두께 (선택적, 기본 bold)
  height: PropTypes.number, // 버튼 높이 (선택적, 기본 50px)
};

export default GrayButton;
