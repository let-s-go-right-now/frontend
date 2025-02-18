// Home.js
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';


class Home extends Component {


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Home</Text>
                <Button/>
            </View>
        );
    }
}

export default Home;
