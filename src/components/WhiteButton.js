import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Container = styled(TouchableOpacity)`
    background-color: #FFFFFF;
    height: 50px;
    width: ${(props) => props.width}px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 
    gap: 4px;
    border-color: #1D1D1F;
    border-width: 1px;
`

const Title = styled.Text`
    font-size: 17px;
    color: #1D1D1F;
    font-family: 'SUIT-Bold';
    line-height: 23.8px;
`

const WhiteButton = ({ text, width, image, onPress, style }) => {
    return (
        <Container width={width} onPress={onPress} style={[style]}>
            {image && image}
            <Title>{text}</Title>
        </Container>
    )
}

WhiteButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    image: PropTypes.string,
    onPress: PropTypes.func,
}

export default WhiteButton