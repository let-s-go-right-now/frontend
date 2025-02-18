import React from 'react';
import { Button, StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Container style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top }}>
        <StyledText>Home</StyledText>
        <Button title="Go to the List Screen" onPress={() => navigation.navigate('List')} />
      </Container>
    </SafeAreaProvider>
  );
};

export default Home;