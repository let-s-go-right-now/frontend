import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"; 
import Navigation from './navigations';
import {theme} from "./theme";


const App = () => {
    return (
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Navigation />
          </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
