import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"; 
import Navigation from './navigations';
import {theme} from "./theme";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Navigation />
          </NavigationContainer>
        </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
