import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

const LineTabWrapper = styled.View`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 30px;
`;

const ContainerWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Container = styled.TouchableOpacity`
  border-bottom-width: ${({ isSelected }) => (isSelected ? '2px' : '0px')};
  border-bottom-color: #363638;
  height: 28px;
`;

const Title = styled.Text`
  font-family: ${({ isSelected }) => (isSelected ? "SUIT-Bold" : "SUIT-SemiBold")};
  color: ${({ isSelected }) => (isSelected ? '#363638' : 'rgba(0, 0, 0, 0.2)')};
  font-size: 17px;
`;

const LineTab = ({ tabs, selectedTab, onSelect }) => {
  return (
    <LineTabWrapper>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ContainerWrapper>
          {tabs.map((text, index) => (
            <Container
              key={index}
              onPress={() => onSelect(text)} // ✅ 부모 상태 업데이트
              isSelected={selectedTab === text}
            >
              <Title isSelected={selectedTab === text}>{text}</Title>
            </Container>
          ))}                    
        </ContainerWrapper>
      </ScrollView>
    </LineTabWrapper>
  );
};

export default LineTab;
