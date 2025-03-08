import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const GrayContainer = ({ text, width, image, style }) => {

    return (
        <View
            style={[
                styles.container, 
                { width, backgroundColor: 'rgba(29, 29, 31, 0.1)' },
                style
            ]}
        >
            {image && <Image style={styles.image} source={image}/>}
            <Text style={styles.title}>{text}</Text>
        </View>
    );
};

GrayContainer.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    image: PropTypes.node,
    style: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    title: {
        fontSize: 17,
        color: '#FFFFFF',
        fontFamily: 'SUIT-Bold',
        lineHeight: 23.8,
    },
    image: {
        height: 18,
        width: 18,
        marginRight: 4,
    }
});

export default GrayContainer;
